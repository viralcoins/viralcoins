import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { AdminRoutingModule } from './admin-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { SharedModule } from '../shared/shared.module';
import { CoinDetailComponent } from './coin-detail/coin-detail.component';
import { CreateComponent } from './create/create.component';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
  	AdminComponent,
  	HomeComponent,
  	BottomNavigationComponent,
    CoinDetailComponent,
    CreateComponent,
    MessagesComponent,
    UsersComponent,
    SettingsComponent
  ],
  imports: [  
    AdminRoutingModule,
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    NativeScriptUIListViewModule,
    SharedModule
  ],
  entryComponents: [
    CoinDetailComponent,
    CreateComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AdminModule { }
