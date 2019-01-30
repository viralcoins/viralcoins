import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { CacheService } from '../../services/cache.service';
import { SegmentedBar, SegmentedBarItem } from "tns-core-modules/ui/segmented-bar";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { OfferPanelComponent } from '../offer-panel/offer-panel.component';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";

@Component({
  selector: 'ns-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  moduleId: module.id,
})
export class OffersComponent implements OnInit {
  @ViewChild('myActivityListView') myActivityListView;

  private _offerItems: ObservableArray<any>;
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
    this._offerItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;
    this.loadOffers();
  }

  get offerItems(): ObservableArray<any> {
    return this._offerItems;
  } 

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type;
  }  

  public loadOffers() {
    this.coinService.getOffers().subscribe(offers => {
      this._offerItems.splice(0);
      if (offers.length > 0) {
        for (let offer of offers) {
          this._offerItems.push(offer);
        }              
      } else {
        this._offerItems.push({type: 'empty'});
      }
      this.myActivityListView.listView.notifyPullToRefreshFinished();
    });
  }

  public onPullToRefreshMyActivityInitiated($event) {
    const _this = this;
    setTimeout(function () {
      _this.coinService.reloadOffers = true;
      _this.loadOffers();
    }, 1000);    
  }

  onReceivedOfferTap(offer) {
    const _this = this;
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        id: offer.id
      },
      fullscreen: true
    };

    this.modal.showModal(OfferPanelComponent, options)
      .then((result) => {
        if (result.action) {
          this.updateOffer(result.value);
        }
      });    
  }  

  public updateOffer(offer) {
    for (var i = 0; i < this._offerItems.length; i++) {
      if (this._offerItems.getItem(i).id == offer.id) {
        this._offerItems.setItem(i, offer);
      }
    }
    this.onUpdated(this._offerItems.slice(0, this._offerItems.length));
  }   

  onUpdated(offers): void {
    this.cacheService.store("offers", offers);
  }   
}
