import { common } from "../common/common";
import { loggers } from "../common/logger";
import { datacontext } from "../services/datacontext";
import { sage } from "../services/repository.sage";

export const sageDetailControllerName = "sageDetail";

export interface sageDetailRouteParams extends ng.ui.IStateParamsService {
    id: string;
}

export class SageDetailController {

    log: loggers;
    sage: sage;
    title: string;

    static $inject = ["$location", "$stateParams", "common", "datacontext"];
    constructor(
        private $location: ng.ILocationService,
        private $stateParams: sageDetailRouteParams,
        private common: common,
        private datacontext: datacontext
        ) {

        this.sage = undefined;
        this.title = "Sage Details";

        this.log = common.logger.getLoggers(sageDetailControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        var id = parseInt(this.$stateParams.id, 10);
        var dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getById(id, true).then(data => this.sage = data)];

        this.common.activateController(dataPromises, sageDetailControllerName, this.title)
            .then(() => {
                this.log.info("Activated Sage Details View");
                this.title = "Sage Details: " + this.sage.name;
            });
    }

    gotoEdit() {
        this.$location.path("/sages/edit/" + this.sage.id);
    }
}
