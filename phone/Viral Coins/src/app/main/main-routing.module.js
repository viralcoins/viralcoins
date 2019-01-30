"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var main_component_1 = require("./main.component");
var home_component_1 = require("./home/home.component");
var wallet_component_1 = require("./wallet/wallet.component");
var find_component_1 = require("./find/find.component");
var more_component_1 = require("./more/more.component");
var routes = [
    { path: "", component: main_component_1.MainComponent },
    { path: "home", component: home_component_1.HomeComponent },
    { path: "wallet", component: wallet_component_1.WalletComponent },
    { path: "find", component: find_component_1.FindComponent },
    { path: "more", component: more_component_1.MoreComponent }
];
var MainRoutingModule = /** @class */ (function () {
    function MainRoutingModule() {
    }
    MainRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], MainRoutingModule);
    return MainRoutingModule;
}());
exports.MainRoutingModule = MainRoutingModule;
