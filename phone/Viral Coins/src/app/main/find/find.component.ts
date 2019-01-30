import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { CoinService } from "../../services/coin.service";
import { Coin } from '../../models/coin.model';
import { Location, getCurrentLocation, isEnabled, distance, enableLocationRequest } from "nativescript-geolocation";
import { Accuracy } from "tns-core-modules/ui/enums";
import { registerElement } from "nativescript-angular/element-registry";
import { MapboxView, MapboxMarker } from "nativescript-mapbox";
import * as utils from "utils/utils";
import { Page } from "ui/page";
import { Directions } from "nativescript-directions";

registerElement("Mapbox", () => MapboxView);

@Component({
  selector: "find",
  moduleId: module.id,
  templateUrl: "./find.component.html"
})
export class FindComponent implements OnInit {

  @ViewChild("map") public mapbox: ElementRef;

  latitude;
  longitude;
  coinList: Array<Coin> = [];
  isLoading = false;
  listLoaded = false;
  mapLoaded = false;
  locationLoaded = false;
  zoomLevel = 10;

  constructor(
    private coinService: CoinService,
    private page: Page
  ) {
    this.page.actionBarHidden = true;
    enableLocationRequest(true);    
  }

  public ngOnInit() {
    this.getLocationOnce();    
  }

  public loadCoins() {
    this.coinService.find()
      .subscribe(loadedCoins => {
        this.coinList = [];
        loadedCoins.forEach((coinObject) => {
          this.coinList.unshift(coinObject);
        });
        this.isLoading = false;
        this.listLoaded = true;
        this.checkUpdate();
      });
  }

  public isLocationEnabled() {
    isEnabled().then(function(isLocationEnabled) {
      let message = "Location services are not available";
      if (isLocationEnabled) {
        message = "Location services are available";
      }
      alert(message);
    }, function(e) {
      console.log("Location error received: " + (e.message || e));
    });
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
        this.checkUpdate();
      }).catch(error => {
        console.log("Location error received: " + error);
        alert("Location error received: " + error);
      });
  }

  public onMapReady(args: any) {
    this.mapLoaded = true;
    this.loadCoins();
    this.checkUpdate();
  }

  checkUpdate() {
    console.log(this.mapLoaded + ":" + this.locationLoaded + ":" + this.listLoaded);
    if (this.mapLoaded && this.locationLoaded && this.listLoaded) {
      this.doUpdate();
    }
  }

  doUpdate(): void {
    this.mapbox.nativeElement.setCenter({
      lat: this.latitude,
      lng: this.longitude
    })
    for (let coin of this.coinList) {
      this.mapbox.nativeElement.addMarkers([
        {
          lat: coin.coordinates.latitude,
          lng: coin.coordinates.longitude,
          title: coin.description,
          subtitle: "Tap for directions",
          onCalloutTap: (marker) => {
            console.log(marker);
            let directions = new Directions();

            directions.available().then(avail => {
              if (avail) {
                directions.navigate({
                  to: { // either pass in a single object or an Array (see the TypeScript example below)
                    lat: marker.lat,
                    lng: marker.lng
                  }
                  // for iOS-specific options, see the TypeScript example below.
                }).then(
                  function() {
                    console.log("Maps app launched.");
                  },
                  function(error) {
                    console.log(error);
                  }
                );                
              }
            });
          }
        }
      ]);
    }
  }

  onRefreshTap(): void {
    this.mapbox.nativeElement.removeMarkers();
    this.coinService.reloadCoins = true;
    this.loadCoins();
  }

}
