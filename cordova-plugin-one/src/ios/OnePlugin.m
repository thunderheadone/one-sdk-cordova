/********* One.m Cordova Plugin Implementation *******/

#import "Thunderhead/One.h"
#import "OnePlugin.h"

// NSString * const kOneCordovaPluginVersion = @"1.4.0";

@implementation OnePlugin

- (void)initializeOne:(CDVInvokedUrlCommand*)command
{
    NSString *siteKey = [command.arguments objectAtIndex:0];
    NSString *touchpointURI = [command.arguments objectAtIndex:1];
    NSString *apikey = [command.arguments objectAtIndex:2];
    NSString *sharedSecret = [command.arguments objectAtIndex:3];
    NSString *userId = [command.arguments objectAtIndex:4];
    BOOL adminMode = [[command.arguments objectAtIndex:5] boolValue];
    NSString *hostName = [command.arguments objectAtIndex:6];
    
    [One startSessionWithSK:siteKey
                        uri:touchpointURI
                     apiKey:apikey
               sharedSecret:sharedSecret
                     userId:userId
                  adminMode:adminMode
                   hostName:hostName];
    
    [One disableAutomaticInteractionDetection:YES];
}

- (void)optOut:(CDVInvokedUrlCommand*)command
{
    BOOL optOut = [[command.arguments objectAtIndex:0] boolValue];
    NSArray *options = [command.arguments objectAtIndex:1];

    if (![options isKindOfClass:[NSNull class]] && [options isKindOfClass:[NSArray class]]) {
        if (options.count) {
            for (NSString *option in options) {
                NSString *lowercasedOpt = [option lowercaseString];
                if ([lowercasedOpt isEqualToString:[@"keychainTidStorage" lowercaseString]]) {
                    [One opt:optOut ? Out : In forOptions:KeychainTidStorage];
                } else if ([lowercasedOpt isEqualToString:[@"pasteboardTidStorage" lowercaseString]]) {
                    [One opt:optOut ? Out : In forOptions:PasteboardTidStorage];
                } else if ([lowercasedOpt isEqualToString:[@"cityCountryDetection" lowercaseString]]) {
                    [One opt:optOut ? Out : In forOptions:CityCountryDetection];
                } else if ([lowercasedOpt isEqualToString:[@"allTracking" lowercaseString]]) {
                    [One opt:optOut ? Out : In forOptions:AllTracking];
                }
            }
        } else {
            [One opt:optOut ? Out : In forOptions:AllTracking];
        }
    
    } else {
        [One opt:optOut ? Out : In forOptions:AllTracking];
    }
}

- (void)sendInteraction:(CDVInvokedUrlCommand*)command
{
    NSString *interactionPath = [command.arguments objectAtIndex:0];
    NSDictionary *properties = [command.arguments objectAtIndex:1];
    
    if (!interactionPath.length) {
        return;
    }
    
    if ([properties isKindOfClass:[NSDictionary class]] && properties.count) {
        [One sendInteraction:interactionPath withProperties:properties andBlock:^(NSDictionary *response, NSError *error) {
            if (error) {
                CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            } else {
                CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            }
        }];
    } else {
        [One sendInteraction:interactionPath withBlock:^(NSDictionary *response, NSError *error) {
            if (error) {
                CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:error.localizedDescription];
                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            } else {
                CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:response];
                [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
            }
        }];
    }
}

- (void)sendResponseCode:(CDVInvokedUrlCommand*)command
{
    NSString *responseCode = [command.arguments objectAtIndex:0];
    NSString *interactionPath = [command.arguments objectAtIndex:1];
    
    if (!responseCode.length) {
        return;
    }
    
    [One sendResponseCode:responseCode forInteractionPath:interactionPath];
}

- (void)sendProperties:(CDVInvokedUrlCommand*)command
{
    NSString *interactionPath = [command.arguments objectAtIndex:0];
    NSDictionary *properties = [command.arguments objectAtIndex:1];
    
    if (!interactionPath.length) {
        return;
    }
    
    if ([properties isKindOfClass:[NSDictionary class]] && properties.count) {
        [One sendProperties:properties forInteractionPath:interactionPath];
    }
}

- (void)sendBaseTouchpointProperties:(CDVInvokedUrlCommand*)command
{
    NSDictionary *properties = [command.arguments objectAtIndex:0];
    
    if ([properties isKindOfClass:[NSDictionary class]] && properties.count) {
        [One sendBaseTouchpointProperties:properties];
    }
}

- (void)getTid:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[One getTid]];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)clearUserProfile:(CDVInvokedUrlCommand*)command
{
    [One clearUserProfile];
    
    CDVPluginResult *result;
    if (![One getTid].length) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    } else {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }
    
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)disableIdentityTransfer:(CDVInvokedUrlCommand *)command
{
    NSNumber *disableIdentifyTransfer = [command.arguments objectAtIndex:0];
    CDVPluginResult *result;
    
    if (![disableIdentifyTransfer isKindOfClass:[NSNumber class]]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The SDK cannot get boolean from user input to enable/disable identity transfer"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    [One disableIdentityTransfer:[disableIdentifyTransfer boolValue]];
    
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)disableAutomaticOutboundLinkTracking:(CDVInvokedUrlCommand*)command
{
    NSNumber *disableAutomaticOutboundLinkTracking = [command.arguments objectAtIndex:0];
    CDVPluginResult *result;
    
    if (![disableAutomaticOutboundLinkTracking isKindOfClass:[NSNumber class]]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The SDK cannot get boolean from user input to enable/disable automatic outbound link tracking"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    [One disableAutomaticOutboundLinkTracking:[disableAutomaticOutboundLinkTracking boolValue]];
    
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)handleURL:(CDVInvokedUrlCommand*)command
{
    NSString *stringURL = [command.arguments objectAtIndex:0];
    CDVPluginResult *result;

    if (!stringURL || ![stringURL isKindOfClass:[NSString class]]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The passed string URL is not a NSString object or nil"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    NSURL *url = [NSURL URLWithString:stringURL];
    if (!url) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The passed string URL is not valid for creating NSURL object"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    [One handleURL:url];
    
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)sendInteractionForOutboundLink:(CDVInvokedUrlCommand*)command
{
    CDVPluginResult *result;
    
    NSString *stringURL = [command.arguments objectAtIndex:0];
    if (![stringURL isKindOfClass:[NSString class]] || ![NSURL URLWithString:stringURL]) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The SDK cannot send an interaction request for a provided URL string: it is either not a string or not valid for creating NSURL object"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }

    [One sendInteractionForOutboundLink:[NSURL URLWithString:stringURL]];

    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)getURLWithOneTid:(CDVInvokedUrlCommand*)command
{
    NSString *urlString = [command.arguments objectAtIndex:0];
    
    if (![urlString isKindOfClass:[NSString class]] || ![NSURL URLWithString:urlString]) {
        CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"A passed argument is not a string or valid URL string"];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    NSURL *url = [NSURL URLWithString:urlString];
    
    CDVPluginResult *result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[One getURLWithOneTid:url].absoluteString];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)whitelistIdentityTransferLinks:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *result;

    if (!command.arguments.count) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The SDK cannot whitelist any links as no links were provided."];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    [One whitelistIdentityTransferLinks:command.arguments];
    
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

- (void)blacklistIdentityTransferLinks:(CDVInvokedUrlCommand *)command
{
    CDVPluginResult *result;
    
    if (!command.arguments.count) {
        result = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:@"The SDK cannot blacklist any links as no links were provided."];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
        return;
    }
    
    [One blacklistIdentityTransferLinks:command.arguments];
    
    result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
}

@end
