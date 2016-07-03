export interface loggerFunction {
    (message: string, data?: Object, showToast?: boolean): void;
}

export interface loggers {
    info: loggerFunction;
    error: loggerFunction;
    success: loggerFunction;
    warn: loggerFunction;
}

interface loggerFunctionWithSource {
    (message: string, data: Object, source: string, showToast: boolean): void;
}

interface loggerInternals {
    [fnName: string]: any;
    logError: loggerFunctionWithSource;
    logInfo: loggerFunctionWithSource;
    logSuccess: loggerFunctionWithSource;
    logWarning: loggerFunctionWithSource;
}

export const loggerServiceName = "logger";

export class LoggerService {

    internals: loggerInternals;
    static $inject = ["$log", "toastr"];
    constructor(private $log: ng.ILogService, private toastr: Toastr) {
        this.internals = {
            logError: this.logError,
            logInfo: this.logInfo,
            logSuccess: this.logSuccess,
            logWarning: this.logWarning
        }
    }

    getLogFn(moduleId: string, fnName?: string) {
        fnName = fnName || "info";
        switch (fnName.toLowerCase()) { // convert aliases
            case "success":
                fnName = "logSuccess"; break;
            case "error":
                fnName = "logError"; break;
            case "warn":
                fnName = "logWarning"; break;
            default:
                fnName = "logInfo"; break;
        }

        var logFn: loggerFunctionWithSource = this.internals[fnName] || this.internals.logInfo;
        return function (msg: string, data: Object, showToast: boolean) {

            var displayToast = (showToast === undefined)
                ? (fnName !== "logInfo") ? true : false
                : showToast;

            logFn(msg, data, moduleId, displayToast);
        };
    }

    getLoggers(moduleId: string): loggers {

        return {
            error: this.getLogFn(moduleId, "error"),
            info: this.getLogFn(moduleId, "info"),
            success: this.getLogFn(moduleId, "success"),
            warn: this.getLogFn(moduleId, "warn")
        }
    }

    logInfo = (message: string, data: Object, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, "info");
    }

    logWarning = (message: string, data: Object, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, "warning");
    }

    logSuccess = (message: string, data: Object, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, "success");
    }

    logError = (message: string, data: Object, source: string, showToast: boolean) => {
        this.logIt(message, data, source, showToast, "error");
    }

    logIt(message: string, data: Object, source: string, showToast: boolean, logType: string) {

        var logger: ng.ILogCall;
        var toastType: ToastrDisplayMethod;

        if (logType === "error") {
            logger = this.$log.error;
            toastType = this.toastr.error;
        } else if (logType === "warning") {
            logger = this.$log.warn;
            toastType = this.toastr.warning;
        } else if (logType === "success") {
            logger = this.$log.log;
            toastType = this.toastr.success;
        } else {
            logger = this.$log.debug;
            toastType = this.toastr.info;
        }

        source = source ? "[" + source + "] " : "";

        // Perform log 
        logger(source, message, data);

        // Show toast if required
        if (showToast) { toastType(message); }
    }
}