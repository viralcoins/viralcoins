import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../shared/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'api/';

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    var user = null;
    try {
      user = JSON.parse(localStorage.getItem('currentUser'));
    } catch (e) {
      console.log(e);
    }
      this.currentUserSubject = new BehaviorSubject<any>(user);
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  getUser() {
    return this.http.get<User>(this.baseUrl + 'user', this.getHeaders())
      .pipe(map(user => {
        if (user) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  updateUser(user) {
    return this.http.post<any>(this.baseUrl + 'user', user, this.getHeaders())
      .pipe(map(user => {
        return user;
      }));
  }

  usernameIsAvailable(username) {
    return this.http.get<any>(this.baseUrl + 'user/' + username)
      .pipe(map(data => {
        return data.isAvailable;
      }));
  }

  login(username, password) {
    return this.http.post<any>(this.baseUrl + "user/auth", {username:username, password:password})
      .pipe(map(data => {
        if (data) {
          console.log(data);
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('token', data.token);
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            this.currentUserSubject.next(data.user);
        }
        return data.user;
      }));
  }

  logout() {
      // remove user from local storage to log user out
      this.http.get("/api/user/logout").subscribe();
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }

  signup(username, email, password, token) {
    return this.http.post<User>(this.baseUrl + 'user/signup', {username: username, email: email, password: password, token: token})
      .pipe(map(user => {
        return user;
      }));
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }
}
