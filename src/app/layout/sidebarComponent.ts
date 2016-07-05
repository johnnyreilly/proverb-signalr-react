import { ConfigRoute } from "../app.routes";

export const sidebarComponentName = "proverbSidebar";

class SidebarController {

    navRoutes: ConfigRoute[];
    currentRoute: ConfigRoute;

    static $inject = ["$rootScope", "routes"];
    constructor(
        private $rootScope: ng.IRootScopeService,
        private routes: ConfigRoute[]) {
        this.activate();
    }

    activate() {
        this.$rootScope.$on("$stateChangeSuccess", (event, toState, toParams, fromState, fromParams) => {
            this.currentRoute = toState;
        });
        this.getNavRoutes();
    }

    getNavRoutes() {
        this.navRoutes = this.routes
            .filter(r => (r.settings && r.settings.nav) ? true : false)
            .sort((r1, r2) => r1.settings.nav - r2.settings.nav);
    }

    isCurrent(route: ConfigRoute) {
        return route && this.currentRoute && route.name === this.currentRoute.name ? "current" : "";
    }
}


export const sidebarComponent = {
    controllerAs: "vm",
    controller: SidebarController,
    template: require("./sidebar.html")
};

