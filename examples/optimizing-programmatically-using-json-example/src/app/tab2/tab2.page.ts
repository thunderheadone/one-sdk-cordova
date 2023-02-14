import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { ThunderheadService } from '../thunderhead/thunderhead.service';

const product1b = "Product 1B"
const product2b = "Product 2B"
const product1c = "Product 1C"
const product2c = "Product 2C"

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  productInteractions = new Map<string, string>([
    [product1b, "/tab2/product-1B-button"],
    [product2b, "/tab2/product-2B-button"],
    [product1c, "/tab2/product-1C-button"],
    [product2c, "/tab2/product-2C-button"]
  ])

  constructor(
    private readonly thunderhead: ThunderheadService,
    private readonly logger: LoggerService
  ) { }

  onClickProduct(productInteraction: string) {
    this.thunderhead.sendInteraction(productInteraction, null)
      .then((response) => {
        this.logger.log("::tab2 sent interaction. ", productInteraction, response)
      })
      .catch((error: any) => { this.logger.error(error) })
  }
}
