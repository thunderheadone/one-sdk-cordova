import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var window:any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeOne();
  }

  private initializeOne() {
    // The platform is ready and native functionality can be called.
    // https://ionicframework.com/docs/angular/platform#ready-promise-string-
    this.platform.ready().then(() => {
      var one = window.One;

      if (one) {
        one.init({
          siteKey: "ONE-XXXXXXXXXX-1022",
          apiKey: "f713d44a-8af0-4e79-ba7e-xxxxxxxxxxxxxxxx",
          sharedSecret: "bb8bacb2-ffc2-4c52-aaf4-xxxxxxxxxxxxxxxx",
          userId: "api@yourCompanyName",
          hostName: "https://xx.thunderhead.com",
          touchpointURI: "ionic://optimization-example",
          adminMode: false
        });
      }
    });
  }
}
