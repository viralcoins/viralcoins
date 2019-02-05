import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptUIChartModule } from "nativescript-ui-chart/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { MoreRoutingModule } from './more-routing.module';
import { SharedModule } from '../shared/shared.module';

import { TradeComponent } from './trade/trade.component';
import { AccountComponent } from './account/account.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { OfferPanelComponent } from './offer-panel/offer-panel.component';
import { OffersComponent } from './offers/offers.component';
import { PaymentComponent } from './payment/payment.component';
import { ContestsComponent } from './contests/contests.component';
import { ContestDetailComponent } from './contest-detail/contest-detail.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { StripeService } from './payment/stripe.service';

@NgModule({
  declarations: [
    TradeComponent,
    OffersComponent,
    TradePanelComponent,
    OfferPanelComponent,
    AccountComponent,
    PaymentComponent,
    ContestsComponent,
    ContestDetailComponent,
    StatisticsComponent
  ],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,        
    NativeScriptUIListViewModule,
    NativeScriptUIChartModule,
    MoreRoutingModule,
    SharedModule
  ],
  entryComponents: [
    TradePanelComponent,
    OfferPanelComponent
  ],
  providers: [
    StripeService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MoreModule { }
