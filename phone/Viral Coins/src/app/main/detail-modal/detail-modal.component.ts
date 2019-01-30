import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { Coin } from "../../models/coin.model";
import { Config } from "../../config";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationExtras } from '@angular/router';
import { CoinService } from "../../services/coin.service";

@Component({
  selector: "app-detail-modal",
  moduleId: module.id,
  templateUrl: "./detail-modal.component.html",
  styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent implements OnInit {
  coin: Coin;
  public coinImage = '';
  isLoading = false;

  constructor(
    private params: ModalDialogParams,
    private routerExtensions: RouterExtensions,
    private coinService: CoinService
  ) {
    this.coin = params.context as Coin;
    this.coinImage = Config.apiUrl + "/coin/" + this.coin.code + "/qr?size=8"
  }

  ngOnInit(): void {
    // Init your component properties here.
  }

  public onClose(): void {
    this.params.closeCallback({
      action: "close",
      value: this.coin
    });
  }

  public onShareTap(): void {
    this.params.closeCallback({
      action: "share",
      value: this.coin.code
    });
  }

  public onSellTap(): void {
    this.isLoading = true;
    this.coinService.sell(this.coin.id).subscribe(coin => {
      this.isLoading = false;
      this.coin = coin;
    });
  }

  public onUnlistTap(): void {
    this.isLoading = true;
    this.coinService.unlist(this.coin.id).subscribe(coin => {
      this.isLoading = false;
      this.coin = coin;
    });
  }
}
