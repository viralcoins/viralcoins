import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../service/data.service';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { LocationService } from '../service/location.service';
import { Prize } from '../shared/prize';

@Component({
  selector: 'app-coin-edit',
  templateUrl: './coin-edit.component.html',
  styleUrls: ['./coin-edit.component.css']
})
export class CoinEditComponent implements OnInit {

  coin;
  prize: Prize = new Prize();
  editForm = this.fb.group({
    code: {value: '', disabled: true},
    value: 0,
    claimed: 'false',
    active: 'false',
    latitude: 0,
    longitude: 0
  });

  prizeForm = this.fb.group({
    coinId: {value: '', hidden: true},
    type: '',
    address_required: 'false',
    redeemed: 'false'
  });

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService,
    private locationService: LocationService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.paramMap.get('code');
    this.dataService.getCoin(code).subscribe(coin => {
      this.coin = coin;
      this.editForm.patchValue({
        code: coin.code,
        value: coin.value,
        active: coin.active.toString(),
        claimed: coin.claimed.toString(),
        latitude: coin.coordinates.latitude,
        longitude: coin.coordinates.longitude
      });
      this.prizeForm.patchValue({coinId: coin.id});
      this.dataService.getPrize(coin.id).subscribe(prize => {
        console.log(prize);
        if (prize) {
          this.prize = prize;
          this.prizeForm.patchValue({
            type: prize.type,
            address_required: prize.addressRequired,
            redeemed: prize.redeemed
          });
        }
      });
    });
  }

  onCoinSubmit() {
    console.log(this.editForm.get('claimed').value, this.editForm.get('active').value);
    this.coin.claimed = this.editForm.get('claimed').value == "true";
    this.coin.active = this.editForm.get('active').value == "true";
    this.coin.value = parseFloat(this.editForm.get('value').value);
    this.coin.coordinates.latitude = parseFloat(this.editForm.get('latitude').value);
    this.coin.coordinates.longitude = parseFloat(this.editForm.get('longitude').value);
    console.log(this.coin);
    this.dataService.updateCoin(this.coin).subscribe(coin => {
      console.log(coin);
    });
  }

  onPrizeSubmit() {
    this.prize.type = this.prizeForm.get('type').value;
    this.prize.coin = this.prizeForm.get('coinId').value;
    this.prize.redeemed = this.prizeForm.get('redeemed').value == "true";
    this.prize.addressRequired = this.prizeForm.get('address_required').value == "true";
    this.dataService.updatePrize(this.prize).subscribe(prize => {
      console.log(prize);
    });
  }

  updateLocation() {
    this.locationService.getLocation().subscribe(position => {
      this.editForm.patchValue({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }

}
