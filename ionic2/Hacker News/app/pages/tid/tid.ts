import {ViewController, Platform} from 'ionic-angular';
import { Component } from '@angular/core';

declare var window:any;

@Component({
  templateUrl: 'build/pages/tid/tid.html'
})
export class TidPage {

  formData:any;

  constructor(private platform: Platform, private viewCtrl: ViewController) {
    this.formData = {url:""};
    this.platform = platform;
  }

 isValidURL(str:string) {
   str = str.toLowerCase();
   var pattern = /(http|ftp|https|):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
   if(!pattern.test(str)) {
     console.log("Please enter a valid URL. Fallback to default URL");
     return false;
   } else {
     return true; 
   }
 }

  getURL() {
     var url = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
     var enteredURL = this.formData.url.toLowerCase();
     if (enteredURL && this.isValidURL(enteredURL)) {
       url = enteredURL;
     }
     return url;
  }

  openURL(url:string, readerMode:boolean) {
    window.SafariViewController.isAvailable(function (available: boolean) {
      if (available) {
        window.SafariViewController.show({
              url: url,
              hidden: false, // default false. You can use this to load cookies etc in the background (see issue #1 for details).
              animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
              transition: 'slide', // (this only works in iOS 9.1/9.2 and lower) unless animated is false you can choose from: curl, flip, fade, slide (default)
              enterReaderModeIfAvailable: readerMode, // default false
              tintColor: "#000000", // default is ios blue
              barColor: "#0000ff", // on iOS 10+ you can change the background color as well
              controlTintColor: "#ffffff" // on iOS 10+ you can override the default tintColor
            },
            // this success handler will be invoked for the lifecycle events 'opened', 'loaded' and 'closed'
            function(result:any) {
              if (result.event === 'opened') {
                console.log('opened');
              } else if (result.event === 'loaded') {
                console.log('loaded');
              } else if (result.event === 'closed') {
                console.log('closed');
              }
            },
            function(msg:string) {
              console.log("KO: " + msg);
            })
      } else {
        // potentially powered by InAppBrowser because that (currently) clobbers window.open
        window.open(url, '_blank', 'location=yes');
      }
    })
  }

  createButton(title:string,className:string,onClick:any) {
      var item = document.createElement("ion-item");
      var btn = document.createElement("BUTTON");
      if (className) {btn.className = className;}
      var txtNode = document.createTextNode(title);
      btn.appendChild(txtNode);
      btn.addEventListener('click',onClick,false);
      item.appendChild(btn);
      document.getElementById("tidContent").appendChild(item);
  }

  ionViewWillEnter() {
    if (this.platform.is('android')) {
      var checkboxToRemove = document.getElementById("linkTrackingCheckbox");
      document.getElementById("tidContent").removeChild(checkboxToRemove);
    }
  }

  ionViewDidEnter() {

    var self = this;
    this.createButton("Handle URL","button icon icon-left button-assertive", function() {
        self.handleURL();
    });
    this.createButton("Get URL with tid","button icon icon-left button-assertive", function() {
        self.getURLWithOneTidAndRunBlock( function (url:string) {
        // An alert is used for debug purposes, this should not be used in production builds. 
        // Use console.log to log success or error callbacks.
        alert(url);});
    });
    this.createButton("Send outbound link interaction","button icon icon-left button-assertive", function() {
        self.sendOutboundLinkInteraction();
    });

    this.createButton("Identity Sync","button icon icon-left button-assertive", function() {
        var url = self.getURL();
        window.One.identitySync(null, function() {
          console.log("The identity sync has been scheduled.");
        });
    });

    this.createButton("Identity Sync With URL","button icon icon-left button-assertive", function() {
        var url =  self.getURL();
        window.One.identitySync(url, function() {
          console.log("The identity sync with " + url + "has been scheduled.");
        });
    });

    this.createButton("Whitelist link","button icon icon-left button-assertive", function() {
        const link = self.getURL();
        window.One.whitelistIdentityTransferLinks([link]);
        console.log(link + ' has been whitelisted');
    });

    this.createButton("Blacklist link","button icon icon-left button-assertive", function() {
        const link = self.getURL();
        window.One.blacklistIdentityTransferLinks([link]);
        console.log(link + ' has been blacklisted');
    });

    if (this.platform.is('ios')) {
      this.createButton("Open link in SafariVC","button icon icon-left button-assertive", function() {
          self.openURL(self.getURL(), false);
      });
      this.createButton("Open link in SafariVC in reader mode","button icon icon-left button-energized", function() {
          self.openURL(self.getURL(), true);
      });
      this.createButton("Open link in Safari","button icon icon-left button-balanced", function() {
          window.open(self.getURL(), '_system', 'location=yes');
      });
      this.createButton("Open link in WebView","button icon icon-left button-assertive", function() {
          window.open(self.getURL(), '_blank', 'location=yes');
      });
      this.createButton("Get push token","button icon icon-left button-assertive", function() {
          window.One.getPushToken(function(token:string) {
            console.log(token);
            alert(token);
          });
      });
      this.createButton("Send push token","button icon icon-left button-assertive", function() {
          window.One.getPushToken(function(token:string) {
            console.log(token);
            window.One.sendPushToken(token, function() {
              console.log("The push token " + token + " is sent");
            }, function(error:string) {
              console.log("An error occurred when sending the push token: " + error);
            });
          });
      });
    } else if (this.platform.is('android')) {
      this.createButton("Open link in system browser","button icon icon-left button-balanced", function() {
          window.open(self.getURL(), '_system', 'location=yes');
      });
      this.createButton("Open link in Chrome Custom Tabs","button icon icon-left button-assertive", function() {
          self.openURL(self.getURL(), false);
      });
      this.createButton("Get push token","button icon icon-left button-assertive", function() {
          window.One.getPushToken(function(token:string) {
            console.log(token);
            alert(token);
          });
      });
      this.createButton("Send push token","button icon icon-left button-assertive", function() {
        var token = "d3453773d5d04eaa807c2fb66198d447"
         window.One.sendPushToken(token, function() {
              console.log("The push token " + token + " is sent");
            }, function(error:string) {
              console.log("An error occurred when sending the push token: " + error);
            });
      });
    }
  }

  disableIdentityTransfer() {
    console.log("Disable identity transfer " + this.formData.disableIdentityTransfer);
    window.One.disableIdentityTransfer(this.formData.disableIdentityTransfer);
  }

  disableAutomaticOutboundLinkTracking() {
    console.log("Disable automatic outbound link " + this.formData.disableAutomaticOutboundLinkTracking);
    window.One.disableAutomaticOutboundLinkTracking(this.formData.disableAutomaticOutboundLinkTracking);
  }

  getURLWithOneTidAndRunBlock(block: (url:string) => void) {
    var onGetURLWithOneTidSuccess = function(urlWithOneTid:string) {
      if (block) {
        block(urlWithOneTid);
      }
    };
    var onGetURLWithOneTidFailure = function(error:string) {
      // An alert is used for debug purposes, this should not be used in production builds. 
      // Use console.log to log success or error callbacks.
      alert(error);
    };
    window.One.getURLWithOneTid(this.getURL(),onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
  }

  sendOutboundLinkInteraction() {
  	window.One.sendInteractionForOutboundLink(this.getURL());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  handleURL() {
    var url = this.getURL();
    var onHandleURLSuccess = function() {
        console.log("Success in handling URL!");
    };
    var onHandleURLError = function(error:string) {
        // An alert is used for debug purposes, this should not be used in production builds. 
        // Use console.log to log success or error callbacks.
        alert(error);
    };
    window.One.handleURL(url, onHandleURLSuccess, onHandleURLError);
  }

  doneEnteringURL() {
    window.cordova.plugins.Keyboard.close();
  }

}
