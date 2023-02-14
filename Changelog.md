#### Version 3.0.0
* [BREAKING] iOS: Added support for using the Cordova Plugin with Xcode 14.0. The Cordova Plugin now requires Xcode 14+.
* [UPDATE] iOS: Updated Thunderhead iOS SDK to v10.0.0

#### Version 2.1.1
* [UPDATE] Android: Updated Thunderhead Android SDK to v11.0.2

#### Version 2.1.0
* [UPDATE] Android: Updated Thunderhead Android SDK to v11.0.1
* [BUGFIX] Android: Fixed a build time error where `org.aspectj:aspectjtools:1.9.7.M1` could not be found. This will require [Orchestration Plugin version 6.0.1](https://github.com/thunderheadone/one-android-orchestration-plugin/releases/tag/6.0.1).  For more info, see our [Known Issues FAQ](https://support.thunderhead.com/hc/en-us/articles/4412362299287-Android-Could-not-find-org-aspectj-aspectjtools-1-9-7-M1)
* [UPDATE] iOS: Updated Thunderhead iOS SDK to v8.0.0

#### Version 2.0.5
* [UPDATE] Android: Updated Thunderhead Android SDK to v10.0.2
* [UPDATE] Android: Added support for cordova-android@10.1.1
* [BUGFIX] Android: For cordova-android@10.x.x apps, fixes a `java.lang.NoSuchMethodError` exception upon presenting an Activity. 

#### Version 2.0.4
- [UPDATE] Update Thunderhead Android SDK to [v10.0.0](https://github.com/thunderheadone/one-sdk-android/releases/tag/10.0.0).
- [UPDATE] Update Thunderhead Android Orchestration Plugin to [v5.0.1](https://github.com/thunderheadone/one-android-orchestration-plugin/releases/tag/5.0.1).
- [BUGFIX] Fixes `Illegal char` build error that occurs on Windows machines.

#### Version 2.0.3
* [BUGFIX] Removed duplicate `optOut` method.

#### Version 2.0.2
* [BUGFIX] Android: Replaced `ThunderheadApplication` with `ThunderheadProvider` to prevent Application class conflicts.

#### Version 2.0.1
* [BREAKING] Removed support for push notifications as announced on Oct 2020.  See details [here](https://eu2.thunderhead.com/one/help/conversations/release-notes/one_release_notes_58/).
* [NEW] Added ability to send response code.
* [NEW] Added ability to configure native Thunderhead SDK logging level.
* [NEW] Added ability to opt a user in or out of tracking.
* [NEW] Added [optimization example app](https://github.com/thunderheadone/one-sdk-cordova/tree/master/examples/optimizing-programmatically-using-json-example).
* [UPDATE] Update Thunderhead iOS SDK to [v6.3.7](https://github.com/thunderheadone/one-sdk-ios/releases/tag/6.3.7).
* [UPDATE] Update Thunderhead Android SDK to [v9.1.0](https://github.com/thunderheadone/one-sdk-android/releases/tag/9.1.0).

#### Version 1.4.0:
* [NEW] Support for Ionic 4 and 5.
* [NEW] Added Ionic 4 and 5 example projects.
* [UPDATE] Updated Thunderhead Android SDK to v5.0.1.
* [UPDATE] Updated Thunderhead iOS SDK to v5.2.1.
* [UPDATE] Updated the module README file. 
* [BUGFIX] Resolved an issue where the get push token method was not returning the push token stored by the SDK.

#### Version 1.3.0
* [NEW] Ability to track installs using pixel tracking
* [NEW] Ability to programmatically send 'one-click' interaction for a URL in an Android app
* [NEW] Ability to programmatically add a one-tid to a URL in an Android app
* [NEW] Ability to enable push notifications in an iOS and Android app
* [NEW] Ability to blacklist links not eligible for identity transfer
* [NEW] Ability to whitelist links eligible for identity transfer
* [NEW] Ability to perform identity sync between Mobile Safari and an iOS app
* [UPDATE] Updated the plugin.xml iOS frameworks and Android framework dependencies

#### Version 1.2.0

* [NEW] Added the latest ONE SDK for iOS v2.13.0
* [NEW] Added the latest ONE SDK for Android v2.10.0
* [NEW] Ability to enable push notification support in iOS
* [NEW] Ability to send and get the push token programmatically in iOS and Android
* [UPDATE] Improved the example app setup scripts to allow passing of device or simulator/emulator parameters, depending on which device the app should run
* [UPDATE] Improved the example app setup scripts to automatically setup push notification support in Xcode as part of the script

#### Version 1.1.1
* [NEW] Added the latest ONE SDK for iOS v2.10.0
* [NEW] Added the latest ONE SDK for Android v2.7.6


#### Version 1.1.0
* [NEW] Ability to programmatically send properties for an incoming URL
* [NEW] Ability to programmatically send 'one-click' interaction for a URL in an iOS app
* [NEW] Ability to programmatically add a one-tid to a URL in an iOS app
* [NEW] Ability to programmatically switch off automatic identity transfer
* [NEW] Ability to programmatically switch off automatic outbound link tracking
