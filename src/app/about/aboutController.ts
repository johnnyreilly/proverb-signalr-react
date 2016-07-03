import { config } from "../app";
import { common } from "../common/common";
import { loggers } from "../common/logger";

export const aboutControllerName = "about";

export class AboutController {

    log: loggers;
    version: string;

    static $inject = ["common", "config"];
    constructor(
        private common: common,
        private config: config
        ) {

        this.version = config.version;

        this.log = common.logger.getLoggers(aboutControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        this.common.activateController([], aboutControllerName, "About")
            .then(() => this.log.info("Activated About View"));
    }
}
