import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { TradeComponent } from './trade/trade.component';
import { OffersComponent } from './offers/offers.component';
import { AccountComponent } from './account/account.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: "trade", component: TradeComponent },
  { path: "offers", component: OffersComponent },
  { path: "account", component: AccountComponent },
  { path: "payment", component: PaymentComponent }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes)
  ],
  exports: [NativeScriptRouterModule]
})
export class MoreRoutingModule { }
