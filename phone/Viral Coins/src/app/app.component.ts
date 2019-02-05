import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import * as appSettings from "tns-core-modules/application-settings";
import { Config } from "./config";
import { LoadingService } from './services/loading.service';

@Component({
  moduleId: module.id,
  selector: "ns-app",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {

  isLoading = false;

  constructor(
    private routerExtensions: RouterExtensions,
    private loadingService: LoadingService
  ) {
    this.loadingService.isLoading.subscribe(isLoading => {
      this.isLoading = isLoading;
    });    
  }

  ngOnInit(): void {
    var token: string = appSettings.getString("token");
    if (token) {
      Config.token = token;
      this.routerExtensions.navigate(['/main/home'], {
        clearHistory: true
      });
    } else {
      this.routerExtensions.navigate(['/login'], {
        clearHistory: true
      });
    }
  }
}
