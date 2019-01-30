import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { MoreRoutingModule } from './more-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { SharedModule } from '../shared/shared.module';
import { TradeComponent } from './trade/trade.component';
import { AccountComponent } from './account/account.component';
import { TradePanelComponent } from './trade-panel/trade-panel.component';
import { OfferPanelComponent } from './offer-panel/offer-panel.component';
import { OffersComponent } from './offers/offers.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { PaymentComponent } from './payment/payment.component';
import { StripeService } from './payment/stripe.service';

@NgModule({
  declarations: [
    TradeComponent,
    OffersComponent,
    TradePanelComponent,
    OfferPanelComponent,
    AccountComponent,
    PaymentComponent
  ],
  imports: [
    NativeScriptFormsModule,
    MoreRoutingModule,
    NativeScriptCommonModule,
    NativeScriptUIListViewModule,
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
