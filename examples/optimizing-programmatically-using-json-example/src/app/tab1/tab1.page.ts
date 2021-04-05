import { Component, NgZone } from '@angular/core';
import { ImageListItem } from '../models/image-list-item';

const IMAGES: ImageListItem[] = [
  { src: 'assets/products/product-1A.png' },
  { src: 'assets/products/product-2A.png' },
  { src: 'assets/products/product-3A.png' },
];

const cardItemIdentifier = "card-item";
const topBannerIdentifier = "top-banner";

declare var window:any;
let one = window.One;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  images: ImageListItem[] = IMAGES;
  myOptimizationData = {};

  constructor(private zone: NgZone) {}

  ionViewDidEnter() {
    one.sendInteraction("/tab1", null,
      (response) => {
        console.log("::tab1 Send Interaction response: ", response)

        let newOptimizations = IMAGES

        for (var optimization of response.optimizations) {
          if (optimization.data) {
            // base64 decode optimization data
            let optimizationData = JSON.parse(atob(optimization.data))
            let content = JSON.parse(optimizationData.actions[0].asset.content)
            let responses = optimizationData.actions[0].asset.responses

            if (optimization.path == topBannerIdentifier && content.image) {
              console.log("::tab1 optimizing top banner: ", optimizationData.actions[0].name, content.image)
              newOptimizations[0] = { src: content.image }
            }
            if (optimization.path == cardItemIdentifier && content.image) {
              console.log("::tab1 optimizing card item: ", optimizationData.actions[0].name, content.image)
              newOptimizations[1] = { src: content.image }
            }

            this.myOptimizationData[optimization.path] = { optimization: optimization, responses: responses }
          }
        }

        this.zone.run(() => {
          this.images = newOptimizations
        })
      },
      function(error) {
        console.log("::tab1 Send Interaction error: ", error)
        this.zone.run(() => {
          this.images = IMAGES
        });
      }
    );
  }

  didSelectItem(index: number) {
    let optimizationPath: string = null
    if (index == 0) {
      optimizationPath = topBannerIdentifier
    } else if (index == 1) {
      optimizationPath = cardItemIdentifier
    }

    if (optimizationPath && this.myOptimizationData[optimizationPath]) {
      let response = this.myOptimizationData[optimizationPath].responses.find(response => response.sentiment == "positive")
      console.log("Sending response code: ", response.code)
      one.sendResponseCode(response.code, "/tab1")
    }
  }
}
