var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");
var logger = require("console");

module.exports = {
    //Appends a section to the build.gradle file of an android project
    addOneBuildToolsGradle: function (context) {
        if (!utilities.getOneAspectsEnabled(context)) {
            logger.log("One plugin: Aspect functionality wasn't enabled");
            logger.log("One plugin: Skipping...")
            return;
        }
        logger.log("One plugin: Start adding build.gradle config...");
        var buildGradle = utilities.readBuildGradle();
        buildGradle +=
           `
           // One Cordova Plugin - Start One Aspectj configuration
            buildscript {
                repositories {
                    maven { url 'https://jitpack.io' }
                    jcenter()
                }
                dependencies {
                    classpath 'com.android.tools.build:gradle:2.3.0'
                    classpath 'com.github.Archinamon:GradleAspectJ-Android:3.0.2'
                }
            }
            repositories { maven { url 'https://jitpack.io' }}
            apply plugin: 'com.archinamon.aspectj-ext'

            ext.cdvBuildToolsVersion = '25.0.3'
            
            aspectj {
               includeAspectsFromJar 'com.thunderhead'
               weaveInfo true
               debugInfo false
               addSerialVersionUID false
               noInlineAround false
               ignoreErrors false
               breakOnError true
               experimental false
               
               transformLogFile 'ajc-transform.log'
               compilationLogFile 'ajc-compile.log'
            }
            // One Cordova Plugin - End One Aspectj configuration`;
        
        utilities.writeBuildGradle(buildGradle);
        logger.log("One plugin: build.gradle config added");
    },

    removeOneBuildToolsFromGradle: function () {
        var buildGradle = utilities.readBuildGradle();
        buildGradle = buildGradle.replace(/\n\s+\/\/ One Cordova Plugin - Start One Aspectj configuration[\s\S]*\/\/ One Cordova Plugin - End One Aspectj configuration/, "");
        utilities.writeBuildGradle(buildGradle);
    }
};
