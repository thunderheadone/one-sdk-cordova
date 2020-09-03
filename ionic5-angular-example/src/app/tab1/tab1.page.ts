import { Component } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor() {}

  ionViewDidEnter() {
    var one = window.One;
    one.sendInteraction("/tab1", null, 
      function(response) {
        console.log(response)
      }, 
      function(error) { 
        console.log(error)
      }
    );
  }

}
