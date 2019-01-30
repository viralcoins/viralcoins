import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../service/data.service';
import { LocationService } from '../service/location.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  geolocationPosition;
  coins = [];
  loading = true;
  code = "";

  constructor(
    private service: DataService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getCoins();
    this.locationService.getLocation().subscribe(position => {
      this.geolocationPosition = position;
    });
  }

  createCoin() {
    var code = "";
    var regex = new RegExp("^[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}");
    if (this.code && regex.test(this.code)) {
      code = this.code;
    }
    var lat = this.geolocationPosition ? this.geolocationPosition.coords.latitude : -1;
    var long = this.geolocationPosition ? this.geolocationPosition.coords.longitude : -1;
    this.service.createCoin(lat, long, code).subscribe(coin => {
      this.getCoins();
    })
  }

  activateCoin(coin) {
    this.service.activateCoin(coin.id).subscribe(response => {
      coin.active = true;
    });
  }

  deleteCoin(coin) {
    this.service.deleteCoin(coin.id).subscribe(response => {
      var index = this.coins.indexOf(coin);
      this.coins.splice(index, 1);
    });
  }

  getCoins() {
    this.service.getCoins().subscribe(coins => {
      this.coins = coins;
      this.loading = false;
    });
  }

}
