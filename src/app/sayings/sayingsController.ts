import { commonServiceName, CommonService } from "../common/common";
import { Loggers } from "../common/logger";
import { datacontextName, DataContext } from "../services/datacontext";
import { Sage } from "../services/repository.sage";
import { Saying } from "../services/repository.saying";

export const sayingsControllerName = "sayings";

export class SayingsController {

    log: Loggers;
    sageDictionary: { [id: string]: Sage };
    sages: Sage[];
    sayings: Saying[];
    selectedSage: Sage;
    title: string;

    static $inject = ["$location", commonServiceName, datacontextName];
    constructor(
        private $location: ng.ILocationService,
        private common: CommonService,
        private datacontext: DataContext
        ) {

        this.sageDictionary = {};
        this.sages = [];
        this.sayings = [];
        this.selectedSage = undefined;
        this.title = "Sayings";

        this.log = common.logger.getLoggers(sayingsControllerName);

        this.activate();
    }

    // Prototype methods

    activate() {

        const dataPromises: ng.IPromise<any>[] = [this.getProverbs(), this.getSages()];
        const combinerPromise = this.common.$q.all(dataPromises).then(() => this.combineData());

        this.common.activateController([combinerPromise], sayingsControllerName, this.title)
            .then(() => this.log.info("Activated Sayings View"));
    }

    combineData() {

        // Populate dictionary with sages
        this.sages.forEach(sage => this.sageDictionary[sage.id.toString()] = sage);

        // Set the sage on each saying using the sage dictionary
        this.sayings.forEach(saying => saying.sage = this.sageDictionary[saying.sageId.toString()]);

        const search = this.$location.search();
        if (search.sageId) {
            this.selectedSage = this.sageDictionary[search.sageId];
        }
    }

    getProverbs() {
        return this.datacontext.saying.getAll().then(data => this.sayings = data);
    }

    getSages() {
        return this.datacontext.sage.getAll().then(data => this.sages = data);
    }

    gotoAdd() {
        this.$location.path("/sayings/edit/add");
    }

    selectedSageChange() {
        this.$location.search("sageId", this.selectedSage ? this.selectedSage.id : undefined);
    }

    // Instance methods

    bySelectedSage = (saying: Saying) => {
        if (!this.selectedSage) { return true; }
        return saying.sageId === this.selectedSage.id;
    }
}
