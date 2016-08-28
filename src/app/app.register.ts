import { createCommon } from "./common/common.register";
import { dashboardControllerName, DashboardController } from "./dashboard/dashboardController";
import { sageComponentName, sageComponent } from "./sages/sageComponent";
import { sagesControllerName, SagesController } from "./sages/sagesController";
import { sageDetailControllerName, SageDetailController } from "./sages/sageDetailController";
import { sageEditControllerName, SageEditController } from "./sages/sageEditController";
import { sayingsControllerName, SayingsController } from "./sayings/sayingsController";
import { sayingEditControllerName, SayingEditController } from "./sayings/sayingEditController";
import { aboutControllerName, AboutController } from "./about/aboutController";
import { shellComponentName, shellComponent } from "./layout/shellComponent";
import { sidebarComponentName, sidebarComponent } from "./layout/sidebarComponent";
import { topnavComponentName, topnavComponent } from "./layout/topnavComponent";
import { waiterComponentName, waiterComponent } from "./layout/waiterComponent";
import { connectionServiceName, ConnectionService } from "./services/connection";
import { datacontextName, datacontextServiceFactory } from "./services/datacontext";
import { repositoriesName, repositoriesServiceFactory } from "./services/repositories";
import { repositorySageServiceName, RepositorySageService } from "./services/repository.sage";
import { repositorySayingServiceName, RepositorySayingService } from "./services/repository.saying";
import { imgPersonName, imgPerson } from "./directives/imgPerson";
import { serverErrorName, serverError, serverErrorTooltipName, serverErrorTooltip } from "./directives/serverError";
import { sidebarName, sidebar } from "./directives/sidebar";
import { spinnerName, spinner } from "./directives/spinner";
import { widgetHeaderName, widgetHeader } from "./directives/widgetHeader";
import { widgetMinimizeName, widgetMinimize } from "./directives/widgetMinimize";

function createApp() {
    const common = createCommon();

    return angular.module("app", [
        // Angular modules
        "ngAnimate",        // animations
        "ngSanitize",       // sanitizes html bindings (ex: sidebar.js)

        // Custom modules
        common,             // common functions, logger, spinner, bootstrap dialog wrapper functions

        // 3rd Party Modules
        "ui.router",
        "ui.bootstrap"      // ui-bootstrap (ex: carousel, pagination, dialog)
    ])
    .component(shellComponentName, shellComponent)
    .component(sidebarComponentName, sidebarComponent)
    .component(topnavComponentName, topnavComponent)
    .component(sageComponentName, sageComponent)
    .component(waiterComponentName, waiterComponent)

    .controller(dashboardControllerName, DashboardController)
    .controller(sagesControllerName, SagesController)
    .controller(sageDetailControllerName, SageDetailController)
    .controller(sageEditControllerName, SageEditController)
    .controller(sayingsControllerName, SayingsController)
    .controller(sayingEditControllerName, SayingEditController)
    .controller(aboutControllerName, AboutController)

    .service(connectionServiceName, ConnectionService)
    .factory(datacontextName, datacontextServiceFactory)
    .factory(repositoriesName, repositoriesServiceFactory)
    .service(repositorySageServiceName, RepositorySageService)
    .service(repositorySayingServiceName, RepositorySayingService)

    .directive(imgPersonName, imgPerson)
    .directive(serverErrorName, serverError)
    .directive(serverErrorTooltipName, serverErrorTooltip)
    .directive(sidebarName, sidebar)
    .directive(spinnerName, spinner)
    .directive(widgetHeaderName, widgetHeader)
    .directive(widgetMinimizeName, widgetMinimize)
    ;
}

export default createApp;