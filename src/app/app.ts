import angular from "angular";
import "angular-animate";
import "angular-sanitize";
import "angular-ui-bootstrap";
import "angular-ui-router";
import toastr from "toastr";
import moment from "moment";

import { configName, Config, AppConfig } from "./typesAndInterfaces/config";
import { commonConfigProviderName, CommonConfigProvider } from "./common/common";
import { LoggerService } from "./common/logger";
import createApp from "./app.register";
import { routesName, getRoutes, configureRoutes, getTemplatesToCache } from "./app.routes";

/**
 * Add 3rd party libraries to Angular app
 */
function addThirdPartyLibs(app: ng.IModule) {

    // Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = "toast-bottom-right";
    app.constant("toastr", toastr);

    // Moment
    app.constant("moment", moment);
}

/**
 * Configure application
 */
function configureApp(app: ng.IModule, appConfig: AppConfig) {

    const config: Config = {
        appErrorPrefix: "[Error] ", // Configure the exceptionHandler decorator
        appName: appConfig.appName,
        appRoot: appConfig.appRoot,
        events: {
            controllerActivateSuccess: "controller.activateSuccess",
            failure: "failure",
            spinnerToggle: "spinner.toggle",
            waiterStart: "waiter.start",
            waiterSuccess: "waiter.success"
        },
        inDebug: appConfig.inDebug,
        remoteServiceRoot: appConfig.remoteServiceRoot,
        urlCacheBusterSuffix: "?v=" + ((appConfig.inDebug) ? Date.now().toString() : appConfig.version),
        version: appConfig.version
    };

    app.value(configName, config);

    app.config(["$logProvider", "$compileProvider", (
        $logProvider: ng.ILogProvider,
        $compileProvider: ng.ICompileProvider
    ) => {
        $logProvider.debugEnabled(config.inDebug);
        $compileProvider.debugInfoEnabled(config.inDebug);
    }]);

    // Copy across config settings to commonConfigProvider to configure the common services
    app.config([commonConfigProviderName, function (commonConfigProvider: CommonConfigProvider) {

        // Copy events across from config.events
        commonConfigProvider.config.events = Object.assign({}, config.events);
    }]);
}

/**
 * Configure the HTTP Provider
 */
function configureHttpProvider(app: ng.IModule) {

    const serviceId = "urlInterceptor";
    app.factory(serviceId, ["$templateCache", "config", function ($templateCache: angular.ITemplateCacheService, config: Config) {

        const service = {
            request: request
        };

        return service;

        function request(requestConfig: angular.IRequestConfig) {

            // For the loading of HTML templates we want the appRoot to be prefixed to the path
            // and we want a suffix to either allow caching or prevent caching
            // (depending on whether in debug mode or not)
            if (requestConfig.method === "GET" && requestConfig.url.toLowerCase().endsWith(".html")) {

                // If this has already been placed into a primed template cache then we should leave the URL as is
                // so that the version in templateCache is served.  If we tweak the URL then it will not be found
                const cachedAlready = $templateCache.get(requestConfig.url);
                if (!cachedAlready) {
                    requestConfig.url = config.appRoot + requestConfig.url + config.urlCacheBusterSuffix;
                }

                let i = 2;
            }

            return requestConfig;
        }
    }]);

    app.config(["$httpProvider", function ($httpProvider: angular.IHttpProvider) {
        $httpProvider.interceptors.push(serviceId);
    }]);
}

/**
 * Configure by setting an optional string value for appErrorPrefix.
 * Accessible via config.appErrorPrefix (via config value).
 */
function decorateExceptionHandler(app: ng.IModule) {

    app.config(["$provide", function ($provide: angular.auto.IProvideService) {

        // Extend the $exceptionHandler service to also display a toast.
        $provide.decorator("$exceptionHandler",
            ["$delegate", "config", "logger", extendExceptionHandler]);

        function extendExceptionHandler($delegate: angular.IExceptionHandlerService, config: Config, logger: LoggerService) {
            const appErrorPrefix = config.appErrorPrefix;
            const logError = logger.getLogFn("app", "error");
            return function (exception: Error, cause: string) {
                $delegate(exception, cause);
                if (appErrorPrefix && exception.message.startsWith(appErrorPrefix)) { return; }

                const errorData = { exception: exception, cause: cause };
                const msg = appErrorPrefix + exception.message;
                logError(msg, errorData, true);
            };
        }
    }]);
}

function registerRoutes(app: ng.IModule) {
    app.constant(routesName, getRoutes());
    app.config(configureRoutes);
}

function registerTemplatesToCache(app: ng.IModule) {
    app.run(["$templateCache",
    ($templateCache: ng.ITemplateCacheService) => {
        getTemplatesToCache().forEach((template, url) => {
            $templateCache.put(url, template);
        });
    }]);
}

export function initialiseApp(appConfig: AppConfig) {

    const app = createApp();

    addThirdPartyLibs(app);

    configureApp(app, appConfig);

    decorateExceptionHandler(app);

    configureHttpProvider(app);

    registerRoutes(app);

    registerTemplatesToCache(app);

    return app.name;
}

export function startApp(appName: string) {
    angular.element(document).ready(() => angular.bootstrap(document, [appName]));
}