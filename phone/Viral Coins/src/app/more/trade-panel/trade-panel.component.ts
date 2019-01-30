import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { CoinService } from '../../services/coin.service';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-trade-panel',
  templateUrl: './trade-panel.component.html',
  styleUrls: ['./trade-panel.component.css'],
  moduleId: module.id,
})
export class TradePanelComponent implements OnInit {

  coin: any;
  offer: number;

  constructor(
    private params: ModalDialogParams,
    private coinService: CoinService
  ) {
    this.coin = params.context;
  }

  public onClose(): void {
    this.params.closeCallback();
  }  

  ngOnInit() {
  }

  onHelpTap() {
    alert("Do help");
  }

  onSubmitTap() {
    this.coinService.makeOffer(this.coin.id, this.offer).subscribe(() => {
      dialogs.alert({
        title: "Success!",
        message: "Your offer has been submitted.",
        okButtonText: "OK"
      }).then(() => {
        this.onClose();
      });
    });
  }

}
