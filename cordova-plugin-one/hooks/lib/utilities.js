
/**
 * Utilities and shared functionality for the build hooks.
 */

var path = require("path");
var fs = require("fs");
var console = require("console");

/**
 * Used to get the path to the build.gradle file for the Android project.
 *
 * @returns {string} The path to the build.gradle file.
 */
function getBuildGradlePath() {
    return path.join("platforms", "android", "build.gradle");
};

/**
 * Used to get the path to the app build.gradle file.
 *
 * @returns {string} The path to the app build.gradle file.
 */
function getAppBuildGradlePath() {
    return path.join("platforms", "android", "app", "build.gradle");
};

module.exports = {

    /**
     * Used to get the name of the application as defined in the config.xml.
     * 
     * @param {object} context - The Cordova context.
     * @returns {string} The value of the name element in config.xml.
     */
    getAppName: function (context) {
        var ConfigParser = context.requireCordovaModule("cordova-lib").configparser;
        var config = new ConfigParser("config.xml");
        return config.name();
    },

    /**
     * The ID of the plugin; this should match the ID in plugin.xml.
     */
    getPluginId: function () {
        return "cordova-plugin-one";
    },

    /**
     * Used to read the contents of the Android project's build.gradle file.
     *
     * @returns {string} The contents of the Android project's build.gradle file.
     */
    readBuildGradle: function () {
        return fs.readFileSync(getBuildGradlePath(), "utf-8");
    },

    /**
     * Used to write the given build.gradle contents to the Android project's
     * build.gradle file.
     *
     * @param {string} buildGradle The body of the build.gradle file to write.
     */
    writeBuildGradle: function (buildGradle) {
        fs.writeFileSync(getBuildGradlePath(), buildGradle);
    },

    /**
     * Used to read the contents of the apps build.gradle file.
     *
     * @returns {string} The contents of the apps build.gradle file.
     */
    readAppBuildGradle: function () {
        return fs.readFileSync(getAppBuildGradlePath(), "utf-8");
    },

    /**
     * Used to write the given build.gradle contents to the apps
     * build.gradle file.
     *
     * @param {string} buildGradle The body of the build.gradle file to write.
     */
    writeAppBuildGradle: function (buildGradle) {
        fs.writeFileSync(getAppBuildGradlePath(), buildGradle);
    },

    isAndroidPlatform: function (platforms) {
        return platforms.indexOf("android") !== -1;
    }
};
