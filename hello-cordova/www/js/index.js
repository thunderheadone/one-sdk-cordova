/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

requirejs(["js/config/one.js"], function(ONE_PARAMETERS) {

var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');

        var onSuccess = function () {
            console.log("Success!");
        }

        var onError = function (error) {
            console.log("Error: " + error);
        }

        var buttonGetTid = document.getElementById("btnGetTid");
        var buttonClearTid = document.getElementById("btnClearTid");
        var handleURL = document.getElementById("handleURL");
        var buttonSendInteraction = document.getElementById("btnSendInteraction");

        //Show current tid in allert dialogArguments
        buttonGetTid.addEventListener('click', function () {
            var onTidSuccess = function (tid) {
                // An alert is used for debug purposes, this should not be used in production builds. 
                // Use console.log to log success or error callbacks.
                alert(tid);
            };
            One.getTid(onTidSuccess);
        }, false);

        //Clear user profile (clear tid)
        buttonClearTid.addEventListener('click', function () {
            var onClearUserProfileSuccess = function () {
                // An alert is used for debug purposes, this should not be used in production builds. 
                // Use console.log to log success or error callbacks.
                alert("The tid has been removed.");
            };
            var onClearUserProfileFailure = function () {
                console.log("The SDK failed to clear the tid.");
            };
            One.clearUserProfile(onClearUserProfileSuccess, onClearUserProfileFailure);
        }, false);

        // Handle URL
        var baseUrl = "https://en.m.wikipedia.org";
        var url = baseUrl + "/wiki/Safari?key=value&key2=value2";

        handleURL.addEventListener('click', function () {
            var onHandleURLSuccess = function () {
                console.log("Success in handling URL!");
            };
            var onHandleURLError = function (error) {
                // An alert is used for debug purposes, this should not be used in production builds. 
                // Use console.log to log success or error callbacks.
                alert(error);
            };
            One.handleURL(url, onHandleURLSuccess, onHandleURLError);
        }, false);


        buttonSendInteraction.addEventListener('click', function () {
            One.sendInteraction("/InteractionFromCordova3", null, onSuccess, onError);
        }, false);

        One.init({
            siteKey: ONE_PARAMETERS.siteKey,
            touchpointURI: ONE_PARAMETERS.touchpointURI,
            apiKey: ONE_PARAMETERS.apiKey,
            sharedSecret: ONE_PARAMETERS.sharedSecret,
            userId: ONE_PARAMETERS.userId,
            adminMode: ONE_PARAMETERS.adminMode,
            hostName: ONE_PARAMETERS.hostName
        },
            onSuccess,
            onError
        );

        // FCM
        One.enablePushNotifications(true);
        // GCM
        //One.enablePushNotifications(true,"776599322097");

        // Send interaction
        One.sendInteraction("/InteractionFromCordova1", null, onSuccess, onError);

        // Send interaction with properties
        One.sendInteraction("/InteractionFromCordova1", {
            key: "value"
        }, onSuccess, onError);
        One.sendInteraction("/InteractionFromCordova2", {
            key: "value"
        }, onSuccess, onError);

        // Send properties for an interaction
        One.sendProperties("/InteractionFromCordova1", {
            propertyKey: "propertyValue"
        });

        // Send base touchpoint properties
        One.sendBaseTouchpointProperties({
            baseTouchpointKey: "baseTouchpointValue"
        });
        One.sendBaseTouchpointProperties({
            baseTouchpointKey: "baseTouchpointValueNew"
        });

        // Send one-click interaction for a provided link
        One.sendInteractionForOutboundLink("http://example.com/path1/path2?key=value", null,
            function (error) {
                // An alert is used for debug purposes, this should not be used in production builds. 
                // Use console.log to log success or error callbacks.
                alert(error)
            }
        );

        // Get response from an interaction
        var buttonSendInteractionAndShowResponse = document.getElementById("btnSendInteractionAndShowResponse");
        buttonSendInteractionAndShowResponse.addEventListener('click', function () {
            var textboxId = "textboxId";

            function addTextBox(text) {
                var textbox = document.createElement("textarea");
                textbox.setAttribute('id', textboxId);
                textbox.setAttribute('readonly', '');
                textbox.setAttribute('rows', '8');
                document.getElementById("app").appendChild(textbox);
                var textNode = document.createTextNode(text);
                textbox.appendChild(textNode);
            };
            var removeTextBox = function (argument) {
                var textbox = document.getElementById(textboxId);
                if (textbox) {
                    document.getElementById("app").removeChild(textbox);
                }
            }
            var onResponseRetrievalSuccess = function (response) {
                var json = JSON.stringify(response);
                console.log(json);
                removeTextBox();
                addTextBox(json);
            };
            var onResponseRetrievalFailure = function (error) {
                console.log("Error occurred when getting interaction response: " + error);
                removeTextBox();
                addTextBox(error);
            };

            One.sendInteraction("/InteractionFromCordova3", null, onResponseRetrievalSuccess, onResponseRetrievalFailure);
        }, false);

        var createNewCheckbox = function (name, id, onChange) {

            var label = document.createElement("label");
            var description = document.createTextNode(name);

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = id;
            checkbox.addEventListener('change', onChange, false);

            label.appendChild(checkbox);
            label.appendChild(description);
            document.getElementById("app").appendChild(label);

            return checkbox;
        }

        // Disable identity transfer toggle
        var disableIdentityTransferCheckbox = "disableIdentityTransferCheckbox";
        createNewCheckbox("Disable identity transfer", disableIdentityTransferCheckbox,
            function () {
                var checkbox = document.getElementById(disableIdentityTransferCheckbox);
                One.disableIdentityTransfer(checkbox.checked);
            });
        // Disable automatic outbound link tracking. iOS only.
        if (device.platform == 'iOS') {
            var disableAutomaticOutboundLinkTrackingCheckbox = "disableAutomaticOutboundLinkTrackingCheckbox";
            createNewCheckbox("Disable automatic outbound link tracking", disableAutomaticOutboundLinkTrackingCheckbox,
                function () {
                    var checkbox = document.getElementById(disableAutomaticOutboundLinkTrackingCheckbox);
                    One.disableAutomaticOutboundLinkTracking(checkbox.checked);
                });
        }

        var createButton = function (title, onClick) {
            var btn = document.createElement("BUTTON");
            var txtNode = document.createTextNode(title);
            btn.appendChild(txtNode);
            btn.addEventListener('click', onClick, false);
            document.getElementById("app").appendChild(btn);
        }

        var openUrl = function (url, readerMode) {

            SafariViewController.isAvailable(function (available) {
                if (available) {
                    SafariViewController.show({
                            url: url,
                            hidden: false, // default false
                            animated: true, // default true, note that 'hide' will reuse this preference (the 'Done' button will always animate though)
                            transition: 'slide', // unless animated is false you can choose from: curl, flip, fade, slide (default)
                            enterReaderModeIfAvailable: readerMode, // default false
                            barColor: "#0000ff", // default is white (iOS 10 only)
                            tintColor: "#0000ff" // default is ios blue
                        },
                        function (result) {
                            if (result.event === 'opened') {
                                console.log('opened');
                            } else if (result.event === 'loaded') {
                                console.log('loaded');
                            } else if (result.event === 'closed') {
                                console.log('closed');
                            }
                        },
                        function (msg) {
                            console.log("KO: " + JSON.stringify(msg));
                        })
                } else {
                    // potentially powered by InAppBrowser because that (currently) clobbers window.open
                    window.open(url /*, '_blank', 'location=yes'*/ );
                }
            });
        }

        if (device.platform == 'iOS') {

            createButton("Open link in SafariVC", function () {
                openUrl(url, false);
            });
            createButton("Open link in SafariVC in reader mode", function () {
                openUrl(url, true);
            });
            createButton("Open link in Safari", function () {
                cordova.InAppBrowser.open(url, "_system");
            });
            createButton("Open link in UIWebView", function () {
                cordova.InAppBrowser.open(url, "_blank");
            });
        }

        createButton("Open link in SafariVC", function () {
            openUrl(url, false);
        });
        createButton("Open link in SafariVC in reader mode", function () {
            openUrl(url, true);
        });
        createButton("Open link in Safari", function () {
            cordova.InAppBrowser.open(url, "_system");
        });
        createButton("Open link in UIWebView", function () {
            cordova.InAppBrowser.open(url, "_blank");
        });

        if (device.platform == 'iOS') {
            createButton("Get push token", function () {
                One.getPushToken(function (token) {
                    console.log(token);
                    alert(token);
                });
            });

            createButton("Send push token", function () {
                One.getPushToken(function (token) {
                    console.log(token);
                    One.sendPushToken(token, function () {
                        console.log("The push token" + token + " is sent.");
                    }, function (error) {
                        console.log("An error occurred when sending the push token: " + error);
                    });
                });
            });
        } else {
            //android 
            createButton("Get push token", function () {
                One.getPushToken(function (token) {
                    console.log(token);
                    alert(token);
                });
            });

            createButton("Send push token", function () {
                One.getPushToken(function (token) {
                    console.log(token);
                    One.sendPushToken(token, function () {
                        console.log("The push token" + token + " is sent.");
                    }, function (error) {
                        console.log("An error occurred when sending the push token: " + error);
                    });
                });
            });
        }

        createButton("Identity Sync", function () {
            One.identitySync(null, function () {
                console.log("The identity sync has been scheduled.");
            });
        });

        createButton("Identity Sync With URL", function () {
            One.identitySync(url, function () {
                console.log("The identity sync with " + url + "has been scheduled.");
            });
        });

        var whitelistLinkIdentifier = "Whitelist link";
        createNewCheckbox("Whitelist link", whitelistLinkIdentifier, function () {
            var checkbox = document.getElementById(whitelistLinkIdentifier);
            if (checkbox.checked) {
                if (!checkbox.disabled) {
                    checkbox.disabled = true;
                }
                // Open whitelisted link
                One.whitelistIdentityTransferLinks([baseUrl]);
                console.log(baseUrl + ' has been whitelisted');
            }
        });

        var blacklistLinkIdentifier = "Blacklist link";
        createNewCheckbox("Blacklist link", blacklistLinkIdentifier, function () {
            var checkbox = document.getElementById(blacklistLinkIdentifier);
            if (checkbox.checked) {
                if (!checkbox.disabled) {
                    checkbox.disabled = true;
                }
                // Open whitelisted link
                One.blacklistIdentityTransferLinks([baseUrl]);
                console.log(baseUrl + ' has been blacklisted');
            }
        });
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

app.initialize();

});