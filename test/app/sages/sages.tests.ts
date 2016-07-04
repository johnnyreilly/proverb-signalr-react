import { initialiseApp } from "../../../src/app/app";
import { Common } from "../../../src/app/common/common";
import { sagesControllerName, SagesController } from "../../../src/app/sages/sagesController";
import { DataContext } from "../../../src/app/services/datacontext";
import { Sage } from "../../../src/app/services/repository.sage";
import { getStubConfig } from "../mocksAndStubs";

const appName = initialiseApp(getStubConfig());

function getInjectable() {
    angular.mock.module(appName);

    let $controller: ng.IControllerService;
    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let getAll_deferred: ng.IDeferred<Sage[]>; // deferred used for promises
    let $location: ng.ILocationService;
    let common: Common;
    let datacontext: DataContext; // controller dependencies
    let sagesController: SagesController; // the controller

    angular.mock.inject((
        _$controller_: ng.IControllerService,
        _$location_: ng.ILocationService,
        _$rootScope_: ng.IRootScopeService,
        _$q_: ng.IQService,
        _common_: Common,
        _datacontext_: DataContext
    ) => {
        $controller = _$controller_;
        $rootScope = _$rootScope_;
        $q = _$q_;

        $location = _$location_;
        common = _common_;
        datacontext = _datacontext_;

        getAll_deferred = $q.defer();

        spyOn(datacontext.sage, "getAll").and.returnValue(getAll_deferred.promise);
        spyOn(common, "activateController").and.callThrough();
        spyOn(common.logger, "getLoggers").and.returnValue({
            info: jasmine.createSpy("logInfo")
        });

    });

    return { $controller, $location, common, datacontext,
        getAll_deferred, $rootScope };
}

function getController($controller: ng.IControllerService, dependencies: {}) {
    return $controller(sagesControllerName, dependencies) as SagesController;
}

function getActivatedController() {
    const { $controller, $location, common, datacontext } = getInjectable();
    return getController($controller, { $location, common, datacontext });
}

function getSagesStub() {
    return [{ id: 1, name: "John", username: "john", email: "johnny_reilly@hotmail.com", dateOfBirth: null } as Sage];
}

describe("Controllers", () => {
    describe("SagesController", () => {
        describe("on creation", () => {
            it("controller should have a title of 'Sages'", () =>
                expect(getActivatedController().title).toBe("Sages")
            );

            it("controller should have no sages", () =>
                expect(getActivatedController().sages.length).toBe(0)
            );

            it("datacontext.sage.getAll should be called", () => {
                const { $controller, $location, common, datacontext } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });

                expect(datacontext.sage.getAll).toHaveBeenCalled();
            });
        });

        describe("activateController", () => {
            it("should set sages to be the resolved promise values", () => {
                const { $controller, $location, common, datacontext, getAll_deferred, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });
                const stubSages = getSagesStub();

                getAll_deferred.resolve(stubSages);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.sages).toBe(stubSages);
            });

            it("should log 'Activated Sages View'", () => {
                const { $controller, $location, common, datacontext, getAll_deferred, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });
                const stubSages = getSagesStub();

                getAll_deferred.resolve(stubSages);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.log.info).toHaveBeenCalledWith("Activated Sages View");
            });
        });
    });
});
