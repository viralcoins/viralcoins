import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, pipe, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Coin } from '../shared/coin';
import { HttpHeaders } from '@angular/common/http';

export class Response<T> {
  entities: Array<T>;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = '/api/';

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'user', this.getHeaders()).pipe(
      tap(_ => this.log('fetched user')),
      catchError(this.handleError<any>('getUser'))
    );
  }

  getUsers() {
    return this.http.get(this.baseUrl + "user/all");
  }

  createWallet() {
    return this.http.put(this.baseUrl + 'wallet', {});
  }

  createCoin(lat, long, code) {
    let params = {
      "lat": lat,
      "long": long,
      "code": code
    }
    return this.http.put(this.baseUrl + 'coin', params, this.getHeaders());
  }

  activateCoin(id) {
    return this.http.get(this.baseUrl + 'coin/' + id + '/activate', this.getHeaders());
  }

  getCoins(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'coins/all', this.getHeaders()).pipe(
      tap(_ => this.log('fetched all coins')),
      catchError(this.handleError<any>('getCoins'))
    );
  }

  getAvailableCoins(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'coins/available').pipe(
      tap(_ => this.log('fetched all coins')),
      catchError(this.handleError<any>('getCoins'))
    );
  }

  getCoin(id): Observable<Coin> {
    return this.http.get<Coin>(this.baseUrl + 'coin/' + id).pipe(
      tap(_ => this.log('fetched coin id=${id}')),
      catchError(this.handleError<Coin>('getCoin id=${id}'))
    );
  }

  getPrize(coinId): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'prize/' + coinId).pipe(
      tap(_ => this.log('fetched prize for coin id=${coinId}')),
      catchError(this.handleError<any>('getPrize id=${coinId}'))
    );
  }

  updatePrize(prize): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'prize', prize, this.getHeaders()).pipe(
      tap(_ => this.log('fetched prize for coin id=${coinId}')),
      catchError(this.handleError<any>('getPrize id=${coinId}'))
    );
  }

  deleteCoin(code) {
    console.log("Delete: " + code);
    return this.http.delete(this.baseUrl + 'coin/' + code, this.getHeaders()).pipe(
      tap(_ => this.log('Delete coin ${code}')),
      catchError(this.handleError<any>('Delete coin ${code}'))
    );
  }

  updateCoin(coin): Observable<Coin> {
    return this.http.post<Coin>(this.baseUrl + 'coin', coin, this.getHeaders()).pipe(
      tap(_ => this.log('update coin id=${id}')),
      catchError(this.handleError<Coin>('updateCoin id=${id}'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`DataService: ${message}`);
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
  }

  getWallet(): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'wallet', this.getHeaders())
      .pipe(
        tap(_ => this.log('fetched wallet')),
        catchError(this.handleError<any>('getWallet'))
      );
  }

  claim(code) {
    return this.http.post<Coin>(this.baseUrl + 'coin/claim', {
      code: code
    }, this.getHeaders()).pipe(
        tap(_ => this.log('claimed coin')),
        catchError(this.handleError<Coin>('Claim Coin'))
      );
  }

  promote(code) {
    return this.http.post<Coin>(this.baseUrl + 'coin/promote', {
      code: code
    }, this.getHeaders()).pipe(
        tap(_ => this.log('promoted coin')),
        catchError(this.handleError<Coin>('Promote Coin'))
      );
  }

  forgot(username) {
    return this.http.post<any>(this.baseUrl + 'password/forgot', {
      username: username
    }).pipe(
      tap(_ => this.log('forgot password'))
    );
  }

  resetPassword(token, password) {
    return this.http.post<any>(this.baseUrl + 'password/reset', {
      token: token,
      password: password
    }).pipe(
      tap(_ => this.log('forgot password'))
    );
  }

  getImpression(code): Observable<Coin> {
    return this.http.get<Coin>(this.baseUrl + 'coin/impression/' + code)
      .pipe(
        tap(_ => this.log('get impression for ' + code)),
        catchError(this.handleError<Coin>('Get Impression'))
      );
  }
}
