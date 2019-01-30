import { Component, OnInit, ViewContainerRef, ViewChild, ChangeDetectorRef, ElementRef } from "@angular/core";
import { NavigationExtras } from '@angular/router';
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";
import { Config } from '../../config';
import { Coin } from '../../models/coin.model';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { setTimeout } from "tns-core-modules/timer";
import * as dialogs from "tns-core-modules/ui/dialogs";
import * as appSettings from "tns-core-modules/application-settings";
import { UserService } from '../../services/user.service';
import { CoinService } from '../../services/coin.service';
import { CacheService } from '../../services/cache.service';
import { SendMessageComponent } from '../send-message/send-message.component';
import { OfferPanelComponent } from '../../more/offer-panel/offer-panel.component';
import { View } from 'tns-core-modules/ui/core/view';
import { layout } from "tns-core-modules/utils/utils";

@Component({
  selector: "home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private _dataItems: ObservableArray<any>;
  private _templateSelector: (item: any, index: number, items: any) => string;
  private rightThresholdPassed: boolean;

  @ViewChild('listView') listView;

  constructor(
    private page: Page,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private _changeDetectionRef: ChangeDetectorRef,
    private cacheService: CacheService,
    private coinService: CoinService
  ) {
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
  	this._dataItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;
    this.load();    
  }  

  load(): void {
    this.userService.feed().subscribe(feed => {
  		this._dataItems.splice(0);    	
      if (feed.length > 0) {
      	for (let feedItem of feed) {
      		this._dataItems.push(feedItem);
      	}
      } else {
        this._dataItems.push("empty");
      }
      this.listView.nativeElement.notifyPullToRefreshFinished();
    });
  }  

  public onCellSwiping(args: ListViewEventData) {}

  public onSwipeCellStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const rightItem = swipeView.getViewById<View>('delete-view');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }

  public onSwipeCellFinished(args: ListViewEventData) {
  }

  public onRightSwipeClick(args) {
  	const feedItem = args.object.bindingContext;
    this.dataItems.splice(this.dataItems.indexOf(feedItem), 1);
    if (this._dataItems.length == 0) {
      this._dataItems.push("empty");
      this.cacheService.store("feed", []);
    } else {
    	this.cacheService.store("feed", this._dataItems.slice(0, this._dataItems.length));
    }
    this.userService.deleteFeedItem(feedItem.id).subscribe();
  }

  get dataItems(): ObservableArray<any> {
    return this._dataItems;
  } 

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return this._dataItems.getItem(0) == "empty" ? "empty" : item.type;
  }

  public onPullToRefreshInitiated(args: ListViewEventData) {
    const _this = this;
    setTimeout(function () {
      _this.userService.refreshFeed = true;
      _this.load();
    }, 1000);
  }

  onMessage() {
    const _this = this;
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {},
      fullscreen: true
    };

    this.modal.showModal(SendMessageComponent, options)
      .then((result) => {

      });    
  }

  onOfferTap(offer) {
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

      });  	
  }

  onOfferAcceptedTap(item) {
    this.routerExtensions.navigate(['/main/payment']);
  }

  onFindTap() {
    this.routerExtensions.navigate(['/main/find']);    
  }

  onBuyTap() {
    this.coinService.reloadSaleCoins = true;
    this.routerExtensions.navigate(['/trade'], {
      transition: {
        name: 'slideLeft'
      }
    });    
  }
}
