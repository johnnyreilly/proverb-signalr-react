import { config } from "../app";
import { common } from "../common/common";
import { loggers } from "../common/logger";
import { controllerActivateSuccessData, failureData, waiterStartData } from "../common/common";

export const shellControllerName = "shell";

interface shellRootScope extends ng.IRootScopeService {
    title: string;
}

interface spinnerToggleEvent extends ng.IAngularEvent {
    show: boolean;
}

export class ShellController {

    busyMessage: string;
    isBusy: boolean;
    log: loggers;
    spinnerOptions: SpinnerOptions;
    urlSidebar: string;
    urlTopNav: string;

    static $inject = ["$rootScope", "common", "config", "$state"];
    constructor(
        private $rootScope: shellRootScope,
        private common: common,
        private config: config,
        private $state: ng.ui.IStateService
        ) {

        this.log = common.logger.getLoggers(shellControllerName);
        this.busyMessage = "Please wait ...";
        this.isBusy = true;
        this.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: "#F58A00"
        };
        this.urlSidebar = "app/layout/sidebar.html";
        this.urlTopNav = "app/layout/topnav.html";

        this.wireUpEventListeners();
        this.activate();
    }

    // Prototype methods

    activate() {
        this.common.activateController([], shellControllerName, "Loading....")
            .then(() => {
                this.log.success("Proverb v" + this.config.version + " loaded!", null, true);
                //this.$state.go("dashboard");
            });
    }

    wireUpEventListeners() {

        var events = this.config.events;

        this.$rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => {
            this.busyMessage = "Please wait ...";
            this.toggleSpinner(true);
        });

        this.$rootScope.$on(events.controllerActivateSuccess,
            (event: ng.IAngularEvent, data: controllerActivateSuccessData) => {
                // Deactivate spinner as long as the controller that has been activated is not the shell
                if (data.controllerId !== shellControllerName) {
                    this.toggleSpinner(false);
                }
                this.$rootScope.title = "Proverb - " + data.title;
            });

        this.$rootScope.$on(events.failure,
            (event: ng.IAngularEvent, data: failureData) => {
                this.toggleSpinner(false);

                var message = this.config.inDebug
                    ? JSON.stringify(data.failureReason) // If in debug mode then let's have the full error
                    : "There was a problem with " + data.controllerId + ". Please contact support.";
                this.log.error(message, data.failureReason, data.showToast);
            });

        this.$rootScope.$on(events.spinnerToggle,
            (event: ng.IAngularEvent, data: spinnerToggleEvent) => {
                this.toggleSpinner(data.show);
            });

        this.$rootScope.$on(events.waiterStart,
            (event: ng.IAngularEvent, data: waiterStartData) => {
                this.busyMessage = data.message;
                this.toggleSpinner(true);
            });

        this.$rootScope.$on(events.waiterSuccess,
            (event: ng.IAngularEvent, data: controllerActivateSuccessData) => {
                this.toggleSpinner(false);
            });
    }

    toggleSpinner(onOrOff: boolean) {
        this.isBusy = onOrOff;
    }
}
