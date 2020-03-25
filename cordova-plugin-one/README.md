# cordova-plugin-one
[![npm version](https://badge.fury.io/js/cordova-plugin-one.svg)](https://badge.fury.io/js/rcordova-plugin-one)

The Cordova Plugin for the ONE SDK for iOS and Android.

## Installation
To install the ONE Cordova Plugin, navigate to your app’s folder and run the following command:
```sh
$ cordova plugin add cordova-plugin-one --variable AUTOMATICIDENTITYTRANSFER=true
```
## Usage
### Initialization
To initialize the ONE Cordova Plugin, call the following method:
```javascript
    One.init({
        siteKey: <site-key>,
        touchpointURI: <touchpoint-uri>,
        apiKey: <api-key>
        sharedSecret:  <shared-secret>,
        userId:  <user-id>,
        adminMode:  <admin-mode>,
        hostName: <host-name>
        };
```
### Send an Interaction 
To send an Interaction request with properties, call the following method:
```javascript
One.sendInteraction("/interactionPath", null);
```
To send an Interaction request without properties, call the following method:
```javascript
One.sendInteraction("/interactionPath", {key: "value"});
```
### Send an Interaction with a Callback
To send an Interaction request with a callback and properties, call the following public method:
```javascript
One.sendInteraction("/interactionPath", {key: "value"}, 
    function(response) {
        console.log(response)
    }, 
    function(error) { 
        console.log(error)
    }
);
```
To send an Interaction request with a callback and without properties, call the following pubilc method:
```javascript
One.sendInteraction("/interactionPath", null, 
    function(response) {
        console.log(response)
    }, 
    function(error) { 
        console.log(error)
    }
);
```
### Send properties to an Interaction
To send properties to a specific Interaction, call the following public method, passing in your JavaScript object containing your properties:
```javascript
One.sendProperties("/interactionPath", {key:"value"});
```
### Send properties to a Base Touchpoint
To send properties to a Base Touchpoint, call the following public method and pass in your JavaScript object containing your properties:
```javascript
One.sendBaseTouchpointProperties({key:"value"});
```
### Get tid
To get the tid for the current app, call the following public method:
```javascript
var onTidSuccess = function(tid) {
    // Do something with the tid
};
One.getTid(onTidSuccess);
```
### Clear User Profile
To clear the current app tid, call the following public method:
```javascript
var onClearUserProfileSuccess = function() {
    console.log("The SDK cleared the tid");
}
var onClearUserProfileFailure = function() {
    console.log("The SDK failed to clear the tid");
};
One.clearUserProfile(onClearUserProfileSuccess,onClearUserProfileFailure);
```
### Identity transfer
####	Ability to whitelist identity transfer links
To whitelist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.whitelistIdentityTransferLinks(["*.google.*","*.wikipedia.org"]);
```
**Note**: If a link is whitelisted, a one-tid will be appended to this link only.
####	Ability to blacklist identity transfer links
To blacklist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.blacklistIdentityTransferLinks(["*.bbc.com"]);
```
**Note**: If a link is blacklisted, a one-tid will be appended to all other links but the blacklisted link.
#### Disable automatic identity transfer
To disable automatic identity transfer, call the following public method:
```javascript
var onDisablingAutomaticIdentityTransferSuccess = function() {
    // Do something
};
var onDisablingAutomaticIdentityTransferFailure = function(error) {
    console.log(error);
};
One.disableIdentityTransfer(true, onDisablingAutomaticIdentityTransferSuccess, onDisablingAutomaticIdentityTransferFailure);
```
#### Get a URL with one-tid
To get a URL with one-tid, call the following public method:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onGetURLWithOneTidSuccess = function(urlWithOneTid) {
    // Do something with the returned URL;
};
var onGetURLWithOneTidFailure = function(error) {
    console.log(error);
};
One.getURLWithOneTid(url,onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
```
#### Send properties for an incoming URL
To send properties for an incoming URL, call the following public method:
```javascript
var incomingURL = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onHandleURLSuccess = function() {
    // Do something
};
var onHandleURLError = function(error) {
    console.log(error);
};
One.handleURL(incomingURL, onHandleURLSuccess, onHandleURLError);
```
### Outbound link tracking
#### Disable automatic outbound link tracking 
To disable automatic outbound link tracking, call the following public method:
```javascript
var onDisablingAutomaticLinkTrackingSuccess = function() {
    // Do something
};
var onDisablingAutomaticLinkTrackingFailure = function(error) {
    console.log(error);
};
One.disableAutomaticOutboundLinkTracking(true, onDisablingAutomaticLinkTrackingSuccess, onDisablingAutomaticLinkTrackingFailure);
```
#### Send 'one-click' interaction for a URL
To send "one-click" Interaction request for a URL, call the following public method:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onSendInteractionForLinkSuccess = function() {
    // Do something
}
var onSendInteractionForLinkFailure = function(error) {
    console.log(error);
};
One.sendInteractionForOutboundLink(url, onSendInteractionForLinkSuccess, onSendInteractionForLinkFailure);
```
###	Identity sync
To perform identity sync with ONE, call the following public method:
```javascript
One.identitySync(null, function () {
    console.log("The identity sync has been scheduled.");
});
```
To perform identity sync with a web touchpoint, call the following public method by passing the web touchpoint’s URL:
```javascript
const url = "https://your-web-touchpoint-url";
One.identitySync(url, function () {
    console.log("The identity sync with " + url + "has been scheduled.");
});
```
###	Enable push notifications
#### iOS integration
To receive push notifications from ONE, take the following steps

1.	Open your app using Xcode.
2.	Enable **Push Notifications** in **Capabilities** pane.
3.	Enable **Background Modes** in **Capabilities** pane.
4.	Select **Remote Notifications** under **Background Modes** section.
5.	In your Cordova codebase call the method *enablePushNotifications* by passing **true**, as shown below:
```javascript
var onSuccess = function() {
    // Do something
};
var onError = function(error) {
    console.log(error);
};
One.enablePushNotifications(true, onSuccess, onError);
```
#### Android integration 
To receive push notifications from ONE, ensure the correct dependencies have been added to the project and that you have followed the FCM or GCM instructions to be able to receive push notifications.
##### Add dependencies to support push notifications
To enable push notifications functionality you need to make the following gradle build updates: 
1.	Add the messaging class path to your top-level build.gradle file, located in the root project directory, as shown below:
```groovy
buildscript {
    repositories {
        jcenter()
        mavenCentral()
        maven {}
    }

    dependencies {
        classpath 'com.android.tools.build:gradle:2.3.0'
        // for cloud messaging support
        classpath 'com.google.gms:google-services:3.0.0'
    }
}

allprojects {
    repositories {
        jcenter()
        mavenCentral()
    }
}
```
2.	Add the FCM or GCM dependencies and apply the Google Messaging Service plugin to the applications module-level build.gradle file, as shown below:
 - the FCM dependencies: 
```groovy
/**
* This plugin should come first than com.android.application otherwise 
* unexpected behaviour might be experienced - Source: http://stackoverflow.com/q/41010208
*/
apply plugin: 'com.google.gms.google-services'

ext {
    oneSupportLibVersion = "25.2.0"
}
dependencies {
    compile project(path: ':Thunderhead_android_release_2.15.0')
    compile fileTree(include: ['*.jar'], dir: 'libs')
    compile "com.android.support:support-v4:${oneSupportLibVersion}"
    compile "com.android.support:appcompat-v7:${oneSupportLibVersion}"
    compile "com.android.support:recyclerview-v7:${oneSupportLibVersion}"
    compile "com.android.support:design:${oneSupportLibVersion}"
    compile 'oauth.signpost:signpost-jetty6:1.2.1.2'
    compile 'com.squareup.retrofit2:retrofit:2.1.0'
    compile 'com.squareup.retrofit2:converter-gson:2.1.0'
    
    // FCM dependencies
    compile("com.google.firebase:firebase-messaging:10.0.1")
    compile("com.google.android.gms:play-services-base:10.0.1") 
}
```
 - the GCM dependencies: 
```javascript
/**
* This plugin should come first than com.android.application otherwise 
* unexpected behaviour might be experienced - Source: http://stackoverflow.com/q/41010208
*/
apply plugin: 'com.google.gms.google-services'

ext {
    oneSupportLibVersion = "25.2.0"
}
dependencies {
    compile project(path: ':Thunderhead_android_release_2.15.0')
    compile fileTree(include: ['*.jar'], dir: 'libs')
    compile "com.android.support:support-v4:${oneSupportLibVersion}"
    compile "com.android.support:appcompat-v7:${oneSupportLibVersion}"
    compile "com.android.support:recyclerview-v7:${oneSupportLibVersion}"
    compile "com.android.support:design:${oneSupportLibVersion}"
    compile 'oauth.signpost:signpost-jetty6:1.2.1.2'
    compile 'com.squareup.retrofit2:retrofit:2.1.0'
    compile 'com.squareup.retrofit2:converter-gson:2.1.0'
    
    // GCM dependencies
    compile ("com.google.android.gms:play-services-gcm:10.0.1")
}
```
###	Send a push token programmatically 
To send a push token programmatically to ONE, call the following public method:
```javascript
One.sendPushToken(token, 
    function() {
        console.log("The push token" + token +  " is sent.");
    }, function(error) {
        console.log("An error occurred when sending the push token: " + error);
    }
);
```
###	Get a push token programmatically  
To retrieve a push token stored in the iOS or Android SDK, call the following public method:
```javascript
One.getPushToken(function (token) {
    console.log(token);
});
```
## Plugin removal
To remove the ONE Cordova Plugin, call the following command in Terminal:
``` sh
$ cordova plugin remove cordova-plugin-one
```
