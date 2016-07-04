export const configName = "config";

export interface Config extends AppConfig {
    appErrorPrefix: string;
    events: ConfigEvents;
    imageSettings?: {
        imageBasePath: string;
        unknownPersonImageSource: string;
    };
    urlCacheBusterSuffix: string;
}

export interface AppConfig {
    appName: string;
    appRoot: string;
    inDebug: boolean;
    remoteServiceRoot: string;
    version: string;
}

export interface ConfigEvents {
    controllerActivateSuccess: string;
    failure: string;
    spinnerToggle: string;
    waiterStart: string;
    waiterSuccess: string;
}
