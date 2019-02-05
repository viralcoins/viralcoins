import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { CacheService } from '../../services/cache.service';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { OfferPanelComponent } from '../offer-panel/offer-panel.component';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "ui/page";
import { ListViewComponent } from '../../components/list-view.component';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ns-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  moduleId: module.id,
})
export class OffersComponent extends ListViewComponent implements OnInit {
  constructor(
    private coinService: CoinService,
    private cacheService: CacheService,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    private page: Page,
    private routerExtensions: RouterExtensions,
    public loadingService: LoadingService
  ) {
    super(loadingService);
    page.actionBarHidden = true;
  }

  ngOnInit() {
    super.ngOnInit();
    this.load();
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type;
  }  

  public getData() {
    return this.coinService.getOffers()
  }

  public doReload() {
    this.coinService.reloadOffers = true;    
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
    for (var i = 0; i < this._dataItems.length; i++) {
      if (this._dataItems.getItem(i).id == offer.id) {
        this._dataItems.setItem(i, offer);
      }
    }
    this.onUpdated(this._dataItems.slice(0, this._dataItems.length));
  }   

  onUpdated(offers): void {
    this.cacheService.store("offers", offers);
  }   
}
