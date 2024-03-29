## Ionic 4 Angular Example 

An Ionic 4 example to demonstrate how to integrate and use the Thunderhead Cordova Plugin.

## Requirements

Android Studio Arctic Fox
Xcode 12+

The example app was built using the following versions:

```
Ionic:

   Ionic CLI                     : 6.18.1 
   Ionic Framework               : @ionic/angular 4.7.1
   @angular-devkit/build-angular : 0.801.3
   @angular-devkit/schematics    : 8.1.3
   @angular/cli                  : 8.1.3
   @ionic/angular-toolkit        : 2.0.0

Cordova:

   Cordova CLI       : 10.0.0
   Cordova Platforms : android 9.1.0, ios 6.2.0
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 7 other plugins)

Utility:

   cordova-res : 0.15.3
   native-run  : 1.5.0

System:

   Android SDK Tools : 26.1.1 
   ios-sim           : 8.0.2
   NodeJS            : v16.13.0 
   npm               : 8.1.0
   OS                : macOS Big Sur
   Xcode             : Xcode 13.1 Build version 13A1030d
```

## Setup

1. Open `app.component.ts`, declare a `window` variable and configure ONE when the platform is ready. 
    * The configuration parameters include:
      * Site Key (for your specific Space)
      * Touchpoint URI
        * The native Thunderhead SDK will automatically prefix the URI scheme (i.e. android:// and ios://) when it is omitted. 
          * i.e. “optimization-example”
        * If you want to configure under a single Touchpoint, you can explicitly prefix your URI scheme 
          * i.e. “ionic://optimization-example”
      * API Key & Shared Secret (required for OAuth 1.0 authentication)
      * Username/User ID (required for OAuth 1.0 authentication)
      * Host name. 
        * Typically, this is https://na5.thunderhead.com or https://eu2.thunderhead.com.
      * Admin Mode
        * Admin mode (adminMode = true) provides you with an interface that lets you add Interaction Points, Activity Capture Points, and Attribute Capture Points to native UI elements within the app.  However, hybrid apps do not support this feature because hybrid solutions typically use  non-native UI elements .  Only preview mode is supported to view your unpublished (In the Works) configuration before publishing it to your live environment.
          * The Admin mode build should only be distributed internally to business users involved in ONE setup. This is your internal dev build.
        * User Mode (adminMode = false) User mode build should be used for production builds, when you are satisfied that all insights are being tracked in Admin mode and internal QA requirements have been met.
      * For more information, [Find the Information required when Integrating ONE with your Mobile App](https://na5.thunderhead.com/one/help/conversations/how-do-i/mobile/one_integrate_mobile_find_integration_info/)

  ```typescript
  import { Component } from '@angular/core';
  import { Platform } from '@ionic/angular';

  declare var window:any;

  @Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
  })

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
            touchpointURI: "ionic://optimization-example",
            adminMode: false
          });
        }
      });
    }
  }
  ```

2. From Terminal, navigate into the `ionic4-angular-example` project directory, and run the following command:
    * Install Node dependencies
      ```
      $ npm install
      ```

## Start the Ionic app in iOS or Android
You can start the app either through Terminal or running it in your IDE.  

* To run the project in your IDE, you must first run the below commands from the project directory.  Then, you can find the respective project files located in the `platforms` folder to open and run with Xcode and/or Android Studio. 

	```
	// iOS
	$ ionic cordova platform add ios
	$ ionic cordova prepare ios
	```

	```
	// Android
	$ ionic cordova platform add android
	$ ionic cordova prepare android
	```

* To run the project in Terminal, run the following commands from the project directory.

	```
	// iOS
	$ ionic cordova platform add ios
	$ ionic cordova emulate ios
	```

	```
	// Android
	$ ionic cordova platform add android
	$ ionic cordova emulate android
	```

## Clean Build 
For most common build issues, a full clean usually resolves it in which you'll need to go through the setup process again.

To do a full clean, run the following script from the project directory:

```
$ ./clean.sh

// Setup again
$ npm install
```

## Questions or need help

### Thunderhead ONE Support
_The Thunderhead team is available 24/7 to answer any questions you have. Just email onesupport@thunderhead.com or visit our docs page for more detailed installation and usage information._

### Salesforce Interaction Studio Support
_For Salesforce Marketing Cloud Interaction Studio questions, please submit a support ticket via https://help.salesforce.com/home_
