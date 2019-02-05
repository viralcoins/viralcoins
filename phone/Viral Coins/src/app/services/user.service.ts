import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";

import { User } from "../models/user.model";
import { CacheService } from '../services/cache.service';
import { Config } from "../config";
import * as appSettings from "tns-core-modules/application-settings";
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public reloadAllUsers = false;
  public reloadUser = false;
  public refreshFeed = false;
  public reloadMessages = false;

  constructor(
    public http: Http,
    public cacheService: CacheService
  ) {
    super(http, cacheService);
    this.currentUserSubject = new BehaviorSubject<any>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  register(user: User) {
    return this.post(this.baseUrl + "/user/signup", {
        username: user.username,
        email: user.email,
        password: user.password
      });
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  getAllUsers() {
    return this.getCached(this.baseUrl + "/user/all", "allusers", this.reloadAllUsers)
      .pipe(
        tap(data => {
          this.reloadAllUsers = false;
        })
      );    
  }

  getUser() {
    return this.getCached(this.baseUrl + "/user", "user", this.reloadUser)
      .pipe(
        tap(data => {
          this.reloadUser = false;
        })
      );
  }

  login(user: User) {
    return this.post(
      this.baseUrl + "/user/auth",
      {
        username: user.username,
        password: user.password
      }).pipe(
        tap(data => {
          this.currentUserSubject.next(data.user);
          appSettings.setString("token", data.token);
          Config.token = data.token;
        })
    );
  }

  logout() {
    appSettings.clear();    
    this.currentUserSubject.next(null);
  }  

  update(user: any) {
    return this.post(
      this.baseUrl + "/user",
      {
        first: user.first,
        last: user.last,
        email: user.email
      }
    ).pipe(
      tap(data => {
        this.currentUserSubject.next(data);
      }),
      catchError(this.handleErrors)
    );
  }

  forgotPassword(email: string) {
    return this.post(this.baseUrl + "/password/forgot", {
        email: email
      });
  }

  feed() {
    return this.getCached(this.baseUrl + "/feed", "feed", this.refreshFeed)
      .pipe(
        tap(data => {
          this.refreshFeed = false;          
        })
      );   
  }

  deleteFeedItem(id) {
    return this.delete(this.baseUrl + "/feed/" + id);
  }

  addFeedItem(item) {
    return this.post(this.baseUrl + '/feed', item);
  }

  sendMessage(message) {
    return this.post(this.baseUrl + "/message", {
        content: message
      });
  }

  messages() {
    return this.getCached(this.baseUrl + "/messages", "messages", this.reloadMessages)
      .pipe(
        tap(data => {
          this.reloadMessages = false;          
        })
      );     
  }

  deleteMessage(messageId) {
    return this.delete(this.baseUrl + "/message/" + messageId);
  }  
}
