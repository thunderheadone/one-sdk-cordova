## Ionic 5 Angular Example 

An Ionic 5 example to demonstrate how to integrate and use the Thunderhead Cordova Plugin.

### Setup

1. Open `app.component.ts` and input your ONE credentials.
	```
	one.init({
	  siteKey: "ONE-M9HVDYLBYY-XXXX",
	  apiKey: "eff883bb-d4e5-4d0e-bba0-xxxxx",
	  sharedSecret: "f22413d6-1667-46e5-bfcb-xxxxxx",
	  userId: "user@domain",
	  hostName: "https://xxx.thunderhead.com",
	  touchpointURI: "optimization-example",  
	  adminMode: false
	});
	```

2. From Terminal, navigate into the `ionic5-angular-example` project directory, and run the following commands:
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
