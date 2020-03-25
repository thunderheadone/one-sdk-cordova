import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

declare var window:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      var one = window.One;
      
      if (one) {
          one.init({
                  siteKey: "ONE-XXXXXXXXXX-1022",
                  touchpointURI: "myAppsNameURI",
                  apiKey: "f713d44a-8af0-4e79-ba7e-xxxxxxxxx",
                  sharedSecret: "bb8bacb2-ffc2-4c52-aaf4-xxx",
                  userId: "yourUsername@yourCompanyName",
                  adminMode: false,
                  hostName: "https://xx.thunderhead.com"
                  }
                  );
          one.sendInteraction('/App', null);
          one.sendBaseTouchpointProperties({key:'value'});
          one.sendInteractionForOutboundLink('https://www.thunderhead.com/?key=value');

          // FCM
          one.enablePushNotifications(true);
      }

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
