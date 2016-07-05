export const topnavComponentName = "proverbTopnav";

class TopNavController {

    isCollapsed: boolean;
    onIsCollapsedChanged: Function;

    static $inject: any[] = [];
    constructor() { }

    toggleCollapsed() {
        this.onIsCollapsedChanged({ newIsCollapsed: !this.isCollapsed });
    }
}

export const topnavComponent = {
    bindings: {
        isCollapsed: "<",
        onIsCollapsedChanged: "&"
    },
    controllerAs: "vm",
    controller: TopNavController,
    template: require("./topnav.html")
};

