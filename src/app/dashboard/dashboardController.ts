import { Common } from "../common/common";
import { Loggers } from "../common/logger";
import { DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";

export const dashboardControllerName = "dashboard";

export class DashboardController {

    log: Loggers;
    sages: Sage[];

    static $inject = ["common", "datacontext"];
    constructor(
        private common: Common,
        private datacontext: DataContext
        ) {

        this.sages = [];

        this.log = common.logger.getLoggers(dashboardControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        const promises: ng.IPromise<any>[] = [this.getSages()];
        this.common.activateController(promises, dashboardControllerName, "Dashboard")
            .then(() => this.log.info("Activated Dashboard View"));
    }

    getSages() {
        return this.datacontext.sage.getAll().then(data => this.sages = data);
    }
}
