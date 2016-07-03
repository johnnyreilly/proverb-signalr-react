import { ConfigRoute } from "../app.routes";

export const sidebarControllerName = "sidebar";

export class SidebarController {

    navRoutes: ConfigRoute[];
    currentRoute: string;

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
        return route.name === this.currentRoute ? "current" : "";
    }
}