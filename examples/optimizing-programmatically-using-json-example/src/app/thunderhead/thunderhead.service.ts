import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LoggerService } from './../logger.service';

export interface OneWindow extends Window {
  One: any
}

export type OneConfiguration = {
  siteKey: string,
  apiKey: string,
  sharedSecret: string,
  userId: string,
  hostName: string,
  touchpointURI: string
}

@Injectable({
  providedIn: 'root'
})
export class ThunderheadService {
  private one: Promise<any>

  constructor(
    window: Window,
    platform: Platform,
    private readonly logger: LoggerService
  ) {
    this.one = platform
      .ready()
      .then(() => {
        var maybe = (<OneWindow>window).One
        if (maybe) {
          return maybe;
        } else {
          return Promise.reject("Could not find Thunderhead One. Is the plugin installed?")
        }
      })
  }

  configure(config: OneConfiguration): Promise<boolean> {
    return this.one
      .then((maybeOne) => {
        try {
          maybeOne.init({
            siteKey: config.siteKey,
            apiKey: config.apiKey,
            sharedSecret: config.sharedSecret,
            userId: config.userId,
            hostName: config.hostName,
            touchpointURI: config.touchpointURI,
            adminMode: false
          })
          return true
        } catch (error) {
          return Promise.reject(error)
        }
      });
  }

  sendInteraction(path: string, properties?: Map<String, String> | null): Promise<any> {
    return this.one
      .then((maybeOne) => {
        return new Promise((resolve, reject) => {
          try {
            maybeOne.sendInteraction(
              path,
              properties,
              (response: any) => { resolve(response) },
              (error: any) => { reject(error) }
            )
          } catch (error) {
            reject(error)
          }
        })
      });
  }

  sendInteractionReponseCode(path: string, code: string): Promise<boolean> {
    return this.one
      .then((maybeOne) => {
        return new Promise((resolve, reject) => {
          try {
            maybeOne.sendResponseCode(
              code,
              path,
              () => { resolve(true) },
              (error: any) => { reject(error) }
            )
          } catch (error) {
            reject(error)
          }
        })
      })
  }

  enableLogging(enable: boolean) {
    this.one
      .then((maybeOne) => {
        var logLevel = 0
        if (enable) { logLevel = 1 }
        maybeOne.setLogLevel(
          logLevel,
          () => { this.logger.log("Set ONE logging: ", enable, logLevel) },
          (error: any) => { this.logger.error("Could not set ONE logging:", error) }
        )
      })
      .catch((error) => {
        this.logger.error("Could not set ONE logging:", error)
      })
  }

  opt(out: boolean) {
    this.one
      .then((maybeOne) => {
        maybeOne.opt(
          out,
          null,
          () => { this.logger.log("Updated ONE opt out: ", out) },
          (error: any) => { this.logger.error("Could not update ONE opt out:", error) }
        )

      })
      .catch((error: any) => {
        this.logger.error("Could not update ONE opt out:", error)
      })
  }
}

