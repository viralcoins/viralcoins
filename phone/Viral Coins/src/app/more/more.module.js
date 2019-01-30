"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var more_routing_module_1 = require("./more-routing.module");
var common_1 = require("nativescript-angular/common");
var shared_module_1 = require("../shared/shared.module");
var trade_component_1 = require("./trade/trade.component");
var account_component_1 = require("./account/account.component");
var trade_panel_component_1 = require("./trade-panel/trade-panel.component");
var offer_panel_component_1 = require("./offer-panel/offer-panel.component");
var offers_component_1 = require("./offers/offers.component");
var angular_1 = require("nativescript-ui-listview/angular");
var forms_1 = require("nativescript-angular/forms");
var payment_component_1 = require("./payment/payment.component");
var stripe_service_1 = require("./payment/stripe.service");
var MoreModule = /** @class */ (function () {
    function MoreModule() {
    }
    MoreModule = __decorate([
        core_1.NgModule({
            declarations: [
                trade_component_1.TradeComponent,
                offers_component_1.OffersComponent,
                trade_panel_component_1.TradePanelComponent,
                offer_panel_component_1.OfferPanelComponent,
                account_component_1.AccountComponent,
                payment_component_1.PaymentComponent
            ],
            imports: [
                forms_1.NativeScriptFormsModule,
                more_routing_module_1.MoreRoutingModule,
                common_1.NativeScriptCommonModule,
                angular_1.NativeScriptUIListViewModule,
                shared_module_1.SharedModule
            ],
            entryComponents: [
                trade_panel_component_1.TradePanelComponent,
                offer_panel_component_1.OfferPanelComponent
            ],
            providers: [
                stripe_service_1.StripeService
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], MoreModule);
    return MoreModule;
}());
exports.MoreModule = MoreModule;
