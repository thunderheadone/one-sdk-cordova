import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var window:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {
    var one = window.One;
    one.sendInteraction("/home", null, 
      function(response) {
        console.log(response)
      }, 
      function(error) { 
        console.log(error)
      }
    );
  }
  
}
