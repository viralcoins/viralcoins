import { Component, OnInit } from '@angular/core';
import { DataService, Response } from '../service/data.service';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Coin } from '../shared/coin';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  coins;
  loading = true;

  constructor(private service: DataService, private router: Router) { }

  ngOnInit() {
    this.service.getWallet().subscribe(response => {
      this.coins = response.coins;
      this.loading = false;
    }, err => {
      this.router.navigate(['/login']);
    });
  }

}
