import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import { Config } from "./config";

@Component({
  moduleId: module.id,
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

  constructor(
    private routerExtensions: RouterExtensions
  ) { }

  ngOnInit(): void {
    var token: string = appSettings.getString("token");
    if (token) {
      Config.token = token;
      this.routerExtensions.navigate(['/main/home']);
    } else {
      this.routerExtensions.navigate(['/login']);
    }
  }
}
