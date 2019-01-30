import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "users", component: UsersComponent },
  { path: "settings", component: SettingsComponent },
  { path: "messages", component: MessagesComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class AdminRoutingModule { }
