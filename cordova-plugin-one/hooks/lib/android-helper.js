var fs = require("fs");
var path = require("path");
var utilities = require("./utilities");
var logger = require("console");

module.exports = {
    // Appends a section to the build.gradle file of an android project
    addOneBuildToolsGradle: function (context) {

    logger.log("One plugin: Start adding build.gradle config...");
    var buildGradle = utilities.readBuildGradle();
    buildGradle +=
        `
        // One Cordova Plugin - Start One SDK configuration
        buildscript {
            repositories {
                google()
                jcenter()
                maven {
                    name 'ThunderheadSpringMilestone'
                    url = 'https://repo.spring.io/milestone'
                }
                maven { url 'https://thunderhead.mycloudrepo.io/public/repositories/one-sdk-android' }
            }
            dependencies {
                classpath 'com.android.tools.build:gradle:3.6.4'
                classpath 'com.thunderhead.android:orchestration-plugin:4.0.0'
            }
        }
        // One Cordova Plugin - End One SDK configuration`;

    utilities.writeBuildGradle(buildGradle);
    logger.log("One plugin: build.gradle config added");
    },

    removeOneBuildToolsFromGradle: function () {
      var buildGradle = utilities.readBuildGradle();
      buildGradle = buildGradle.replace(/\n\s+\/\/ One Cordova Plugin - Start One SDK configuration[\s\S]*\/\/ One Cordova Plugin - End One SDK configuration/, "");
      utilities.writeBuildGradle(buildGradle);
    },

    addApplicationToManifest: function (context) {
      logger.log("One plugin: Adding android:name=\"com.thunderhead.MyApplication\" to AndroidManifest.xml...");
      var APP_CLASS = 'com.thunderhead.MyApplication';
      var platformRoot = path.join(context.opts.projectRoot, 'platforms/android');
      var manifestFile = path.join(platformRoot, 'app/src/main/AndroidManifest.xml');

      if (fs.existsSync(manifestFile)) {
          fs.readFile(manifestFile, 'utf8', function (err, data) {
              if (err) {
                logger.log("One Plugin: Read Manfiest file error: ", err.message);
                throw new Error('Unable to find AndroidManifest.xml: ' + err);
              }

              if (data.indexOf(APP_CLASS) == -1) {
                  var result = data.replace(/<application/g, '<application android:name="' + APP_CLASS + '"');
                  fs.writeFile(manifestFile, result, 'utf8', function (err) {
                      if (err) {
                        logger.log(":: Manfiest - write file error: ", err.message);
                        throw new Error('Unable to write AndroidManifest.xml: ' + err);
                      }
                  })
              } else {
                logger.log("One Plugin: Cannot find index of ", APP_CLASS);
              }
          });
      } else {
        logger.log("One Plugin: Cannot find AndroidManifest.xml.\n Manifest File: ", manifestFile);
      }
    }
};
