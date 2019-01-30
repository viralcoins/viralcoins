import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { WalletComponent } from './wallet/wallet.component';
import { FindComponent } from './find/find.component';
import { MoreComponent } from './more/more.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "home", component: HomeComponent },
  { path: "wallet", component: WalletComponent },
  { path: "find", component: FindComponent },
  { path: "more", component: MoreComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class MainRoutingModule { }
