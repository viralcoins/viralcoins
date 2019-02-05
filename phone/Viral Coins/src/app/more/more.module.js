"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("nativescript-angular/common");
var angular_1 = require("nativescript-ui-listview/angular");
var angular_2 = require("nativescript-ui-chart/angular");
var forms_1 = require("nativescript-angular/forms");
var more_routing_module_1 = require("./more-routing.module");
var shared_module_1 = require("../shared/shared.module");
var trade_component_1 = require("./trade/trade.component");
var account_component_1 = require("./account/account.component");
var trade_panel_component_1 = require("./trade-panel/trade-panel.component");
var offer_panel_component_1 = require("./offer-panel/offer-panel.component");
var offers_component_1 = require("./offers/offers.component");
var payment_component_1 = require("./payment/payment.component");
var contests_component_1 = require("./contests/contests.component");
var contest_detail_component_1 = require("./contest-detail/contest-detail.component");
var statistics_component_1 = require("./statistics/statistics.component");
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
                payment_component_1.PaymentComponent,
                contests_component_1.ContestsComponent,
                contest_detail_component_1.ContestDetailComponent,
                statistics_component_1.StatisticsComponent
            ],
            imports: [
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIListViewModule,
                angular_2.NativeScriptUIChartModule,
                more_routing_module_1.MoreRoutingModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9yZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3JlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyRDtBQUUzRCxzREFBdUU7QUFDdkUsNERBQWdGO0FBQ2hGLHlEQUEwRTtBQUMxRSxvREFBcUU7QUFFckUsNkRBQTBEO0FBQzFELHlEQUF1RDtBQUV2RCwyREFBeUQ7QUFDekQsaUVBQStEO0FBQy9ELDZFQUEwRTtBQUMxRSw2RUFBMEU7QUFDMUUsOERBQTREO0FBQzVELGlFQUErRDtBQUMvRCxvRUFBa0U7QUFDbEUsc0ZBQW1GO0FBQ25GLDBFQUF3RTtBQUV4RSwyREFBeUQ7QUErQnpEO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUE3QnRCLGVBQVEsQ0FBQztZQUNSLFlBQVksRUFBRTtnQkFDWixnQ0FBYztnQkFDZCxrQ0FBZTtnQkFDZiwyQ0FBbUI7Z0JBQ25CLDJDQUFtQjtnQkFDbkIsb0NBQWdCO2dCQUNoQixvQ0FBZ0I7Z0JBQ2hCLHNDQUFpQjtnQkFDakIsaURBQXNCO2dCQUN0QiwwQ0FBbUI7YUFDcEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsaUNBQXdCO2dCQUN4QiwrQkFBdUI7Z0JBQ3ZCLHNDQUE0QjtnQkFDNUIsbUNBQXlCO2dCQUN6Qix1Q0FBaUI7Z0JBQ2pCLDRCQUFZO2FBQ2I7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsMkNBQW1CO2dCQUNuQiwyQ0FBbUI7YUFDcEI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsOEJBQWE7YUFDZDtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxVQUFVLENBQUk7SUFBRCxpQkFBQztDQUFBLEFBQTNCLElBQTJCO0FBQWQsZ0NBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRDb21tb25Nb2R1bGUgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktY2hhcnQvYW5ndWxhclwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcblxuaW1wb3J0IHsgTW9yZVJvdXRpbmdNb2R1bGUgfSBmcm9tICcuL21vcmUtcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuXG5pbXBvcnQgeyBUcmFkZUNvbXBvbmVudCB9IGZyb20gJy4vdHJhZGUvdHJhZGUuY29tcG9uZW50JztcbmltcG9ydCB7IEFjY291bnRDb21wb25lbnQgfSBmcm9tICcuL2FjY291bnQvYWNjb3VudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVHJhZGVQYW5lbENvbXBvbmVudCB9IGZyb20gJy4vdHJhZGUtcGFuZWwvdHJhZGUtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE9mZmVyUGFuZWxDb21wb25lbnQgfSBmcm9tICcuL29mZmVyLXBhbmVsL29mZmVyLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPZmZlcnNDb21wb25lbnQgfSBmcm9tICcuL29mZmVycy9vZmZlcnMuY29tcG9uZW50JztcbmltcG9ydCB7IFBheW1lbnRDb21wb25lbnQgfSBmcm9tICcuL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVzdHNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRlc3RzL2NvbnRlc3RzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb250ZXN0RGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi9jb250ZXN0LWRldGFpbC9jb250ZXN0LWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RhdGlzdGljc0NvbXBvbmVudCB9IGZyb20gJy4vc3RhdGlzdGljcy9zdGF0aXN0aWNzLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFN0cmlwZVNlcnZpY2UgfSBmcm9tICcuL3BheW1lbnQvc3RyaXBlLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUcmFkZUNvbXBvbmVudCxcbiAgICBPZmZlcnNDb21wb25lbnQsXG4gICAgVHJhZGVQYW5lbENvbXBvbmVudCxcbiAgICBPZmZlclBhbmVsQ29tcG9uZW50LFxuICAgIEFjY291bnRDb21wb25lbnQsXG4gICAgUGF5bWVudENvbXBvbmVudCxcbiAgICBDb250ZXN0c0NvbXBvbmVudCxcbiAgICBDb250ZXN0RGV0YWlsQ29tcG9uZW50LFxuICAgIFN0YXRpc3RpY3NDb21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogW1xuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSwgICAgICAgIFxuICAgIE5hdGl2ZVNjcmlwdFVJTGlzdFZpZXdNb2R1bGUsXG4gICAgTmF0aXZlU2NyaXB0VUlDaGFydE1vZHVsZSxcbiAgICBNb3JlUm91dGluZ01vZHVsZSxcbiAgICBTaGFyZWRNb2R1bGVcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgVHJhZGVQYW5lbENvbXBvbmVudCxcbiAgICBPZmZlclBhbmVsQ29tcG9uZW50XG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFN0cmlwZVNlcnZpY2VcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIE1vcmVNb2R1bGUgeyB9XG4iXX0=