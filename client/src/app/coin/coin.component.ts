import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from '../../environments/environment';
import { LocationService } from '../service/location.service';
import { LoadService } from '../service/load.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {
  lat: number;
  lng: number;
  zoom: number = 15;
  markers = [];
  coin;
  impression;
  loading = true;
  uid = null;
  showClaim = false;
  showPromote = false;
  user;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DataService,
    private locationService: LocationService,
    private loadService: LoadService,
    private authService: AuthService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.uid = this.route.snapshot.queryParamMap.get('uid');
    this.service.getCoin(id).subscribe(coin => {
      this.loading = false;
      if (coin) {
        this.showClaim = !coin.claimed;
        this.coin = coin;
        this.markers.push({
          code: coin.code,
          lat: coin.coordinates.latitude,
          lng: coin.coordinates.longitude
        });
        this.lat = coin.coordinates.latitude;
        this.lng = coin.coordinates.longitude;
      }
    }, err => {
      this.loading = false;
    });
    if (this.authService.currentUserValue) {
      this.service.getImpression(id).subscribe(impression => {
        if (!impression) {
          this.showPromote = true;
        }
      }, err => {
        this.showPromote = true;
      });
    } else {
      this.showPromote = true;
    }
    this.user = this.authService.currentUserValue;
  }

  getImageUrl(coin) {
    return environment.serverUrl + '/api/coin/' + coin.code + '/qr?size=4';
  }

  claim(coin) {
    if (this.authService.currentUserValue) {
      this.dataService.claim(this.coin.code).subscribe(coin => {
        this.showClaim = false;
        this.coin = coin;
      }, err => {
        console.log(err);
      })
    } else {
      // Begin process of redirecting for login/signup
      localStorage.setItem('returnUrl', this.router.url);
      this.router.navigate(['/login']);
      console.log("Not Logged In");
    }
  }

  promote(coin) {
    if (this.authService.currentUserValue) {
      this.dataService.promote(this.coin.code).subscribe(coin => {
        this.showPromote = false;
        this.coin = coin;
      }, err => {
        console.log(err);
      })
    } else {
      // Begin process of redirecting for login/signup
      localStorage.setItem('returnUrl', this.router.url);
      this.router.navigate(['/login']);
      console.log("Not Logged In");
    }
  }
}
