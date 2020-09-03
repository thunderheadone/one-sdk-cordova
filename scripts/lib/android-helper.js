var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");
var logger = require("console");

module.exports = {
    // Append a section to the build.gradle file of an android project
    addPushSupportToGradle: function (context) {
        logger.log("Start adding push support to build.gradle...");
        var buildGradle = utilities.readBuildGradle();
        buildGradle +=
           `
            // Push support - START
            dependencies {
                compile("com.google.firebase:firebase-messaging:10.0.1")
                //compile("com.google.android.gms:play-services-base:10.0.1")
                //compile("com.google.android.gms:play-services-gcm:10.0.1")
            }
            // Push support - END`;
        
        utilities.writeBuildGradle(buildGradle);
        logger.log("End adding push support to build.gradle...");
    },

    removePushSupportFromGradle: function () {
        var buildGradle = utilities.readBuildGradle();
        buildGradle = buildGradle.replace(/\n\s+\/\/ Push support - START[\s\S]*\/\/ Push support - END/, "");
        utilities.writeBuildGradle(buildGradle);
    }
};
