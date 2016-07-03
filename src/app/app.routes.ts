import { dashboardControllerName } from "./dashboard/dashboardController";
import { sagesControllerName } from "./sages/sagesController";
import { sageDetailControllerName } from "./sages/sageDetailController";
import { sageEditControllerName } from "./sages/sageEditController";
import { sayingsControllerName } from "./sayings/sayingsController";
import { sayingEditControllerName } from "./sayings/sayingEditController";
import { aboutControllerName } from "./about/aboutController";

export interface ConfigRoute extends ng.ui.IState {
    title: string;
    settings: {
        nav?: number;
        content?: string;
    };
}

export function getRoutes(): ConfigRoute[] {
    return [{
        name: "dashboard",
        url: "/",
        template: require("./dashboard/dashboard.html"),
        controller: dashboardControllerName,
        controllerAs: "vm",
        title: "Dashboard",
        settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
        }
    }, {
        name: "sages",
        url: "/sages",
        template: require("./sages/sages.html"),
        controller: sagesControllerName,
        controllerAs: "vm",
        title: "Sages",
        settings: {
            nav: 2,
            content: '<i class="fa fa-users"></i> Sages'
        }
    }, {
        name: "sagesDetail",
        url: "/sages/detail/:id",
        title: "Sage Details",
        controller: sageDetailControllerName,
        controllerAs: "vm",
        template: require("./sages/sageDetail.html"),
        settings: {}
    }, {
        name: "sagesEdit",
        title: "Sage Edit",
        controller: sageEditControllerName,
        controllerAs: "vm",
        url: "/sages/edit/:id",
        template: require("./sages/sageEdit.html"),
        settings: {}
    }, {
        name: "sayings",
        title: "Sayings",
        url: "/sayings?sageId",
        controller: sayingsControllerName,
        controllerAs: "vm",
        template: require("./sayings/sayings.html"),
        reloadOnSearch: false,
        settings: {
            nav: 3,
            content: '<i class="fa fa-comment"></i> Sayings'
        }
    }, {
        name: "sayingsEdit",
        title: "Sayings Edit",
        url: "/sayings/edit/:id",
        controller: sayingEditControllerName,
        controllerAs: "vm",
        template: require("./sayings/sayingEdit.html"),
        settings: {}
    }, {
        name: "about",
        title: "About",
        url: "/about",
        controller: aboutControllerName,
        controllerAs: "vm",
        template: require("./about/about.html"),
        settings: {}
    }];
}

export function getTemplatesToCache() {
    return new Map<string, string>([
        ["app/layout/shell.html", require("./layout/shell.html")],
        ["app/layout/sidebar.html", require("./layout/sidebar.html")],
        ["app/layout/topnav.html", require("./layout/topnav.html")]
    ]);
}

configureRoutes.$inject = ["$stateProvider", "$urlRouterProvider", "$locationProvider"];
export function configureRoutes(
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider) {

    const routes = getRoutes();
    routes.forEach(state => $stateProvider.state(state));

    const [ defaultRoute ] = routes;
    $urlRouterProvider.otherwise(defaultRoute.url as string);

    $locationProvider.html5Mode(false);
}
