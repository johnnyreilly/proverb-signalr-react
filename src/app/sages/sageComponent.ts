export const sageComponentName = "proverbSage";

class SageController {

    name: string;
    id: number;

    static $inject: any[] = [];
    constructor() { }
}

export const sageComponent = {
    bindings: {
        name: "<",
        id: "<"
    },
    controllerAs: "vm",
    controller: SageController,
    template: require("./sage.html")
};

