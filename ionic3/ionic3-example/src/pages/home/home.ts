import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

declare var window: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController, platform:Platform) {
    platform.ready().then(() => {
      window.One.sendInteraction('/Home',null);
      window.One.sendProperties('/Home',{key:'value'});
    })
  }

}
