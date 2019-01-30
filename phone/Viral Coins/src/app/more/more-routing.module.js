"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var trade_component_1 = require("./trade/trade.component");
var offers_component_1 = require("./offers/offers.component");
var account_component_1 = require("./account/account.component");
var shared_module_1 = require("../shared/shared.module");
var payment_component_1 = require("./payment/payment.component");
var routes = [
    { path: "trade", component: trade_component_1.TradeComponent },
    { path: "offers", component: offers_component_1.OffersComponent },
    { path: "account", component: account_component_1.AccountComponent },
    { path: "payment", component: payment_component_1.PaymentComponent }
];
var MoreRoutingModule = /** @class */ (function () {
    function MoreRoutingModule() {
    }
    MoreRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                shared_module_1.SharedModule,
                router_1.NativeScriptRouterModule.forChild(routes)
            ],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], MoreRoutingModule);
    return MoreRoutingModule;
}());
exports.MoreRoutingModule = MoreRoutingModule;
