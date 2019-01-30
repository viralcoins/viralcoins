import { Injectable } from "@angular/core";
import { catchError, map, tap } from "rxjs/operators";
import { Observable, of } from 'rxjs';
import { Config } from '../config';
import * as appSettings from 'tns-core-modules/application-settings';
import { BaseService } from './base.service';
import { Http, Headers, Response } from "@angular/http";

@Injectable()
export class CoinService extends BaseService {
  baseUrl: string = Config.apiUrl;
  wallet: any = null;
  coins: [] = null;
  reloadCoins: boolean = false;
  reloadWallet: boolean = false;
  reloadAllCoins: boolean = false;
  reloadSaleCoins: boolean = false;
  reloadOffers: boolean = false;

  load(code) {
    return this.get(this.baseUrl + "/coin/" + code);
  }

  loadWallet() {
    return this.getCached(this.baseUrl + "/wallet", "wallet", this.reloadWallet)
      .pipe(
        tap(data => {
          this.reloadWallet = false;
        })
      );
  }

  find() {
    return this.getCached(this.baseUrl + "/coins/available", "coins", this.reloadCoins)
      .pipe(
        tap(data => {
          this.reloadCoins = false;
        })
      );
  }

  claim(code) {
    return this.post(this.baseUrl + "/coin/claim", { code: code });
  }

  all() {
    return this.getCached(this.baseUrl + "/coins/all", "allcoins", this.reloadAllCoins)
      .pipe(
        tap(data => {
          this.reloadAllCoins = false;
        })
      );
  }

  sale() {
    return this.getCached(this.baseUrl + "/coins/sale", "salecoins", this.reloadSaleCoins)
      .pipe(
        tap(data => {
          this.reloadSaleCoins = false;
        })
      );
  }  

  create(lat, long, code, description, prize, price) {
    return this.put(this.baseUrl + "/coin", {
      lat: lat, long: long, code: code, description: description, prize: prize, price: price
    });
  }

  activate(id) {
    return this.get(this.baseUrl + "/coin/" + id + "/activate");
  }

  sell(id) {
    return this.post(this.baseUrl + "/coin/sell", {id: id});
  }

  unlist(id) {
    return this.post(this.baseUrl + "/coin/unlist", {id: id});
  }  

  remove(id) {
    return this.delete(this.baseUrl + "/coin/" + id);
  }

  redeemPrize(coinId, first, last, address) {
    return this.post(this.baseUrl + "/prize/redeem", {
      first: first,
      last: last,
      coin: coinId,
      address: address
    });
  }

  coinDrop() {
    return this.post(this.baseUrl + "/coins/drop", {});
  }

  makeOffer(coinId, offer) {
    return this.put(this.baseUrl + "/coin/offer", {
      coinId: coinId,
      value: offer
    });
  }

  getOffer(offerId) {
    return this.get(this.baseUrl + "/coin/offer/" + offerId);
  }  

  getOffers() {
    return this.getCached(this.baseUrl + "/coin/offers", "offers", this.reloadOffers)
      .pipe(
        tap(data => {
          this.reloadOffers = false;
        })
      );
  }

  acceptOffer(offerId) {
    return this.post(this.baseUrl + "/coin/offer/" + offerId, {status: "accepted"});    
  }

  rejectOffer(offerId) {
    return this.post(this.baseUrl + "/coin/offer/" + offerId, {status: "rejected"});
  }
}
