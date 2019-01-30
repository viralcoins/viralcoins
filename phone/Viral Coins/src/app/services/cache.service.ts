import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";

@Injectable()
export class CacheService {

  override = false;

  store(key: string, value: any): any {
    appSettings.setString(key, JSON.stringify(value));
  }

  load(key: string): any {
    let object = appSettings.getString(key);
    return object ? JSON.parse(object) : null;
  }

  handleCache(flag, key, refreshMethod) {
    console.log("******************************");
    const object = this.load(key);
    if (!object || flag || this.override) {
      console.log("* Loading " + key + " from server");
      console.log("* Because " + flag );
      console.log("******************************");
      flag = false;
      return refreshMethod().pipe(
        map(data => {
          this.store(key, data);
          return data;
        })
      );
    } else {
      console.log("* Loading " + key + " from cache");
      console.log("******************************");
      return of(object);
    }    
  }  
}
