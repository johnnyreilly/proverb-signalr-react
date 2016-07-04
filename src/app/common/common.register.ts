import { commonServiceName, commonServiceFactory } from "./common";
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
        .factory(commonServiceName, commonServiceFactory)
        .service(loggerServiceName, LoggerService)
        .service(modalDialogServiceName, ModalDialogService)
        .service(spinnerServiceName, SpinnerService)
        .name;
}

export default createCommon;