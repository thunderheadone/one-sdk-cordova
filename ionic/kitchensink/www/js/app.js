angular.module('ionicApp', ['ionic'])

.run(['$ionicPlatform', 'ONE_PARAMETERS', (ionic, ONE_PARAMETERS) => { 
    ionic.ready(function() {
      if (One) {
        One.init({
                  siteKey: ONE_PARAMETERS.siteKey,
                  touchpointURI: ONE_PARAMETERS.touchpointURI,
                  apiKey: ONE_PARAMETERS.apiKey,
                  sharedSecret: ONE_PARAMETERS.sharedSecret,
                  userId: ONE_PARAMETERS.userId,
                  adminMode: ONE_PARAMETERS.adminMode,
                  hostName: ONE_PARAMETERS.hostName
                });
        One.sendInteraction("/MyInteraction", null);

        // FCM
        One.enablePushNotifications(true);

        // GCM
        //One.enablePushNotifications(true,"776599322097");
      }
  });
}])


.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "tabs.html"
        }
      }
    })
    .state('menu.tabs.buttons', {
      url: "/buttons",
      views: {
        'buttons-tab': {
          templateUrl: "buttons.html",
          controller: 'ButtonsTabCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "list.html",
          controller: 'ListCtrl'
        }
      }
    })
    .state('menu.tabs.tid', {
      url: "/tid",
      views: {
        'tid-tab': {
          templateUrl: "tid.html",
          controller: 'TidCtrl'
        }
      }
    })
    .state('menu.tabs.item', {
      url: "/item",
      views: {
        'list-tab': {
          templateUrl: "item.html",
          controller: 'ItemCtrl'
        }
      }
    })
    .state('menu.tabs.form', {
      url: "/form",
      views: {
        'form-tab': {
          templateUrl: "form.html",
          controller: 'FormCtrl'
        }
      }
    })
    .state('menu.keyboard', {
      url: "/keyboard",
      views: {
        'menuContent': {
          templateUrl: "keyboard.html"
        }
      }
    })
    .state('menu.slidebox', {
      url: "/slidebox",
      views: {
        'menuContent': {
          templateUrl: "slidebox.html",
          controller: 'SlideboxCtrl'
        }
      }
    })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "about.html",
          controller: 'AboutCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/buttons");

})


.controller('AboutCtrl', function ($scope) {
  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
      return;
    One.sendInteraction("/AboutCtrl",{AboutCtrlKey:"AboutCtrlValue"});
  });
})

.controller('TidCtrl', function ($scope, $ionicPlatform) {
  
  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
      return;
    One.sendInteraction("/TidCtrl",{AboutCtrlKey:"TidCtrlValue"});
  });

  $scope.$on('$ionicView.beforeEnter', function() {
    if (!ionic.Platform.isIOS()) {
      var checkboxToRemove = document.getElementById("LinkTrackingCheckbox");
      if (checkboxToRemove) {
        checkboxToRemove.parentNode.removeChild(checkboxToRemove);
      }
    }
  })

  $scope.formData = {url:""};

  $scope.doneEnteringURL = function() {
    cordova.plugins.Keyboard.close();
  }

  $scope.handleURL = function() {
    var url = this.getURL();

    var onHandleURLSuccess = function() {
        console.log("Success in handling URL!");
    };
    var onHandleURLError = function(error) {
        // An alert is used for debug purposes, this should not be used in production builds. 
        // Use console.log to log success or error callbacks.
        alert(error);
    };
    One.handleURL(url, onHandleURLSuccess, onHandleURLError);
  }

  $scope.disableIdentityTransfer = function(disable) {
    One.disableIdentityTransfer(disable);
  }

  $scope.disableAutomaticOutboundLinkTracking = function(disableAutomaticOutboundLinkTracking) {
    One.disableAutomaticOutboundLinkTracking(disableAutomaticOutboundLinkTracking);
  }

  $scope.getURL = function() {
    validURL = function(str) {
      var pattern = /(http|ftp|https|):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
      if(!pattern.test(str)) {
        console.log("Please enter a valid URL. Fallback to default URL");
        return false;
      } else {
        return true; 
      }
    }

    var targetURL = "https://en.m.wikipedia.org/wiki/Safari?key=value&key2=value2";
    var enteredURL = $scope.formData.url;
    enteredURL = enteredURL.toLowerCase();
    if (enteredURL && validURL(enteredURL)) {
      targetURL = enteredURL;
    }

    return targetURL;
  }

  $scope.getURLWithOneTidAndRunBlock = function(block) {
    var onGetURLWithOneTidSuccess = function(urlWithOneTid) {
      if (block) {
        block(urlWithOneTid);
      }
    };
    var onGetURLWithOneTidFailure = function(error) {
      // An alert is used for debug purposes, this should not be used in production builds. 
      // Use console.log to log success or error callbacks.
      alert(error);
    };
    One.getURLWithOneTid(this.getURL(),onGetURLWithOneTidSuccess, onGetURLWithOneTidFailure);
  }

  $scope.getURLWithOneTid = function() {
    $scope.getURLWithOneTidAndRunBlock(function(url) {
      // An alert is used for debug purposes, this should not be used in production builds. 
      // Use console.log to log success or error callbacks.
      alert(url);});
  }

  $ionicPlatform.ready(function() {
      
      function openUrl(url, readerMode) {
        SafariViewController.isAvailable(function (available) {
          if (available) {
            SafariViewController.show({
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
                function(result) {
                  if (result.event === 'opened') {
                    console.log('opened');
                  } else if (result.event === 'loaded') {
                    console.log('loaded');
                  } else if (result.event === 'closed') {
                    console.log('closed');
                  }
                },
                function(msg) {
                  console.log("KO: " + msg);
                })
          } else {
            // potentially powered by InAppBrowser because that (currently) clobbers window.open
            window.open(url, '_blank', 'location=yes');
          }
        })
      }

      var createButton = function(title,className,onClick) {
        var btn = document.createElement("BUTTON");
        if (className) {btn.className = className;}
        var txtNode = document.createTextNode(title);
        btn.appendChild(txtNode);
        btn.addEventListener('click',onClick,false);
        document.getElementById("TidContent").appendChild(btn);
      }

      createButton("Send interaction for outbound link","button icon icon-left button-assertive", function() {
        One.sendInteractionForOutboundLink($scope.getURL());
      });

      createButton("Identity Sync","button icon icon-left button-assertive", function() {
        var url = $scope.getURL();
        One.identitySync(null, function() {
          console.log("The identity sync has been scheduled.");
        });
      });

      createButton("Identity Sync with URL","button icon icon-left button-assertive", function() {
        var url = $scope.getURL();
        One.identitySync(url, function() {
          console.log("The identity sync with " + url + "has been scheduled.");
        });
      });

      createButton("Whitelist link","button icon icon-left button-assertive", function() {
        const link = $scope.getURL();
        One.whitelistIdentityTransferLinks([link]);
        console.log(link + ' has been whitelisted');
      });

      createButton("Blacklist link","button icon icon-left button-assertive", function() {
        const link = $scope.getURL();
        One.blacklistIdentityTransferLinks([link]);
        console.log(link + ' has been blacklisted');
      });

      if (ionic.Platform.isIOS()) {
        createButton("Open link in SafariVC","button icon icon-left button-assertive", function() {
            openUrl($scope.getURL(), false);
        });
        createButton("Open link in SafariVC in reader mode","button icon icon-left button-energized", function() {
            openUrl($scope.getURL(), true);
        });
        createButton("Open link in Safari","button icon icon-left button-balanced", function() {
            window.open($scope.getURL(), '_system', 'location=yes');
        });
        createButton("Open link in WebView","button icon icon-left button-assertive", function() {
            window.open($scope.getURL(), '_blank', 'location=yes');
        });
        createButton("Get push token","button icon icon-left button-balanced", function() {
          One.getPushToken(function(token) {
            console.log(token);
            alert(token);
          });
        });
        createButton("Send push token","button icon icon-left button-balanced", function() {
          One.getPushToken(function(token) {
            console.log(token);
            One.sendPushToken(token, function() {
              console.log("The push token " + token + " is sent");
            }, function(error) {
              console.log("An error occurred when sending the push token: " + error);
            });
          });
        });
      } else if (ionic.Platform.isAndroid()) {
        createButton("Open link in system browser","button icon icon-left button-balanced", function() {
          window.open($scope.getURL(), '_system', 'location=yes');
        });
        createButton("Open link in Chrome Custom Tabs","button icon icon-left button-assertive", function() {
          openUrl($scope.getURL(), false);
        });
        createButton("Get push token","button icon icon-left button-assertive", function() {
              One.getPushToken(function (token) {
                  console.log(token);
                  alert(token);
              });
        });

        createButton("Send push token","button icon icon-left button-assertive", function() {
              var token = "d3453773d5d04eaa807c2fb66198d447"
              One.sendPushToken(token, function() {
                  console.log("The push token" + token +  " is sent.");
              }, function(error) {
                  console.log("An error occurred when sending the push token: " + error);
              });
        });
      }

   });
})

.controller('ListCtrl', function ($scope) {

  $scope.data = {
    showDelete: false
  };

  $scope.itemButtons = [
    {
      text: 'Delete',
      type: 'button-assertive',
      onTap: function (item) {
        alert('Delete Item: ' + item.id + ' ?');
      }
    }
  ];

  $scope.onItemDelete = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    }
  ];

  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
      return;
    One.sendInteraction("/ListCtrl",{ListCtrlKey:"ListCtrlValue"});
  });

})

.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal, $ionicPlatform) {
    
    var interactionPath = "/ButtonsTabCtrl";
    var properties = {ButtonsTabCtrlKey:"ButtonsTabCtrlValue"};

    $scope.$on('$ionicView.afterEnter', function(e) {
      if(e.targetScope !== $scope)
        return;
      One.sendInteraction(interactionPath,properties);
    }); 

    $scope.showInteractionResponse = function() {
      var onSuccess = function(response) {
        // An alert is used for debug purposes, this should not be used in production builds. 
        // Use console.log to log success or error callbacks.
        alert(JSON.stringify(response));
      }
      var onFailure = function(error) {
        // An alert is used for debug purposes, this should not be used in production builds. 
        // Use console.log to log success or error callbacks.
        alert(error);
      }
      One.sendInteraction(interactionPath,properties,onSuccess,onFailure);
    }

    $scope.showPopup = function () {
     var myPopup = $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });

    myPopup.then(function(res) {
      console.log('Tapped!', res);
      One.sendProperties(interactionPath,{popupOKButton:''});
    });

    };

    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            }
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index, button) {
            One.sendProperties(interactionPath, {buttonClicked:button.text});
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };

    $scope.outlinedButtonClick = function() {
      One.sendProperties(interactionPath,{outlinedButton:""});
    }
})

.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
  
  var interactionPath = '/SlideboxCtrl';

  $scope.onSlideChanged = function() {
    One.sendInteraction(interactionPath, {currentSlideIndex:$ionicSlideBoxDelegate.currentIndex()});
  }

  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
        return;
    One.sendInteraction(interactionPath,{SlideboxCtrlKey:"SlideboxCtrlValue"});
  });   

})              

.controller('ItemCtrl', function($scope) {
  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
        return;
    One.sendInteraction("/ItemCtrl",{ItemCtrlKey:"ItemCtrlValue"});
  });   
}) 

.controller('FormCtrl', function($scope) {
  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
        return;
    One.sendInteraction("/FormCtrl",{FormCtrlKey:"FormCtrlValue"});
  });   
}) 

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {
  
  // $scope.recipient = "";
  // $scope.message = "";

   $ionicModal.fromTemplateUrl('modal.html', {
      scope: $scope,
      animation: 'slide-in-up',
   }).then(function(modal) {
      $scope.modal = modal;
   });

  $scope.$on('modal.shown', function() {
    // Execute action
    One.sendInteraction("/MenuCtrl",{MenuCtrlKey:"MenuCtrlValue"});
  });

  $scope.send = function() {
    var recipient = $scope.send.recipient;
    var message = $scope.send.message;
    
    if (recipient && message) {
      One.sendProperties("/MenuCtrl",{"recipient":recipient,"message":message});
    }

  }
})
  
.controller('AppCtrl', function($scope) {
  $scope.$on('$ionicView.afterEnter', function(e) {
    if(e.targetScope !== $scope)
        return;
    One.sendInteraction("/AppCtrl",{AppCtrlKey:"AppCtrlValue"});
  });
});




              
              