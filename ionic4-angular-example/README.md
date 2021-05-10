## Ionic 4 Angular Example 

An Ionic 4 example to demonstrate how to integrate and use the Thunderhead Cordova Plugin.

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

	```angular
	  import { Component } from '@angular/core';
	  import { Platform } from '@ionic/angular';

	  declare var window;

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

2. From Terminal, navigate into the `ionic4-angular-example` project directory, and run the following commands:
    * Install Node dependencies
      ```
      $ npm install
      ```
    * Install Thunderhead Cordova Plugin
      ```
      // installs from npm
      $ ionic cordova plugin add cordova-plugin-one       
      OR 
      // installs from local file reference
      $ ionic cordova plugin add ../../cordova-plugin-one 
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
	$ ionic cordova prepare ios
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
$ ionic cordova plugin add cordova-plugin-one  
```

## Questions or need help

### Thunderhead ONE Support
_The Thunderhead team is available 24/7 to answer any questions you have. Just email onesupport@thunderhead.com or visit our docs page for more detailed installation and usage information._

### Salesforce Interaction Studio Support
_For Salesforce Marketing Cloud Interaction Studio questions, please submit a support ticket via https://help.salesforce.com/home_
