# cordova-plugin-one
[![npm version](https://badge.fury.io/js/cordova-plugin-one.svg)](https://badge.fury.io/js/rcordova-plugin-one)

The ONE SDK Cordova Plugin for iOS and Android.

## Table of Contents
* [Requirements](#requirements)
    * [iOS version requirements](#ios-version-requirements)
    * [Android version requirements](#android-version-requirements)
* [Installation](#installation)
* [Configure the Thunderhead SDK](#configure-the-thunderhead-sdk)
* [Additional features](#additional-features)
    * [Opt out](#opt-out)
        * [Opt an end-user out of tracking](#opt-an-end-user-out-of-tracking)
        * [Opt an end-uer out of keychain Tid storage on iOS](#opt-an-end-uer-out-of-keychain-tid-storage-on-ios)
    * [Send an Interaction](#send-an-interaction)
    * [Send an Interaction with a Callback](#send-an-interaction-with-a-callback)
    * [Send properties to an Interaction](#send-properties-to-an-interaction)
    * [Send properties to a Base Touchpoint](#send-properties-to-a-base-touchpoint)
    * [Ability to whitelist identity transfer links](#ability-to-whitelist-identity-transfer-links)
    * [Ability to blacklist identity transfer links](#ability-to-blacklist-identity-transfer-links)
    * [Disable automatic identity transfer](#disable-automatic-identity-transfer)
    * [Get a URL with one-tid](#get-a-url-with-one-tid)
    * [Send properties for an incoming URL](#send-properties-for-an-incoming-url)
    * [Disable automatic outbound link tracking](#disable-automatic-outbound-link-tracking)
        * [Programmatically trigger an outbound link tracking Interaction call](#programmatically-trigger-an-outbound-link-tracking-interaction-call)
    * [Get Tid](#get-tid)
    * [Clear the User Profile](#clear-the-user-profile)
* [Plugin removal](#plugin-removal)

## Requirements
The native Thunderhead SDKs require the following mininum versions:

+ cordova >= 9.0.0
+ cordova-ios >= 6.1.0
+ cordova-android >= 9.0.0
+ cococapods >= 1.9

### iOS version requirements
+ iOS minimum version (deployment target): iOS 9.0
+ iOS base SDK version: iOS 14.3

### Android version requirements
+ [Android Gradle Plugin](https://developer.android.com/studio/releases/gradle-plugin) 3.6.x
+ Android 5.0+ (API 21) and above
+ [Gradle](https://gradle.org/releases/) 5.6.4

## Installation
To install the ONE Cordova Plugin, navigate to your app’s folder and run the following command:
```sh
$ cordova plugin add cordova-plugin-one
```

## Configure the Thunderhead SDK
To configure the ONE Cordova Plugin, declare a `window` variable and configure ONE when platform is ready. 
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L28)
* The configuration parameters include:
    * Site Key (for your specific Space)
    * Touchpoint URI
        * The native Thunderhead SDK will automatically prefix the URI scheme, based on the platform the app runs on (i.e. android:// and ios://), when it is omitted. 
            * i.e. “optimization-example”
        * If you want to configure under a single Touchpoint, you can explicitly prefix your URI scheme 
            * i.e. “ionic://optimization-example”
    * API Key & Shared Secret (required for OAuth 1.0 authentication)
    * Username/User ID (required for OAuth 1.0 authentication)
    * Host name. 
        * Typically, this is https://na5.thunderhead.com or https://eu2.thunderhead.com.
    * Admin Mode
        * Admin mode (adminMode = true) provides you with an interface that lets you add Interaction Points, Activity Capture Points, and Attribute Capture Points to native UI elements within the app. However, hybrid apps do not support this feature because hybrid solutions typically use non-native UI elements. Only preview mode is supported to view your unpublished (In the Works) configuration before publishing it to your live environment.
            * The Admin mode build should only be distributed internally to business users involved in ONE setup. This is your internal dev build.
        * User Mode (adminMode = false) User mode build should be used for production builds, when you are satisfied that all insights are being tracked in Admin mode and internal QA requirements have been met.
* For more information, [Find the Information required when Integrating ONE with your Mobile App](https://na5.thunderhead.com/one/help/conversations/how-do-i/mobile/one_integrate_mobile_find_integration_info/)

    ```javascript
    import { Component } from '@angular/core';
    import { Platform } from '@ionic/angular';

    declare var window;
    ...

    export class AppComponent {
        constructor(private platform: Platform) {
            this.initializeOne();
        }

        private initializeOne() {
        // The platform is ready and native functionality can be called.
        // https://ionicframework.com/docs/angular/platform#ready-promise-string-
        this.platform.ready().then(() => {
            var one = window.One;
            if (one) {
                one.init({
                    siteKey: "ONE-XXXXXXXXXX-1022",
                    apiKey: "f713d44a-8af0-4e79-ba7e-xxxxxxxxxxxxxxxx",
                    sharedSecret: "bb8bacb2-ffc2-4c52-aaf4-xxxxxxxxxxxxxxxx",
                    userId: "api@yourCompanyName",
                    hostName: "https://xx.thunderhead.com",
                    touchpointURI: "optimization-example",
                    adminMode: false // only preview mode is supported.  
                });
            }
        });
        }
    }
	```

* *Note*: Only preview mode is supported in Admin Mode.

## Additional features

### Opt out

#### Opt an end-user out of tracking
To opt an end-user out of tracking, when the end-user does not give permission to be tracked in the client app, call the following public method:
```javascript
window.One.optOut(true);
```

#### Opt an end-uer out of keychain Tid storage on iOS 
On iOS, to opt out an end-user of all keychain Tid storage, call the opt method as shown below:
```javascript 
window.One.optOut(true, ['keychainTidStorage']);
```

### Send an Interaction 
To send an Interaction request with properties, call the following method:
```javascript
window.One.sendInteraction("/interactionPath", null);
```
To send an Interaction request without properties, call the following method:
```javascript
window.One.sendInteraction("/interactionPath", {key: "value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

### Send an Interaction with a Callback
To send an Interaction request with a callback and properties, call the following public method:
```javascript
window.One.sendInteraction("/interactionPath", {key: "value"}, 
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
window.One.sendInteraction("/interactionPath", null, 
    function(response) {
        console.log(response)
    }, 
    function(error) { 
        console.log(error)
    }
);
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

### Send properties to an Interaction
To send properties to a specific Interaction, call the following public method, passing in your JavaScript object containing your properties:
```javascript
window.One.sendProperties("/interactionPath", {key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L45)

### Send properties to a Base Touchpoint
To send properties to a Base Touchpoint, call the following public method and pass in your JavaScript object containing your properties:
```javascript
window.One.sendBaseTouchpointProperties({key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L53)

### Ability to whitelist identity transfer links
To whitelist links to which the SDK appends a one-tid, call the following public method:
```javascript
window.One.whitelistIdentityTransferLinks(["*.google.*","*.wikipedia.org"]);
```
**Note**: If a link is whitelisted, a one-tid will be appended to this link only.

### Ability to blacklist identity transfer links
To blacklist links to which the SDK appends a one-tid, call the following public method:
```javascript
window.One.blacklistIdentityTransferLinks(["*.bbc.com"]);
```
**Note**: If a link is blacklisted, a one-tid will be appended to all other links but the blacklisted link.

### Disable automatic identity transfer
To disable automatic identity transfer, call the following public method:
```javascript
var onDisablingAutomaticIdentityTransferSuccess = function() {
    // Do something
};
var onDisablingAutomaticIdentityTransferFailure = function(error) {
    console.log(error);
};
window.One.disableIdentityTransfer(true, onDisablingAutomaticIdentityTransferSuccess, onDisablingAutomaticIdentityTransferFailure);
```

### Get a URL with one-tid
To get a URL with one-tid, call the following public method:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onGetURLWithOneTidSuccess = function(urlWithOneTid) {
    // Do something with the returned URL;
};
var onGetURLWithOneTidFailure = function(error) {
    console.log(error);
};
window.One.getURLWithOneTid(url,onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
```

### Send properties for an incoming URL
To send properties for an incoming URL, call the following public method:
```javascript
var incomingURL = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onHandleURLSuccess = function() {
    // Do something
};
var onHandleURLError = function(error) {
    console.log(error);
};
window.One.handleURL(incomingURL, onHandleURLSuccess, onHandleURLError);
```

### Disable automatic outbound link tracking 
To disable automatic outbound link tracking, call the following public method:
```javascript
var onDisablingAutomaticLinkTrackingSuccess = function() {
    // Do something
};
var onDisablingAutomaticLinkTrackingFailure = function(error) {
    console.log(error);
};
window.One.disableAutomaticOutboundLinkTracking(true, onDisablingAutomaticLinkTrackingSuccess, onDisablingAutomaticLinkTrackingFailure);
```

#### Programmatically trigger an outbound link tracking Interaction call
If you have disabled automatic outbound link tracking, you can still track a URL, by calling:
```javascript
var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
var onSendInteractionForLinkSuccess = function() {
    // Do something
}
var onSendInteractionForLinkFailure = function(error) {
    console.log(error);
};
window.One.sendInteractionForOutboundLink(url, onSendInteractionForLinkSuccess, onSendInteractionForLinkFailure);
```

### Get Tid
To get the tid for the current app, call the following public method:
```javascript
var onTidSuccess = function(tid) {
    // Do something with the tid
};
window.One.getTid(onTidSuccess);
```

### Access debug information

To configure logging within Xcode and Android Studio, call the following methods:

1. `LogLevel.NONE` - if set, no messages will be displayed in the Xcode/Android Studio console.
    ```javascript
    window.one.setLogLevel(window.one.LogLevel.NONE);
    ```

2. `LogLevel.ALL` - if set, all log messages will be displayed in the Xcode/Android Studio console.
    ```javascript
    window.one.setLogLevel(window.one.LogLevel.ALL);
    ```
    
### Clear the User Profile
To clear the current app tid, call the following public method:
```javascript
var onClearUserProfileSuccess = function() {
    console.log("The SDK cleared the tid");
}
var onClearUserProfileFailure = function() {
    console.log("The SDK failed to clear the tid");
};
window.One.clearUserProfile(onClearUserProfileSuccess,onClearUserProfileFailure);
```

## Plugin removal
To remove the ONE Cordova Plugin, call the following command in Terminal:
``` sh
$ cordova plugin remove cordova-plugin-one
```
