import { Component, OnInit, ViewContainerRef, ViewChild, ChangeDetectorRef, ElementRef } from "@angular/core";
import { NavigationExtras } from '@angular/router';
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { ListViewEventData } from "nativescript-ui-listview";
import { RouterExtensions } from "nativescript-angular/router";
import { Config } from '../../config';
import { View } from 'tns-core-modules/ui/core/view';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { UserService } from '../../services/user.service';
import { CoinService } from '../../services/coin.service';
import { CacheService } from '../../services/cache.service';
import { SendMessageComponent } from '../send-message/send-message.component';
import { OfferPanelComponent } from '../../more/offer-panel/offer-panel.component';
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import * as Admob from "nativescript-admob";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: "home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends ListViewComponent implements OnInit {
  private rightThresholdPassed: boolean;

  constructor(
    private page: Page,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private cacheService: CacheService,
    private coinService: CoinService,
    public loadingService: LoadingService
  ) {
    super(loadingService);
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.page.actionBarHidden = true;
    this.load();
    // const _this = this;
    // setTimeout(function() {
    //   _this.createBanner();
    // }, 1000);
  }  

  getData() {
    return this.userService.feed();
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
      this._dataItems.push({type: "empty"});
      this.cacheService.store("feed", []);
    } else {
    	this.cacheService.store("feed", this._dataItems.slice(0, this._dataItems.length));
    }
    this.userService.deleteFeedItem(feedItem.id).subscribe();
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == "empty" ? "empty" : item.type;
  }

  public doReload(): void {
    this.userService.refreshFeed = true;
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

  onNotificationTap(item) {
    console.log(item.data);
  }

  public createBanner() {
    Admob.createBanner({
      testing: true,
      size: Admob.AD_SIZE.BANNER,
      iosBannerId: Config.iosBannerId,
      androidBannerId: Config.androidBannerId,
      iosTestDeviceIds: ["8dd6f211135fabd3fed1a3c8d40e485bdb597255"],
      margins: {
        bottom: 60
      }
    }).then(function() {
      console.log("admob createBanner done");
    }, function(error) {
      console.log("admob createBanner error: " + error);
    });
  }

  public hideBanner() {
    Admob.hideBanner().then(function() {
      console.log("admob hideBanner done");
    }, function(error) {
      console.log("admob hideBanner error: " + error);
    });
  }

  public createInterstitial() {
    Admob.createInterstitial({
      testing: true,
      iosInterstitialId: Config.iosInterstitialId,
      androidInterstitialId: Config.androidInterstitialId,
      iosTestDeviceIds: ["8dd6f211135fabd3fed1a3c8d40e485bdb597255"]
    }).then(function() {
      console.log("admob createInterstitial done");
    }, function(error) {
      console.log("admob createInterstitial error: " + error);
    });
  }
}
