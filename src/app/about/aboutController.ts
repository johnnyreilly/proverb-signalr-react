import { configName, Config } from "../typesAndInterfaces/config";
import { commonServiceName, CommonService } from "../common/common";
import { Loggers } from "../common/logger";

export const aboutControllerName = "about";

export class AboutController {

    log: Loggers;
    version: string;

    static $inject = [commonServiceName, configName];
    constructor(
        private common: CommonService,
        private config: Config
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
