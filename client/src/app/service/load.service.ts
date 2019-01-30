import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  constructor() { }

  public loadScript(src) {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
      if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
        isFound = true;
      }
    }

    if (!isFound) {
      let node = document.createElement('script');
      node.src = src;
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  public handleRecaptcha(action): Observable<any> {
    return from(new Promise((resolve, reject) => {
      // @ts-ignore
      grecaptcha.ready(function() {
        // @ts-ignore
        grecaptcha.execute('6Lcw2YMUAAAAAOrlPBCnFXo-awDwcOWwJEGHBXef', {action: action})
          .then(function(token) {
              resolve(token);
            }, err => {
              reject(err);
            });
      });
    }));
  }
}
