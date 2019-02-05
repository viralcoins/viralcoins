import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { MainModule } from "./main/main.module";
import { AdminModule } from "./admin/admin.module";
import { MoreModule } from "./more/more.module";
import { SharedModule } from './shared/shared.module';

// Uncomment and add to NgModule imports if you need to use two-way binding
import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { HelpComponent } from './components/help/help.component';
import { CoinService } from './services/coin.service';
import { UserService } from './services/user.service';
import { CacheService } from './services/cache.service';
import { LoadingService } from './services/loading.service';
import { registerElement } from "nativescript-angular/element-registry";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);

@NgModule({
  bootstrap: [
    AppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    NativeScriptHttpModule,
    NativeScriptFormsModule,
    MainModule,
    AdminModule,
    MoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
  ],
  exports: [
    HelpComponent,
  ],
  entryComponents: [
    HelpComponent,
  ],
  providers: [
    CoinService,
    UserService,
    CacheService,
    LoadingService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
