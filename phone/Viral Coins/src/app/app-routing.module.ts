import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { LoginComponent } from "./components/login/login.component";
import { MainComponent } from "./main/main.component";
import { AdminComponent } from "./admin/admin.component";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "main", component: MainComponent, loadChildren: "./app/main/main.module#MainModule" },
  { path: "admin", component: AdminComponent, loadChildren: "./app/admin/admin.module#AdminModule" }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
