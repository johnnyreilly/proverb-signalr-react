import { common } from "../common/common";
import { loggers } from "../common/logger";
import { datacontext } from "../services/datacontext";
import { sage } from "../services/repository.sage";

export const sagesControllerName = "sages";

export class SagesController {

    log: loggers;
    sages: sage[];
    title: string;

    static $inject = ["common", "datacontext"];
    constructor(
        private common: common,
        private datacontext: datacontext
        ) {

        this.sages = [];
        this.title = "Sages";

        this.log = common.logger.getLoggers(sagesControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        this.common.activateController([this.getSages()], sagesControllerName, this.title)
            .then(() => this.log.info("Activated Sages View"));
    }

    getSages() {
        return this.datacontext.sage.getAll().then(data => this.sages = data);
    }
}
