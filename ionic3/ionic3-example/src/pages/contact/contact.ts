import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Platform } from 'ionic-angular';


declare var window:any;

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {

  constructor(public navCtrl: NavController, platform:Platform) {
    platform.ready().then(() => {
      window.One.sendInteraction('/Contacts',null);
      window.One.sendProperties('/Contacts',{key:'value'});
    })
  }

}
