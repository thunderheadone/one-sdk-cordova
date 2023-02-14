import { Component } from '@angular/core';
import { LoggerService } from './logger.service';
import { ThunderheadService } from './thunderhead/thunderhead.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private readonly thunderhead: ThunderheadService,
    private readonly logger: LoggerService
  ) { }

  ngOnInit() {
    // Uncomment to turn on logging.
    // this.thunderhead.enableLogging(true)


    // Update with your space details.
    this.thunderhead.configure({
      siteKey: "ONE-XXXXXXXXXX-1022",
      apiKey: "f713d44a-8af0-4e79-ba7e-xxxxxxxxxxxxxxxx",
      sharedSecret: "bb8bacb2-ffc2-4c52-aaf4-xxxxxxxxxxxxxxxx",
      userId: "api@yourCompanyName",
      hostName: "https://xx.thunderhead.com",
      touchpointURI: "ionic://optimization-example",
    })
      .then((configured) => {
        this.logger.log("Sucessfully configured Thunderhead One: ", configured)
      })
      .catch((error) => {
        this.logger.error("Error configuring Thunderhead One: ", error)
      })

    // Uncomment to opt out of all tracking
    // this.thunderhead.opt(true)
  }
}
