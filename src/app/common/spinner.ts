import { commonServiceName, CommonService } from "./common";
import { configName, Config } from "../typesAndInterfaces/config";

export const spinnerServiceName = "spinner";

export class SpinnerService {

    static $inject = [commonServiceName, configName];
    constructor(private common: CommonService, private config: Config) {
    }

    spinnerHide() {
        this.spinnerToggle(false);
    }

    spinnerShow() {
        this.spinnerToggle(true);
    }

    spinnerToggle(show: boolean) {
        this.common.$broadcast(this.config.events.spinnerToggle, { show: show });
    }
}