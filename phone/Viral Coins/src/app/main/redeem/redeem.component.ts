import { Component, OnInit } from '@angular/core';
import { Address } from '../../models/address.model';
import { ActivatedRoute } from "@angular/router";
import { CoinService } from '../../services/coin.service';
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.css'],
  moduleId: module.id,
})
export class RedeemComponent implements OnInit {

  first: string = "Benjamin";
  last: string = "Morrise";
  address: Address = new Address("13637 Podocarpus Ln", "", "Orlando", "FL", "32828");
  coin: any;

  public constructor(
    private coinService: CoinService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private params: ModalDialogParams
  ) {
    this.coin = params.context;
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.coinService.redeemPrize(this.coin.id, this.first, this.last, this.address).subscribe(() => {
      dialogs.alert({
        title: "Success!",
        message: "Your prize has been redeemed. You will receive an email when your prize has been sent.",
        okButtonText: "OK"
      }).then(()=> {
        this.params.closeCallback();
      });
    });
  }

  onCancel(): void {
    this.params.closeCallback();    
  }
}
