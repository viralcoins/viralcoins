import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { MainRoutingModule } from './main-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { FindComponent } from './find/find.component';
import { DetailModalComponent } from "./detail-modal/detail-modal.component";
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { MoreComponent } from './more/more.component';
import { RedeemComponent } from './redeem/redeem.component';
import { SharedModule } from '../shared/shared.module';
import { CreditCardViewModule } from "nativescript-stripe/angular";

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WalletComponent,
    FindComponent,
    DetailModalComponent,
    BottomNavigationComponent,
    SendMessageComponent,
    MoreComponent,
    RedeemComponent
  ],
  imports: [
    MainRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
    SharedModule,
    CreditCardViewModule
  ],  
  entryComponents: [
    DetailModalComponent,
    SendMessageComponent,
    RedeemComponent
  ],
  providers: [
  ],  
  schemas: [NO_ERRORS_SCHEMA]
})
export class MainModule { }
