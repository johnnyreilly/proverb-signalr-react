import { commonName, commonServiceFactory, CommonConfigProvider } from "./common";
import { loggerServiceName, LoggerService } from "./logger";
import { modalDialogServiceName, ModalDialogService } from "./modalDialog";
import { spinnerServiceName, SpinnerService } from "./spinner";

/**
 * Define the common module 
 * Contains services:
 *  - common
 *  - logger
 *  - spinner
 */
export function createCommon() {
    return angular.module("common", [])

        // Must configure the common service and set its 
        // events via the commonConfigProvider
        .provider("commonConfig", function () {
            this.config = {
                // This will be populated in app.ts via the app.config(["commonConfigProvider", function ...
            };

            this.$get = function (): CommonConfigProvider {
                return {
                    config: this.config
                };
            };

            return this;
        })

        .factory(commonName, commonServiceFactory)
        .service(loggerServiceName, LoggerService)
        .service(modalDialogServiceName, ModalDialogService)
        .service(spinnerServiceName, SpinnerService)
        .name;
}

export default createCommon;