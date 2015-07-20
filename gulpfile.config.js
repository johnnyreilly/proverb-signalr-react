var path = require('path');
var wiredep = require('wiredep');

﻿var tsjsmapjsSuffix = ".{ts,js.map,js}";

/**
 * Get the scripts or styles the app requires by combining bower dependencies and app dependencies
 *
 * @param {string} jsOrCss Should be 'js' or 'css'
 */
function getBowerScriptsOrStyles(jsOrCss, additionalFiles, wiredepOptions) {

    var bowerScriptsOrStylesAbsolute = wiredep(wiredepOptions)[jsOrCss];

    var bowerScriptsRelativeOrStyles = bowerScriptsOrStylesAbsolute.map(function makePathRelativeToCwd(file) {
        return path.relative('', file);
    });

    var appScriptsOrStyles = bowerScriptsRelativeOrStyles.concat(additionalFiles ? additionalFiles : []);

    return appScriptsOrStyles;
}

/**
 * Get the scripts the app requires
 */
function getScripts() {

    return getBowerScriptsOrStyles('js', config.scripts, config.wiredepOptions);
}

/**
 * Get the styles the app requires
 */
function getStyles() {

    return getBowerScriptsOrStyles('css');
}

var bower = "bower_components/";
var src = "src/";
var app = src + "app/";
var tests = "tests/";

var config = {
    getBowerScriptsOrStyles: getBowerScriptsOrStyles,
    getScripts: getScripts,
    getStyles: getStyles,

    base: ".",
    buildDir: "./build/",
    debug: "debug",
    release: "release",
    css: "css",

    bootFile: src + "index.html",
    bootjQuery: bower + "jquery/dist/jquery.min.js",

    // The fonts we want Gulp to process
    fonts: [bower + "fontawesome/fonts/*.*"],

    images: src + "images/**/*.{gif,jpg,png}",

    // The scripts we want Gulp to process
    scripts: [
        // Bootstrapping
        app + "app" + tsjsmapjsSuffix,
        app + "config.route" + tsjsmapjsSuffix,

        // common Modules
        app + "common/common" + tsjsmapjsSuffix,
        app + "common/logger" + tsjsmapjsSuffix,
        app + "common/spinner" + tsjsmapjsSuffix,

        // common.bootstrap Modules
        app + "common/bootstrap/bootstrap.dialog" + tsjsmapjsSuffix,

        // directives
        app + "directives/**/*" + tsjsmapjsSuffix,

        // services
        app + "services/**/*" + tsjsmapjsSuffix,

        // controllers
        app + "about/**/*" + tsjsmapjsSuffix,
        app + "admin/**/*" + tsjsmapjsSuffix,
        app + "dashboard/**/*" + tsjsmapjsSuffix,
        app + "layout/**/*" + tsjsmapjsSuffix,
        app + "sages/**/*" + tsjsmapjsSuffix,
        app + "sayings/**/*" + tsjsmapjsSuffix
    ],

    // The styles we want Gulp to process
    styles: [
        src + "styles/styles.less"
    ],

    tests: [
      tests + "bootstrapper.js",
      tests + "**/*tests*.js"
    ],

    wiredepOptions: {
        exclude: [/jquery/],
        ignorePath: ".."
    }
};

config.debugFolder = config.buildDir + config.debug + "/";
config.releaseFolder = config.buildDir + config.release + "/";

config.templateFiles = [
    app + "**/*.html",
    "!" + config.bootFile // Exclude the launch page
];


module.exports = config;
