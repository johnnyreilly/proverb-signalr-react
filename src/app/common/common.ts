import { configName, Config, ConfigEvents } from "../typesAndInterfaces/config";
import { ControllerActivateSuccessData, FailureData, WaiterStartData, WaiterSuccessData } from "../typesAndInterfaces/eventData";
import { loggerServiceName, LoggerService } from "./logger";

export const commonServiceName = "common";

export interface CommonService {
    $broadcast: (...args: any[]) => ng.IAngularEvent;
    $q: ng.IQService;

    activateController: (promises: ng.IPromise<any>[], controllerId: string, title: string) => ng.IPromise<void>;
    logger: LoggerService;
    waiter: <T>(promise: ng.IPromise<T>, controllerId: string, message?: string) => ng.IPromise<T>;
}

commonServiceFactory.$inject = ["$q", "$rootScope", loggerServiceName, configName];
export function commonServiceFactory(
    $q: ng.IQService,
    $rootScope: ng.IRootScopeService,
    logger: LoggerService,
    config: Config) {

    const service: CommonService = {
        // common angular dependencies
        $broadcast,
        $q,
        // generic
        activateController,
        logger,
        waiter
    };

    return service;

    function activateController(promises: ng.IPromise<any>[], controllerId: string, title: string) {

        const events = config.events;

        const allPromise = $q.all(promises).then(
            (eventArgs) => {
                const data: ControllerActivateSuccessData = {
                    controllerId: controllerId,
                    title: title
                };
                $broadcast(events.controllerActivateSuccess, data);
            },
            (reason) => {
                const data: FailureData = {
                    controllerId: controllerId,
                    showToast: true,
                    failureReason: reason
                };
                $broadcast(events.failure, data);
            });

        return allPromise;
    }

    function $broadcast(...args: any[]): ng.IAngularEvent {
        return $rootScope.$broadcast.apply($rootScope, arguments);
    }

    function waiter<T>(promise: ng.IPromise<T>, controllerId: string, message?: string): ng.IPromise<T> {

        const events = config.events;

        const data: WaiterStartData = {
            controllerId: controllerId,
            message: message
        };
        $broadcast(events.waiterStart, data);

        return promise.then(
            (promiseData) => {
                const data: WaiterSuccessData = { controllerId: controllerId };
                $broadcast(events.waiterSuccess, data);

                return promiseData;
            },
            (reason) => {
                const data: FailureData = {
                    controllerId: controllerId,
                    showToast: false,
                    failureReason: reason
                };
                $broadcast(events.failure, data);

                // if you "catch" an error via a promise error callback and you want to forward the error to the promise derived from the current promise, you have to "rethrow" the error by returning a rejection constructed via reject. - https://docs.angularjs.org/api/ng/service/$q#reject
                return $q.reject(reason);
            });
    }
}