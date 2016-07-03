import { common } from "../common/common";
import { loggers } from "../common/logger";
import { datacontext } from "../services/datacontext";
import { sage } from "../services/repository.sage";

export const dashboardControllerName = "dashboard";

export class DashboardController {

    log: loggers;
    sages: sage[];

    static $inject = ["common", "datacontext"];
    constructor(
        private common: common,
        private datacontext: datacontext
        ) {

        this.sages = [];

        this.log = common.logger.getLoggers(dashboardControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        var promises: ng.IPromise<any>[] = [this.getSages()];
        this.common.activateController(promises, dashboardControllerName, "Dashboard")
            .then(() => this.log.info("Activated Dashboard View"));
    }

    getSages() {
        return this.datacontext.sage.getAll().then(data => this.sages = data);
    }
}
