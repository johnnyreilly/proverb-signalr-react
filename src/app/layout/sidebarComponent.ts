import { ConfigRoute } from "../app.routes";

export const sidebarComponentName = "proverbSidebar";

class SidebarController {

    navRoutes: ConfigRoute[];
    currentRoute: string;

    static $inject = ["routes"];
    constructor(private routes: ConfigRoute[]) {}

    $onInit() {
        this.activate();
    }

    activate() {
        this.getNavRoutes();
    }

    getNavRoutes() {
        this.navRoutes = this.routes
            .filter(r => (r.settings && r.settings.nav) ? true : false)
            .sort((r1, r2) => r1.settings.nav - r2.settings.nav);
    }

    isCurrent(route: ConfigRoute) {
        return route && this.currentRoute && route.name === this.currentRoute ? "current" : "";
    }
}

export const sidebarComponent = {
    bindings: {
        currentRoute: "<"
    },
    controllerAs: "vm",
    controller: SidebarController,
    template: require("./sidebar.html")
};

