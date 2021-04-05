import { Component } from '@angular/core';

declare var window:any;
var one = window.One;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  products: String[] = ["Product 1B", "Product 2B", "Product 1C", "Product 2C"]

  constructor() {}

  ionViewDidEnter() {
    var one = window.One;
    one.sendInteraction("/tab2", null,
      function(response) {
        // Fetch optimizations from response
        console.log("::tab2 Send Interaction response: ", response)
      },
      function(error) {
        console.log("::tab2 Send Interaction error: ", error)
      }
    );
  }

  onClick(product) {
    switch (product) {
      case "Product 1B": {
        one.sendInteraction("/tab2/B0", null,
          function(response) {
            console.log("::tab2 Send button (B0) Interaction response: ", response)
          },
          function(error) {
            console.log("::tab2 Send button (B0) Interaction error: ", error)
          }
        );
        break;
      }
      case "Product 2B": {
        one.sendInteraction("/tab2/B1", null,
          function(response) {
            console.log("::tab2 Send button (B1) Interaction response: ", response)
          },
          function(error) {
            console.log("::tab2 Send button (B1) Interaction error: ", error)
          }
        );
        break;
      }
      case "Product 1C": {
        one.sendInteraction("/tab2/B2", null,
          function(response) {
            console.log("::tab2 Send button (B2) Interaction response: ", response)
          },
          function(error) {
            console.log("::tab2 Send button (B2) Interaction error: ", error)
          }
        );
        break;
      }
      case "Product 2C": {
        one.sendInteraction("/tab2/B3", null,
          function(response) {
            console.log("::tab2 Send button (B3) Interaction response: ", response)
          },
          function(error) {
            console.log("::tab2 Send button (B3) Interaction error: ", error)
          }
        );
        break;
      }
      default:
        break;
    }
  }
}
