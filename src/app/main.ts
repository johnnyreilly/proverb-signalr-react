import "babel-polyfill";
import { initialiseApp, startApp } from "./app";

// Load startup data from the server
startApp(initialiseApp({
    appName: "Proverb",
    appRoot: __CONNECTION_URL__,
    inDebug: __IN_DEBUG__,
    remoteServiceRoot: __CONNECTION_URL__,
    version: __VERSION__
}));
