import { Component, NgZone } from '@angular/core';
import { ThunderheadService } from '../thunderhead/thunderhead.service'
import { LoggerService } from '../logger.service';
import { ImageListItem } from '../models/image-list-item';

const IMAGES: ImageListItem[] = [
  { src: 'assets/products/product-1A.png' },
  { src: 'assets/products/product-2A.png' },
  { src: 'assets/products/product-3A.png' },
];

const cardItemIdentifier = "card-item";
const topBannerIdentifier = "top-banner";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  images: ImageListItem[] = IMAGES;
  private positiveResponseCodeMap: Map<string, string> | null = null

  constructor(
    private readonly thunderhead: ThunderheadService,
    private readonly ngZone: NgZone,
    private readonly logger: LoggerService
  ) { }

  ionViewDidEnter() {
    this.thunderhead.sendInteraction("/tab1", null)
      .then((response) => {
        this.logger.log("::tab1 Send Interaction Response: ", response)
        this.optimizeContent(response)
      })
      .catch((error) => {
        this.logger.error("::tab1 Send Interaction error: ", error)
        this.ngZone.run(() => {
          this.images = IMAGES
        })
      });
  }

  onClickImage(index: number) {
    let optimizationPath: string | null = null
    if (index == 0) {
      optimizationPath = topBannerIdentifier
    } else if (index == 1) {
      optimizationPath = cardItemIdentifier
    }

    if (optimizationPath && this.positiveResponseCodeMap && this.positiveResponseCodeMap.get(optimizationPath)) {
      let responseCode = this.positiveResponseCodeMap.get(optimizationPath)
      if (responseCode) {
        this.logger.log("::tab1 Sending response code: ", responseCode)

        this.thunderhead.sendInteractionReponseCode("/tab1", responseCode)
          .then(() => {
            this.logger.log("::tab1 Sent response code: ", responseCode)
          })
          .catch((error) => {
            this.logger.error("::tab1 Sending response code error: ", error)
          })
      } else {
        this.logger.log("::tab1 could not find positive response code")
      }
    }
  }

  private optimizeContent(response: any) {
    let newOptimizations = IMAGES
    let responseMap = new Map<string, string>()

    for (var optimization of response.optimizations) {
      if (optimization.data) {
        // base64 decode optimization data
        let optimizationData = JSON.parse(atob(optimization.data))
        let content = JSON.parse(optimizationData.actions[0].asset.content)
        let responses = optimizationData.actions[0].asset.responses

        if (optimization.path == topBannerIdentifier && content.image) {
          this.logger.log("::tab1 optimizing top banner: ", optimizationData.actions[0].name, content.image)
          newOptimizations[0] = { src: content.image }
        } else if (optimization.path == cardItemIdentifier && content.image) {
          this.logger.log("::tab1 optimizing card item: ", optimizationData.actions[0].name, content.image)
          newOptimizations[1] = { src: content.image }
        }

        let maybeResponse = responses.find((response: any) => response.sentiment == "positive")
        if (maybeResponse) {
          responseMap.set(
            <string>optimization.path,
            maybeResponse.code
          )
        }
      }
    }

    this.positiveResponseCodeMap = responseMap

    this.ngZone.run(() => {
      this.images = newOptimizations
    })
  }
}
