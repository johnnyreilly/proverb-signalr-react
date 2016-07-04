import { commonServiceName, CommonService } from "../common/common";
import { Loggers } from "../common/logger";
import { datacontextName, DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";

export const sageDetailControllerName = "sageDetail";

export interface SageDetailRouteParams extends ng.ui.IStateParamsService {
    id: string;
}

export class SageDetailController {

    log: Loggers;
    sage: Sage;
    title: string;

    static $inject = ["$location", "$stateParams", commonServiceName, datacontextName];
    constructor(
        private $location: ng.ILocationService,
        private $stateParams: SageDetailRouteParams,
        private common: CommonService,
        private datacontext: DataContext
        ) {

        this.sage = undefined;
        this.title = "Sage Details";

        this.log = common.logger.getLoggers(sageDetailControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {
        const id = parseInt(this.$stateParams.id, 10);
        const dataPromises: ng.IPromise<any>[] = [this.datacontext.sage.getById(id, true).then(data => this.sage = data)];

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
