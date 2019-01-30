import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { CacheService } from '../../services/cache.service';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { TradePanelComponent } from '../trade-panel/trade-panel.component';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { OfferPanelComponent } from '../offer-panel/offer-panel.component';
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from "@angular/router";
import { Page } from "ui/page";

@Component({
  selector: 'ns-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css'],
  moduleId: module.id,
})
export class TradeComponent implements OnInit {
  @ViewChild('mySaleListView') mySaleListView;

  private _coinItems: ObservableArray<any>;
  private _templateSelector: (item: any, index: number, items: any) => string;

  constructor(
    private coinService: CoinService,
    private cacheService: CacheService,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    private page: Page,
    private routerExtensions: RouterExtensions
  ) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
    this._coinItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;
    this.loadAvailable();
  }

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    if (item.price != null) {
      return 'sale';
    }
    return item.code != null ? 'coin' : 'empty';
  }

  get coinItems(): ObservableArray<any> {
    return this._coinItems;
  }

  public loadAvailable() {
    this.coinService.sale().subscribe(coins => {      
      this._coinItems.splice(0);
      if (coins.length > 0) {
        for (let coin of coins) {
          this._coinItems.push(coin);
        }        
      } else {
        this._coinItems.push({value: null});
      }
      this.mySaleListView.listView.notifyPullToRefreshFinished();
    });    
  }

  public onItemTap(coin) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        "coinId": coin.id,
        "price": coin.price
      }
    };    
    this.routerExtensions.navigate(['/payment'], navigationExtras);
    // const options: ModalDialogOptions = {
    //   viewContainerRef: this.vcRef,
    //   context: coin,
    //   fullscreen: true
    // };

    // this.modal.showModal(TradePanelComponent, options)
    //   .then((result: any) => {
    //   });
  }

  public onPullToRefreshSaleInitiated($event) {
    const _this = this;
    setTimeout(function () {
      _this.coinService.reloadSaleCoins = true;
      _this.loadAvailable();
    }, 1000);    
  } 
}
