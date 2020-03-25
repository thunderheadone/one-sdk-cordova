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
                  siteKey: "ONE-WSKWCQMKQI-1169",
                  touchpointURI: "cordova",
                  apiKey: "eff883bb-d4e5-4d0e-bba0-7c7094c3c112",
                  sharedSecret: "f22413d6-1667-46e5-bfcb-e0f9c61cb445",
                  userId: "apop@onedemo-presales",
                  adminMode: false,
                  hostName: "onedemo.thunderhead.com"
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
