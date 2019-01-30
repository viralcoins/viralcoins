"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular_1 = require("nativescript-youtubeplayer/angular");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var http_1 = require("nativescript-angular/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login/login.component");
var main_module_1 = require("./main/main.module");
var admin_module_1 = require("./admin/admin.module");
var more_module_1 = require("./more/more.module");
var shared_module_1 = require("./shared/shared.module");
// Uncomment and add to NgModule imports if you need to use two-way binding
var forms_1 = require("nativescript-angular/forms");
// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
var http_client_1 = require("nativescript-angular/http-client");
var help_component_1 = require("./components/help/help.component");
var coin_service_1 = require("./services/coin.service");
var user_service_1 = require("./services/user.service");
var cache_service_1 = require("./services/cache.service");
var element_registry_1 = require("nativescript-angular/element-registry");
element_registry_1.registerElement("PullToRefresh", function () { return require("nativescript-pulltorefresh").PullToRefresh; });
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_module_1.AppRoutingModule,
                http_client_1.NativeScriptHttpClientModule,
                http_1.NativeScriptHttpModule,
                forms_1.NativeScriptFormsModule,
                main_module_1.MainModule,
                admin_module_1.AdminModule,
                more_module_1.MoreModule,
                shared_module_1.SharedModule,
                angular_1.YoutubePlayerModule
            ],
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                help_component_1.HelpComponent,
            ],
            exports: [
                help_component_1.HelpComponent,
            ],
            entryComponents: [
                help_component_1.HelpComponent,
            ],
            providers: [
                coin_service_1.CoinService,
                user_service_1.UserService,
                cache_service_1.CacheService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
