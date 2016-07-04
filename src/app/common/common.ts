import { ConfigEvents } from "../app";
import { LoggerService } from "./logger";

export interface Common {
    $broadcast: (...args: any[]) => ng.IAngularEvent;
    $q: ng.IQService;

    activateController: (promises: ng.IPromise<any>[], controllerId: string, title: string) => ng.IPromise<void>;
    logger: LoggerService;
    waiter: <T>(promise: ng.IPromise<T>, controllerId: string, message?: string) => ng.IPromise<T>;
}

export interface CommonConfigProvider {
    config: {
        events: ConfigEvents;
    };
}

export interface ControllerActivateSuccessData {
    controllerId: string;
    title: string;
}

export interface FailureData {
    controllerId: string;
    showToast: boolean;
    failureReason: any;
}

export interface WaiterStartData {
    controllerId: string;
    message: string;
}

export interface WaiterSuccessData {
    controllerId: string;
}

export const commonName = "common";

commonServiceFactory.$inject = ["$q", "$rootScope", "commonConfig", "logger"];
export function commonServiceFactory(
    $q: ng.IQService,
    $rootScope: ng.IRootScopeService,
    commonConfigProvider: CommonConfigProvider,
    logger: LoggerService) {
    const throttles: { [key: string]: ng.IPromise<any> } = {};

    const service: Common = {
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

        const events = commonConfigProvider.config.events;

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

        const events = commonConfigProvider.config.events;

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