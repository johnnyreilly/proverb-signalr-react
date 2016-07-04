import { initialiseApp } from "../../../src/app/app";
import { Common } from "../../../src/app/common/common";
import { SageEditRouteParams, sageEditControllerName, SageEditController } from "../../../src/app/sages/sageEditController";
import { DataContext } from "../../../src/app/services/datacontext";
import { Sage } from "../../../src/app/services/repository.sage";
import { getStubConfig } from "../mocksAndStubs";

const appName = initialiseApp(getStubConfig());

function getInjectable() {
    angular.mock.module(appName);

    let $controller: ng.IControllerService;
    let $rootScope: ng.IRootScopeService;
    let $scope: ng.IScope;
    let $q: ng.IQService;
    let getById_deferred: ng.IDeferred<Sage>; // deferred used for promises
    let $location: ng.ILocationService;
    let $stateParams: SageEditRouteParams;
    let common: Common;
    let datacontext: DataContext; // controller dependencies
    let sageEditController: SageEditController; // the controller

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
        $scope = $rootScope.$new();
        $q = _$q_;

        $location = _$location_;
        common = _common_;
        datacontext = _datacontext_;

        $stateParams = { id: "10" };
        getById_deferred = $q.defer();

        spyOn(datacontext.sage, "getById").and.returnValue(getById_deferred.promise);
        spyOn(common, "activateController").and.callThrough();
        spyOn(common.logger, "getLoggers").and.returnValue({
            error: jasmine.createSpy("logError"),
            info: jasmine.createSpy("logInfo"),
            success: jasmine.createSpy("logSuccess")
        });
    });

    return { $controller, $scope, $location, $stateParams, common, datacontext,
        getById_deferred, $rootScope, $q };
}

function getController($controller: ng.IControllerService, dependencies: {}) {
    return $controller(sageEditControllerName, dependencies) as SageEditController;
}

function getActivatedController() {
    const { $controller, $location, $scope, $stateParams, common, datacontext } = getInjectable();
    return getController($controller, { $location, $scope, $stateParams, common, datacontext });
}

function getSageStub() {
    return { id: 1, name: "John", username: "john", email: "johnny_reilly@hotmail.com", dateOfBirth: null } as Sage;
}

describe("Controllers", () => {
    describe("SageEditController", () => {
        describe("on creation ->", () => {
            it("controller should have a title of 'Sage Edit'", () =>
                expect(getActivatedController().title).toBe("Sage Edit")
            );

            it("controller should have no sage", () =>
                expect(getActivatedController().sage).toBeUndefined()
            );

            it("datacontext.sage.getById should be called", () => {
                const { $controller, $location, $scope, $stateParams, common, datacontext } = getInjectable();
                const controller = getController($controller, { $location, $scope, $stateParams, common, datacontext });

                expect(datacontext.sage.getById).toHaveBeenCalledWith(10);
            });
        });

        describe("activateController", () => {
            it("should set sage to be the resolved promise values", () => {
                const { $controller, $location, $scope, $stateParams, common, datacontext,
                    getById_deferred, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, $scope, $stateParams, common, datacontext });
                const sage_stub = getSageStub();

                getById_deferred.resolve(sage_stub);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.sage).toBe(sage_stub);
            });

            it("should log 'Activated Sage Edit View' and set title with name", () => {
                const { $controller, $location, $scope, $stateParams, common, datacontext,
                    getById_deferred, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, $scope, $stateParams, common, datacontext });
                const sage_stub = getSageStub();

                getById_deferred.resolve(sage_stub);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.log.info).toHaveBeenCalledWith("Activated Sage Edit View");
                expect(controller.title).toBe("Sage Edit: " + sage_stub.name);
            });
        });

        describe("save", () => {

            let sage_stub: Sage;
            let save_deferred: ng.IDeferred<any>;
            let controller: SageEditController;
            let common: Common;
            let datacontext: DataContext;
            let $rootScope: ng.IRootScopeService;
            let $location: ng.ILocationService;

            beforeEach(() => {
                const { $controller, $location: $l, $scope, $stateParams, common: c, datacontext: dc,
                    getById_deferred, $rootScope: $rc, $q } = getInjectable();
                $location = $l;
                common = c;
                datacontext = dc;
                $rootScope = $rc;
                sage_stub = getSageStub();

                save_deferred = $q.defer();

                spyOn(datacontext.sage, "save").and.returnValue(save_deferred.promise);
                spyOn(common, "waiter").and.callThrough();
                spyOn($location, "path");

                controller = getController($controller, { $location, $scope, $stateParams, common, datacontext });
                controller.sage = sage_stub;
            });

            it("_isSavingOrRemoving should be set true", () => {
                expect(controller._isSavingOrRemoving).toBe(false);
                controller.save();
                expect(controller._isSavingOrRemoving).toBe(true);
            });

            it("serverErrors should be wiped", () => {
                controller.errors = { "errors": "aplenty" };
                controller.save();
                expect(controller.errors).toEqual({});
            });

            it("datacontext.sage.save should be called", () => {
                controller.save();
                expect(datacontext.sage.save).toHaveBeenCalledWith(sage_stub);
            });

            it("common.waiter should be called", () => {
                controller.save();
                expect(common.waiter).toHaveBeenCalledWith(save_deferred.promise, "sageEdit", "Saving " + sage_stub.name);
            });

            it("should set $location.path to edit URL with the sage id", () => {
                controller.save();

                save_deferred.resolve();
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.log.success).toHaveBeenCalledWith("Saved " + sage_stub.name);
                expect($location.path).toHaveBeenCalledWith("/sages/detail/" + sage_stub.id);
            });

            it("should log failure to save", () => {
                let reject = {};

                controller.save();

                save_deferred.reject(reject);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.log.error).toHaveBeenCalledWith("Failed to save " + sage_stub.name, reject);
            });

            it("should log failure to save by field name", () => {

                controller.$scope.form = <ng.IFormController>{};
                let reject = {
                    errors: {
                        "sage.userName": ["I'm a validation", "Me too"]
                    }
                };

                controller.save();

                save_deferred.reject(reject);
                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.log.error).toHaveBeenCalledWith(reject.errors["sage.userName"]);
                expect(controller.errors).toEqual({
                    "sage.userName": "I'm a validation,Me too"
                });
            });
        });
    });
});
