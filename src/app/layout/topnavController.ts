export const topnavControllerName = "topnav";

export class TopNavController {

    isCollapsed: boolean;

    static $inject = ["$rootScope"];
    constructor(
        private $rootScope: ng.IRootScopeService
        ) {

        // collapse top nav menu when route change starts (only affects mobile)
        $rootScope.$on("$stateChangeStart", (event, toState, toParams, fromState, fromParams) => this.isCollapsed = true);

        this.activate();
    }

    // Prototype methods

    activate() {
        this.isCollapsed = true;
    }

    toggleCollapsed() {
        return this.isCollapsed = !this.isCollapsed;
    }
}
