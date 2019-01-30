import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
import { LocationService } from '../service/location.service';

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  lat: number;
  lng: number;
  zoom: number = 10;
  markers = [];
  loading = true;
  coins = [];

  constructor(
    private dataService: DataService,
    private locationService: LocationService,
    private router: Router
  ) { }

  ngOnInit() {
    var _this = this;
    this.locationService.getLocation().subscribe(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.loading = false;
    }, err => {
      console.log(err);
    });
    this.dataService.getAvailableCoins().subscribe(coins => {
      for (var i = 0; i < coins.length; i++) {
        this.markers.push({
          id: coins[i].id,
          lat: coins[i].coordinates.latitude,
          lng: coins[i].coordinates.longitude
        });
      }
    }, err => {
      console.log(err);
    });
  }

  clickedMarker(label: string, index: number) {
    this.dataService.getPrize(this.markers[index].id).subscribe(prize => {
      this.markers[index].prize = prize.type;
    }, err => {
      console.log(err);
    });
    this.lat = this.markers[index].lat;
    this.lng = this.markers[index].lng;
    this.zoom = 20;
  }

  openMaps(m) {
    window.open("https://www.google.com/maps/dir/?api=1&destination="+m.lat+","+m.lng);
  }

}
