import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';


declare var window:any;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, platform:Platform) {
    platform.ready().then(() => {
      window.One.sendInteraction('/About',null);
      window.One.sendProperties('/About',{key:'value'});
    })
  }

}
