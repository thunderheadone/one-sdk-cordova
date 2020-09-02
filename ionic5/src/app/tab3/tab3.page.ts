import { Component } from '@angular/core';

declare var window:any;

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  ionViewDidEnter() {
    var one = window.One;
    one.sendInteraction("/tab3", null, 
      function(response) {
        console.log(response)
      }, 
      function(error) { 
        console.log(error)
      }
    );
  }

}
