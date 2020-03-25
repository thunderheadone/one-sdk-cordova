import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Platform } from 'ionic-angular';

declare var window:any;

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(platform:Platform) {
    platform.ready().then(() => {
      window.One.sendInteraction('/Tabs',null);
      window.One.sendProperties('/Tabs',{key:'value'});
    })
  }
}
