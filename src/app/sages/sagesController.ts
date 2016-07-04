import { commonServiceName, CommonService } from "../common/common";
import { Loggers } from "../common/logger";
import { datacontextName, DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";

export const sagesControllerName = "sages";

export class SagesController {

    log: Loggers;
    sages: Sage[];
    title: string;

    static $inject = [commonServiceName, datacontextName];
    constructor(
        private common: CommonService,
        private datacontext: DataContext
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
