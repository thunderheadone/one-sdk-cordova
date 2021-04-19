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

To configure the ONE Cordova Plugin, call the following method:
```javascript
    declare var window:any;

    var one = window.One;
    one.init({
        siteKey: <site-key>,
        touchpointURI: <touchpoint-uri>,
        apiKey: <api-key>,
        sharedSecret:  <shared-secret>,
        userId:  <user-id>,
        adminMode:  <admin-mode>,
        hostName: <host-name>
    };
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L28)

## Additional features

### Opt out

#### Opt an end-user out of tracking
To opt an end-user out of tracking, when the end-user does not give permission to be tracked in the client app, call the following public method:
```javascript
One.optOut(true);
```

#### Opt an end-uer out of keychain Tid storage on iOS 
On iOS, to opt out an end-user of all keychain Tid storage, call the opt method as shown below:
```javascript 
One.optOut(true, ['keychainTidStorage']);
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
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

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
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L37)

### Send properties to an Interaction
To send properties to a specific Interaction, call the following public method, passing in your JavaScript object containing your properties:
```javascript
One.sendProperties("/interactionPath", {key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L45)

### Send properties to a Base Touchpoint
To send properties to a Base Touchpoint, call the following public method and pass in your JavaScript object containing your properties:
```javascript
One.sendBaseTouchpointProperties({key:"value"});
```
* See example of usage [here](https://github.com/thunderheadone/one-sdk-cordova/tree/master/ionic5-angular-example/src/app/app.component.ts#L53)

### Ability to whitelist identity transfer links
To whitelist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.whitelistIdentityTransferLinks(["*.google.*","*.wikipedia.org"]);
```
**Note**: If a link is whitelisted, a one-tid will be appended to this link only.

### Ability to blacklist identity transfer links
To blacklist links to which the SDK appends a one-tid, call the following public method:
```javascript
One.blacklistIdentityTransferLinks(["*.bbc.com"]);
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
One.disableIdentityTransfer(true, onDisablingAutomaticIdentityTransferSuccess, onDisablingAutomaticIdentityTransferFailure);
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
One.getURLWithOneTid(url,onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
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
One.handleURL(incomingURL, onHandleURLSuccess, onHandleURLError);
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
One.disableAutomaticOutboundLinkTracking(true, onDisablingAutomaticLinkTrackingSuccess, onDisablingAutomaticLinkTrackingFailure);
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
One.sendInteractionForOutboundLink(url, onSendInteractionForLinkSuccess, onSendInteractionForLinkFailure);
```

### Get Tid
To get the tid for the current app, call the following public method:
```javascript
var onTidSuccess = function(tid) {
    // Do something with the tid
};
One.getTid(onTidSuccess);
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
One.clearUserProfile(onClearUserProfileSuccess,onClearUserProfileFailure);
```

## Plugin removal
To remove the ONE Cordova Plugin, call the following command in Terminal:
``` sh
$ cordova plugin remove cordova-plugin-one
```
