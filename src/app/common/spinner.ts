import { commonServiceName, CommonService, CommonConfigProvider } from "./common";

export const spinnerServiceName = "spinner";

export class SpinnerService {

    static $inject = [commonServiceName, "commonConfig"];
    constructor(private common: CommonService, private commonConfigProvider: CommonConfigProvider) {
    }

    spinnerHide() {
        this.spinnerToggle(false);
    }

    spinnerShow() {
        this.spinnerToggle(true);
    }

    spinnerToggle(show: boolean) {
        this.common.$broadcast(this.commonConfigProvider.config.events.spinnerToggle, { show: show });
    }
}