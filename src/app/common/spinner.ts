import { common, commonConfigProvider } from "./common";

export const spinnerServiceName = "spinner";

export class SpinnerService {

    static $inject = ["common", "commonConfig"];
    constructor(private common: common, private commonConfigProvider: commonConfigProvider) {
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