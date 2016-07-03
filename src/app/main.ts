import "babel-polyfill";
import initialise from "./app";
import $ from "jquery";

// Load startup data from the server
$.getJSON("//proverb.azurewebsites.net/Startup")
// $.getJSON("http://localhost:7778/Startup")
    .then(function (startUpData) {
        console.log("startupData", startUpData)
        const appName = initialise(startUpData);
        angular.element(document).ready(() => angular.bootstrap(document, [appName]));
    });
