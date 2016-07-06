export const waiterComponentName = "proverb-waiter";

class WaiterController {

    isWaiting: boolean;
    spinnerOptions: SpinnerOptions;
    waitMessage: string;

    static $inject: any[] = [];
    constructor() { }
}

export const waiterComponent = {
    bindings: {
        "isWaiting": "<",
        "spinnerOptions": "<",
        "waitMessage": "<"
    },
    controllerAs: "vm",
    controller: WaiterController,
    template: require("./waiter.html")
};

