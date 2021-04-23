## Orchestration Example

An Ionic 5 example to demonstrate how to create Orchestrations with the Thunderhead Cordova Plugin.

### Requirements

The example app was built using the following versions:

```
Ionic:

   Ionic CLI                     : 6.13.1 (/usr/local/lib/node_modules/@ionic/cli)
   Ionic Framework               : @ionic/angular 5.6.5
   @angular-devkit/build-angular : 0.1102.10
   @angular-devkit/schematics    : 11.2.10
   @angular/cli                  : 11.2.10
   @ionic/angular-toolkit        : 3.1.1

Cordova:

   Cordova CLI       : 10.0.0
   Cordova Platforms : android 9.1.0, ios 6.2.0
   Cordova Plugins   : cordova-plugin-ionic-keyboard 2.2.0, cordova-plugin-ionic-webview 4.2.1, (and 7 other plugins)

Utility:

   cordova-res : 0.15.3
   native-run  : 1.3.0

System:

   Android SDK Tools : 26.1.1 (/Users/alexnguyen/Library/Android/sdk/)
   ios-sim           : 8.0.2
   NodeJS            : v15.13.0 (/usr/local/Cellar/node/15.13.0/bin/node)
   npm               : 7.10.0
   OS                : macOS Big Sur
   Xcode             : Xcode 12.4 Build version 12D4e

```

### Setup

1. To create Orchestrations in ONE for this tutorial, see this [guide](https://na5.thunderhead.com/one/help/conversations/how-do-i/mobile/ios-orchestrations/one_integrate_mobile_ios_orch_intro/).

	* *Note:* Skip `Step 1` in the guide as you'll be using this Ionic example app instead.

2. Open `app.component.ts`, declare a `window` variable and configure ONE when platform is ready. 
	* To find your ONE credentials, see [Find the Information required when Integrating ONE with your Mobile App](https://na5.thunderhead.com/one/help/conversations/how-do-i/mobile/one_integrate_mobile_find_integration_info/)
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
		    touchpointURI: "ionic://optimization-example",
		    adminMode: false
		  });
		}
	      });
	    }
	  }
	  ```

3. Install Node dependencies

	```
	$ npm install
	```

4. Install Thunderhead Cordova Plugin
	```
	// installs from npm
	$ ionic cordova plugin add cordova-plugin-one       
	OR 
	// installs from local file reference
	$ ionic cordova plugin add ../../cordova-plugin-one 
	```

### Start the Ionic app in iOS or Android
You can find the respective project files located in the `platforms` folder from the project directory to open and run with Xcode and/or Android Studio.

To run the project in Terminal, run the following commands from the project directory.
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

## Questions or need help

### Thunderhead ONE Support
_The Thunderhead team is available 24/7 to answer any questions you have. Just email onesupport@thunderhead.com or visit our docs page for more detailed installation and usage information._

### Salesforce Interaction Studio Support
_For Salesforce Marketing Cloud Interaction Studio questions, please submit a support ticket via https://help.salesforce.com/home_
