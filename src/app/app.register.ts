import { createCommon } from "./common/common.register";
import { dashboardControllerName, DashboardController } from "./dashboard/dashboardController";
import { sagesControllerName, SagesController } from "./sages/sagesController";
import { sageDetailControllerName, SageDetailController } from "./sages/sageDetailController";
import { sageEditControllerName, SageEditController } from "./sages/sageEditController";
import { sayingsControllerName, SayingsController } from "./sayings/sayingsController";
import { sayingEditControllerName, SayingEditController } from "./sayings/sayingEditController";
import { aboutControllerName, AboutController } from "./about/aboutController";
import { shellControllerName, ShellController } from "./layout/shellController";
import { sidebarControllerName, SidebarController } from "./layout/sidebarController";
import { topnavControllerName, TopNavController } from "./layout/topnavController";
import { datacontextServiceFactoryName, datacontextServiceFactory } from "./services/datacontext";
import { repositoriesServiceFactoryName, repositoriesServiceFactory } from "./services/repositories";
import { repositorySageServiceName, RepositorySageService } from "./services/repository.sage";
import { repositorySayingServiceName, RepositorySayingService } from "./services/repository.saying";
import { imgPersonName, imgPerson } from "./directives/imgPerson";
import { serverErrorName, serverError, serverErrorTooltipName, serverErrorTooltip } from "./directives/serverError";
import { sidebarName, sidebar } from "./directives/sidebar";
import { spinnerName, spinner } from "./directives/spinner";
import { waiterName, waiter } from "./directives/waiter";
import { widgetCloseName, widgetClose } from "./directives/widgetClose";
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
    .controller(dashboardControllerName, DashboardController)
    .controller(sagesControllerName, SagesController)
    .controller(sageDetailControllerName, SageDetailController)
    .controller(sageEditControllerName, SageEditController)
    .controller(sayingsControllerName, SayingsController)
    .controller(sayingEditControllerName, SayingEditController)
    .controller(aboutControllerName, AboutController)
    .controller(shellControllerName, ShellController)
    .controller(sidebarControllerName, SidebarController)
    .controller(topnavControllerName, TopNavController)

    .factory(datacontextServiceFactoryName, datacontextServiceFactory)
    .factory(repositoriesServiceFactoryName, repositoriesServiceFactory)
    .service(repositorySageServiceName, RepositorySageService)
    .service(repositorySayingServiceName, RepositorySayingService)

    .directive(imgPersonName, imgPerson)
    .directive(serverErrorName, serverError)
    .directive(serverErrorTooltipName, serverErrorTooltip)
    .directive(sidebarName, sidebar)
    .directive(spinnerName, spinner)
    .directive(waiterName, waiter)
    .directive(widgetCloseName, widgetClose)
    .directive(widgetHeaderName, widgetHeader)
    .directive(widgetMinimizeName, widgetMinimize)
    ;
}

export default createApp;