import { Component, OnInit } from '@angular/core';
import { CoinService } from '../../services/coin.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-offer-panel',
  templateUrl: './offer-panel.component.html',
  styleUrls: ['./offer-panel.component.css'],
  moduleId: module.id,
})
export class OfferPanelComponent implements OnInit {

  private offerId;
  offer;

  constructor(
  	private params: ModalDialogParams,
  	private coinService: CoinService
  	) {
  	this.offerId = params.context.id;
  }

  ngOnInit() {
    this.coinService.getOffer(this.offerId).subscribe(offer => {
      this.offer = offer;
    });
  }

  public onClose(): void {
    this.params.closeCallback();
  }  

  public onAcceptTap(): void {
    this.coinService.acceptOffer(this.offerId).subscribe(offer => {      
      dialogs.alert({
        title: "Success!",
        message: "You have accepted their offer. The user will be notified and when payment is received, the coin will be transfered to your wallet.",
        okButtonText: "OK"
      }).then(() => {
        this.params.closeCallback({
          action: "accepted",
          value: offer
        });
      });
    });
  }

  public onRejectTap(): void {
    this.coinService.rejectOffer(this.offerId).subscribe(offer => {
      dialogs.alert({
        title: "Success!",
        message: "You have rejected their offer. They can make additional offers while your coins is listed for sale.",
        okButtonText: "OK"
      }).then(() => {
        this.params.closeCallback({
          action: "rejected",
          value: offer
        });
      });
    });
  } 

}
