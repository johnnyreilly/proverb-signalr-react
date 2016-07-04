import { commonName, Common, CommonConfigProvider } from "./common";

export const spinnerServiceName = "spinner";

export class SpinnerService {

    static $inject = [commonName, "commonConfig"];
    constructor(private common: Common, private commonConfigProvider: CommonConfigProvider) {
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