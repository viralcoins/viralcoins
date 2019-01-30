import { Component, OnInit } from '@angular/core';
import { Accuracy } from "tns-core-modules/ui/enums";
import { getCurrentLocation, enableLocationRequest } from "nativescript-geolocation";
import { CoinService } from "../../services/coin.service";
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  moduleId: module.id
})
export class CreateComponent implements OnInit {

  latitude;
  longitude;
  code = "";
  description = "";
  locationLoaded = false;  
  requiresAddress = false;
  prizeName = "";
  price = 1999;

  constructor(
  	private coinService: CoinService,
  	private params: ModalDialogParams
  ) {
    this.code = params.context.code;
    enableLocationRequest(true);
  }

  ngOnInit() {
    this.getLocationOnce();  
  }

  public getLocationOnce() {
    getCurrentLocation({
      desiredAccuracy: Accuracy.high,
      timeout: 5000
    })
      .then(location => {
        this.longitude = location.longitude;
        this.latitude = location.latitude;
        this.locationLoaded = true;
      }).catch(error => {
        console.log("Location error received: " + error);
        alert("Location error received: " + error);
      });
  }

  onAddTap(): void {
    let prize = null;
    if (this.prizeName) {
      prize = {
        "name": this.prizeName,
        "addressRequired": true
      }      
    }
    this.coinService.create(this.latitude, this.longitude, this.code, this.description, prize, this.price)
      .subscribe(coin => {
        this.params.closeCallback();
      });
  }    

  onCancelTap(): void {
    this.params.closeCallback();
  }

}
