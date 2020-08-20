import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

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
      }

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
