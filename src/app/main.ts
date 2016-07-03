import "babel-polyfill";
import { initialiseApp, startApp } from "./app";
import $ from "jquery";

// Load startup data from the server
$.getJSON("//proverb.azurewebsites.net/Startup")
// $.getJSON("http://localhost:7778/Startup")
    .then(startUpData => startApp(initialiseApp(startUpData)));
