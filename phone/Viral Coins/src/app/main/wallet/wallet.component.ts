import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { CoinService } from "../../services/coin.service";
import { CacheService } from "../../services/cache.service";
import { Coin } from '../../models/coin.model';
import { Page } from "ui/page";
import { HelpComponent } from '../../components/help/help.component';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import * as SocialShare from "nativescript-social-share";
import { fromUrl } from "image-source";
import { DetailModalComponent } from "../detail-modal/detail-modal.component";
import { RedeemComponent } from "../redeem/redeem.component";
import { Config } from "../../config";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from '@angular/router';
import { ListViewEventData } from "nativescript-ui-listview";
import { setTimeout } from "tns-core-modules/timer";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import { catchError, map, tap } from "rxjs/operators";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: "wallet",
  moduleId: module.id,
  templateUrl: "./wallet.component.html",
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent extends ListViewComponent implements OnInit {
  wallet: any;
  totalValue = 0;
  percentage = 0;

  constructor(
    private coinService: CoinService,
    private page: Page,
    private routerExtensions: RouterExtensions,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    private cacheService: CacheService,
    public loadingService: LoadingService
  ) {
    super(loadingService);
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {  
    super.ngOnInit();
    this.page.actionBarHidden = true;  
    this.load();
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == null ? 'coin' : 'empty';
  }

  getData() {
    return this.coinService.loadWallet().pipe(
      map(wallet => {
        this.wallet = wallet;
        return wallet.coins;
      })
    );
  } 

  onFindTap(): void {
    this.routerExtensions.navigate(['/main/find']);
  }

  onBuyTap(): void {
    this.routerExtensions.navigate(['/trade'], {
      transition: {
        name: 'slideLeft'
      }
    });
  }

  onHelpTap(): void {
    const helpText = "Your wallet displays which coins you own as well as the total value of those coins. Once a coin is found and claimed it will show up here.";

    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        header: "Wallet",
        content: helpText
      },
      fullscreen: true
    };

    this.modal.showModal(HelpComponent, options)
      .then(() => {
        console.log("");
      });
  }

  onUpdated(coins): void {
    this.wallet.coins = coins;
    this.cacheService.store("wallet", this.wallet);
  }

  public doReload() {
    this.coinService.reloadWallet = true;    
  }

  public onItemTap(coin) {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: coin,
      fullscreen: true
    };

    this.modal.showModal(DetailModalComponent, options)
      .then((result: any) => {
        if (result) {
          switch (result.action) {
            case "share":
              fromUrl(Config.apiUrl + "/coin/" + result.value + "/qr?size=4").then(image => {
                SocialShare.shareImage(image);
              });
              break;
            case "close":
              this.updateCoin(result.value);
              break;

          }
        }
      });
  }

  public onRedeemTap(coin): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: coin,
      fullscreen: true
    };

    this.modal.showModal(RedeemComponent, options)
      .then((result: any) => {});
  }

  public updateCoin(coin) {
    for (var i = 0; i < this._dataItems.length; i++) {
      if (this._dataItems.getItem(i).id == coin.id) {
        this._dataItems.setItem(i, coin);
      }
    }
    this.onUpdated(this._dataItems.slice(0, this._dataItems.length));
  }  
}
