import { initialiseApp } from "../../../src/app/app";
import { Common } from "../../../src/app/common/common";
import { sayingsControllerName, SayingsController } from "../../../src/app/sayings/sayingsController";
import { DataContext } from "../../../src/app/services/datacontext";
import { Sage } from "../../../src/app/services/repository.sage";
import { Saying } from "../../../src/app/services/repository.saying";
import { getStubConfig } from "../mocksAndStubs";

const appName = initialiseApp(getStubConfig());

function getInjectable() {
    angular.mock.module(appName);

    let $controller: ng.IControllerService;
    let $rootScope: ng.IRootScopeService;
    let $q: ng.IQService;
    let sage_getAll_deferred: ng.IDeferred<Sage[]>;
    let saying_getAll_deferred: ng.IDeferred<Saying[]>;
    let $location: ng.ILocationService;
    let common: Common;
    let datacontext: DataContext; // controller dependencies
    let sayingsController: SayingsController; // the controller

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

        sage_getAll_deferred = $q.defer();
        saying_getAll_deferred = $q.defer();

        spyOn(datacontext.sage, "getAll").and.returnValue(sage_getAll_deferred.promise);
        spyOn(datacontext.saying, "getAll").and.returnValue(saying_getAll_deferred.promise);
        spyOn(common, "activateController").and.callThrough();
        spyOn(common.logger, "getLoggers").and.returnValue({
            info: jasmine.createSpy("logInfo")
        });
    });

    return { $controller, $location, common, datacontext,
        sage_getAll_deferred, saying_getAll_deferred, $rootScope };
}

function getController($controller: ng.IControllerService, dependencies: {}) {
    return $controller(sayingsControllerName, dependencies) as SayingsController;
}

function getActivatedController() {
    const { $controller, $location, common, datacontext } = getInjectable();
    return getController($controller, { $location, common, datacontext });
}

function getSagesStub() {
    return [{ id: 1, name: "John", username: "john", email: "johnny_reilly@hotmail.com", dateOfBirth: null } as Sage];
}

function getSayingsStub() {
    return [{ sageId: 1, id: 2, text: "Pithy pithy pithy" } as Saying];
}

describe("Controllers", () => {
    describe("Sayings", () => {
        describe("on creation", () => {
            it("controller should have a title of 'Sayings'", () =>
                expect(getActivatedController().title).toBe("Sayings")
            );

            it("controller should have no sages", () =>
                expect(getActivatedController().sages.length).toBe(0)
            );

            it("controller should have no sayings", () =>
                expect(getActivatedController().sayings.length).toBe(0)
            );

            it("controller should have no selectedSage", () =>
                expect(getActivatedController().selectedSage).toBeUndefined()
            );

            it("datacontext.sage.getAll should be called", () => {
                const { $controller, $location, common, datacontext } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });

                expect(datacontext.sage.getAll).toHaveBeenCalled();
            });

            it("datacontext.saying.getAll should be called", () => {
                const { $controller, $location, common, datacontext } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });

                expect(datacontext.saying.getAll).toHaveBeenCalled();
            });
        });

        describe("activateController", () => {
            it("should set sayings to be the resolved promise values", () => {
                const { $controller, $location, common, datacontext, $rootScope, sage_getAll_deferred, saying_getAll_deferred  } = getInjectable();
                const stubSayings = getSayingsStub();
                sage_getAll_deferred.resolve(getSagesStub());
                saying_getAll_deferred.resolve(stubSayings);

                const controller = getController($controller, { $location, common, datacontext });

                $rootScope.$digest(); // So Angular processes the resolved promise

                expect(controller.sayings).toBe(stubSayings);
            });

            it("should set sages to be the resolved promise values", () => {
                const { $controller, $location, common, datacontext, $rootScope, sage_getAll_deferred, saying_getAll_deferred  } = getInjectable();
                const stubSages = getSagesStub();
                sage_getAll_deferred.resolve(stubSages);
                saying_getAll_deferred.resolve(getSayingsStub());

                const controller = getController($controller, { $location, common, datacontext });

                $rootScope.$digest();

                expect(controller.sages).toBe(stubSages);
            });

            it("should have a selectedSage", () => {
                const { $controller, $location, common, datacontext, $rootScope, sage_getAll_deferred, saying_getAll_deferred  } = getInjectable();
                const stubSages = getSagesStub();
                sage_getAll_deferred.resolve(stubSages);
                saying_getAll_deferred.resolve(getSayingsStub());

                const controller = getController($controller, { $location, common, datacontext });

                spyOn($location, "search").and.returnValue({ sageId: 1 });

                $rootScope.$digest();

                expect(controller.selectedSage).toBe(stubSages[0]);
            });

            it("should not have a selectedSage", () => {
                const { $controller, $location, common, datacontext, $rootScope, sage_getAll_deferred, saying_getAll_deferred  } = getInjectable();
                sage_getAll_deferred.resolve(getSagesStub());
                saying_getAll_deferred.resolve(getSayingsStub());

                const controller = getController($controller, { $location, common, datacontext });

                spyOn($location, "search").and.returnValue({});

                $rootScope.$digest();

                expect(controller.selectedSage).toBeUndefined();
            });

            it("should log 'Activated Sayings View'", () => {
                const { $controller, $location, common, datacontext, $rootScope, sage_getAll_deferred, saying_getAll_deferred  } = getInjectable();
                sage_getAll_deferred.resolve(getSagesStub());
                saying_getAll_deferred.resolve(getSayingsStub());

                const controller = getController($controller, { $location, common, datacontext });
                $rootScope.$digest();

                expect(controller.log.info).toHaveBeenCalledWith("Activated Sayings View");
            });
        });

        describe("gotoAdd ->", () => {
            it("should set $location.path to add URL", () => {
                const { $controller, $location, common, datacontext, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });
                spyOn($location, "path");

                controller.gotoAdd();

                expect($location.path).toHaveBeenCalledWith("/sayings/edit/add");
            });
        });

        describe("selectedSageChange ->", () => {
            it("should set $location.search sageId to the selectedSage id", () => {
                const { $controller, $location, common, datacontext, $rootScope } = getInjectable();
                const controller = getController($controller, { $location, common, datacontext });
                const stubSages = getSagesStub();
                controller.selectedSage = stubSages[0];
                spyOn($location, "search");

                controller.selectedSageChange();

                expect($location.search).toHaveBeenCalledWith("sageId", 1);
            });
        });
    });
});
