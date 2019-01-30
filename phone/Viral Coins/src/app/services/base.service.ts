import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";
import { Observable, of } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { Http, Headers, Response } from "@angular/http";
import { CacheService } from './cache.service';
import { Config } from '../config';

@Injectable()
export class BaseService {

  public baseUrl: string = Config.apiUrl;

	constructor(
		public http: Http,
    public cacheService: CacheService
		) {}

  public get(url: string) {
    return this.http.get(url, {
      headers: this.getCommonHeaders()
    }).pipe(
        map(res => { return res.json() })
      );
  }

  public post(url: string, data: any) {
    return this.http.post(url, data, {
      headers: this.getCommonHeaders()
    }).pipe(
        map(res => { 
          return res.json()
        })
      );    
  }  

  public put(url: string, data: any) {
    return this.http.put(url, data, {
      headers: this.getCommonHeaders()
    }).pipe(
        map(res => { 
          return res.json()
        })
      );    
  }

  public delete(url: string) {
    console.log("Delete: " + url);
    return this.http.delete(url, {
      headers: this.getCommonHeaders()
    }).pipe(
        map(res => { 
          return res.json()
        }),
        catchError(e => this.handleErrors(e))
      );    
  }    

  public getCached(url: string, key: string, flag: boolean) {
    return this.cacheService.handleCache(flag, key, () => {
      return this.get(url);
    });    
  }

  getCommonHeaders() {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", "Bearer " + Config.token);
    return headers;
  }

  handleErrors(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}