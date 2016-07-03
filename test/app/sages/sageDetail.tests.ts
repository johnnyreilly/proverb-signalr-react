import { initialiseApp } from "../../../src/app/app";
import { Common } from "../../../src/app/common/common";
import { SageDetailRouteParams, sageDetailControllerName, SageDetailController } from "../../../src/app/sages/sageDetailController";
import { DataContext } from "../../../src/app/services/datacontext";
import { Sage } from "../../../src/app/services/repository.sage";
import { getStubConfig } from "../mocksAndStubs";

const appName = initialiseApp(getStubConfig());

function getInjectable() {
    angular.mock.module(appName);

    let $controller: ng.IControllerService;
    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let getById_deferred: ng.IDeferred<Sage>; // deferred used for promises
    let $location: ng.ILocationService;
    let $stateParams: SageDetailRouteParams;
    let common: Common;
    let datacontext: DataContext; // controller dependencies
    let sageDetailController: SageDetailController; // the controller

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

        $stateParams = { id: "10" };
        getById_deferred = $q.defer();

        spyOn(datacontext.sage, "getById").and.returnValue(getById_deferred.promise);
        spyOn(common, "activateController").and.callThrough();
        spyOn(common.logger, "getLoggers").and.returnValue({
            info: jasmine.createSpy("logInfo")
        });
        spyOn($location, "path")/*.and.returnValue(jasmine.createSpy("path"))*/;
    });

    return { $controller, $location, $stateParams, common, datacontext, 
        getById_deferred, $rootScope };
}

function getController($controller: ng.IControllerService, dependencies: {}) {
    return $controller(sageDetailControllerName, dependencies) as SageDetailController;
}

function getActivatedController() {
    const { $controller, $location, $stateParams, common, datacontext } = getInjectable();
    return getController($controller, { $location, $stateParams, common, datacontext });
}

describe("Controllers", () => {
    describe("on creation ->", () => {

        it("controller should have a title of 'Sage Details'", () =>
            expect(getActivatedController().title).toBe("Sage Details")
        );

        it("controller should have no sage", () =>
            expect(getActivatedController().sage).toBeUndefined()
        );

        it("datacontext.sage.getById should be called", () => {
            const { $controller, $location, $stateParams, common, datacontext } = getInjectable();
            const controller = getController($controller, { $location, $stateParams, common, datacontext });

            expect(datacontext.sage.getById).toHaveBeenCalledWith(10, true);
        });
    });

    describe("activateController ->", function () {

        let sage_stub: Sage;
        beforeEach(() => {
            sage_stub = { id: 1, name: "John", username: "john", email: "johnny_reilly@hotmail.com", dateOfBirth: null };
        });

        it("should set sage to be the resolved promise values", () => {
            const { $controller, $location, $stateParams, common, datacontext,
                getById_deferred, $rootScope } = getInjectable();
            const controller = getController($controller, { $location, $stateParams, common, datacontext });

            getById_deferred.resolve(sage_stub);
            $rootScope.$digest(); // So Angular processes the resolved promise

            expect(controller.sage).toBe(sage_stub);
        });

        it("should log 'Activated Sage Details View' and set title with name", () => {
            const { $controller, $location, $stateParams, common, datacontext,
                getById_deferred, $rootScope } = getInjectable();
            const controller = getController($controller, { $location, $stateParams, common, datacontext });

            getById_deferred.resolve(sage_stub);
            $rootScope.$digest(); // So Angular processes the resolved promise

            expect(controller.log.info).toHaveBeenCalledWith("Activated Sage Details View");
            expect(controller.title).toBe("Sage Details: " + sage_stub.name);
        });
    });

    describe("gotoEdit ->", () => {

        let sage_stub: Sage;
        beforeEach(() => {
            sage_stub = { id: 1, name: "John", username: "john", email: "johnny_reilly@hotmail.com", dateOfBirth: null };
        });

        it("should set $location.path to edit URL with the sage id", () => {
            const { $controller, $location, $stateParams, common, datacontext } = getInjectable();
            const controller = getController($controller, { $location, $stateParams, common, datacontext });

            controller.sage = sage_stub;

            controller.gotoEdit();

            expect($location.path).toHaveBeenCalledWith("/sages/edit/" + sage_stub.id);
        });
    });
});
