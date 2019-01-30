import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Observable<any> {
    return from(new Promise((resolve, reject) => {
      if (window.navigator && window.navigator.geolocation) {
        console.log("Loading position...");
          window.navigator.geolocation.getCurrentPosition(
              position => {
                console.log("Position Loaded.")
                  resolve(position);
              },
              error => {
                  switch (error.code) {
                      case 1:
                          console.log('Permission Denied');
                          break;
                      case 2:
                          console.log('Position Unavailable');
                          break;
                      case 3:
                          console.log('Timeout');
                          break;
                  }
                  reject();
              }
          );
      };
    }));
  }
}
