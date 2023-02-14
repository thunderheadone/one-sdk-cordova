import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(msg: any, ...args: any[]) {
    if (console && console.log) {
      console.log(msg, ...args)
    }
  }

  error(msg: any, ...args: any[]) {
    if (console) {
      console.error(msg, ...args)
    }
  }
}
