To run the app:

1. Ensure you have Ionic installed and you satisfy all the Ionic dependency requirements. To install ionic see: http://ionicframework.com/getting-started/

2. Open terminal and open the app folder:
$ cd kitchensink

3. Update the plugins used by the app:
$ ionic state reset

4. Add the Cordova ONE Plugin
$ ionic plugin add <path-to-plugin-folder>

5. Add SafariViewController Plugin
$ ionic plugin add cordova-plugin-safariviewcontroller

6. Add InAppBrowser Plugin
$ ionic plugin add cordova-plugin-inappbrowser

7. Run the app
- Android device 
	$ ionic run android
- Android emulator
	$ ionic emulate android
- iOS device 
	$ ionic run ios
- iOS simulator
	$ ionic emulate ios