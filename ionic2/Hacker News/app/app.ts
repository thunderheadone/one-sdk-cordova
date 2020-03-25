import { Component, ViewChild } from '@angular/core';
import { Platform, ionicBootstrap, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';

import { HomePage } from './pages/home/home';
import { AboutPage } from './pages/about/about';
import { AskStoriesPage } from './pages/ask-stories/ask-stories';
import { ShowStoriesPage } from './pages/show-stories/show-stories';
import { ONE_PARAMETERS } from './config/one';

declare var window:any;

@Component({
  templateUrl: 'build/app.html'
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  private rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform:Platform) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Top Stories', component: HomePage },
      { title: 'Ask Stories', component: AskStoriesPage },
      { title: 'Show Stories', component: ShowStoriesPage },
      { title: 'Jobs', component: AboutPage }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      // Init ONE
      var one = window.One;
      if (one) {
          one.init({
                  siteKey: ONE_PARAMETERS.siteKey,
                  touchpointURI: ONE_PARAMETERS.touchpointURI,
                  apiKey: ONE_PARAMETERS.apiKey,
                  sharedSecret: ONE_PARAMETERS.sharedSecret,
                  userId: ONE_PARAMETERS.userId,
                  adminMode: ONE_PARAMETERS.adminMode,
                  hostName: ONE_PARAMETERS.hostName
                }
          );
          one.sendInteraction("/InitInteraction", null);
          
          // FCM
          one.enablePushNotifications(true);
          
          // GCM
          //one.enablePushNotifications(true,"776599322097");
      }

    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }

  openPage(page: any) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  clearTid() {
    window.One.clearUserProfile(function() {console.log("Tid is cleared!");});
  }
  
}

ionicBootstrap(MyApp);
