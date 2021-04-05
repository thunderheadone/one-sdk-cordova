var exec = require('cordova/exec');

module.exports = {

    init: function (params, successCallback, errorCallback) {
        exec(successCallback, errorCallback, "One", "initializeOne", [
            params.siteKey,
            params.touchpointURI,
            params.apiKey,
            params.sharedSecret,
            params.userId,
            params.adminMode,
            params.hostName
        ]);
    },

	sendInteraction : function(interactionPath, properties, successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "sendInteraction", [interactionPath, properties]);
	},

	sendProperties : function(interactionPath, properties, successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "sendProperties", [interactionPath, properties]);
	},

	sendResponseCode : function(responseCode, interactionPath, successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "sendResponseCode", [responseCode, interactionPath]);
	},

	sendBaseTouchpointProperties : function(properties, successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "sendBaseTouchpointProperties", [properties]);
	},

	getTid : function(successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "getTid", []);
	},

	clearUserProfile : function(successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "clearUserProfile", []);
	},

	sendInteractionForOutboundLink : function(url, successCallback, errorCallback) {
	    exec(successCallback, errorCallback, "One", "sendInteractionForOutboundLink", [url]);
	},

	getURLWithOneTid : function(url, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "getURLWithOneTid",[url])
	},

	disableIdentityTransfer : function(disable, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "disableIdentityTransfer", [disable]);
	},

	disableAutomaticOutboundLinkTracking : function(disable, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "disableAutomaticOutboundLinkTracking", [disable]);
	},

	handleURL : function(url, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "handleURL", [url]);
	},

	whitelistIdentityTransferLinks : function(links, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "whitelistIdentityTransferLinks", links);
	},

	blacklistIdentityTransferLinks : function(links, successCallback, errorCallback) {
		exec(successCallback, errorCallback, "One", "blacklistIdentityTransferLinks", links);
	}

};
