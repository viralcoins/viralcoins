import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import * as dialogs from "tns-core-modules/ui/dialogs";
import { CoinService } from '../../services/coin.service';

@Component({
  selector: 'ns-coin-detail',
  templateUrl: './coin-detail.component.html',
  styleUrls: ['./coin-detail.component.css'],
  moduleId: module.id,
})
export class CoinDetailComponent implements OnInit {

  coin;

  constructor(
    private params: ModalDialogParams,
    private coinService: CoinService
    ) {
    this.coin = params.context;
  }

  ngOnInit() {
  }

  onClose() {
    this.params.closeCallback();
  }

  onActivateTap() {
    this.coinService.activate(this.coin.id).subscribe(coin => {
      this.coin = coin;
    });    
  }

  onDeleteTap() {
    const _this = this;
    dialogs.confirm({
      title: "Confirm Deletion",
      message: "Do you really want to delete this coin?",
      okButtonText: "Yes",
      cancelButtonText: "No"
    }).then(function (result) {
      if (result) {
        _this.coinService.remove(_this.coin.id).subscribe(() => {
          _this.params.closeCallback({

          });
        });
      }
    });
  }

  onSellTap() {
    this.coinService.sell(this.coin.id).subscribe(coin => {
      this.coin.forSale = true;
    });
  }
}
