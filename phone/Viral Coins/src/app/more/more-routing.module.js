"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var trade_component_1 = require("./trade/trade.component");
var offers_component_1 = require("./offers/offers.component");
var account_component_1 = require("./account/account.component");
var shared_module_1 = require("../shared/shared.module");
var payment_component_1 = require("./payment/payment.component");
var contests_component_1 = require("./contests/contests.component");
var statistics_component_1 = require("./statistics/statistics.component");
var routes = [
    { path: "trade", component: trade_component_1.TradeComponent },
    { path: "offers", component: offers_component_1.OffersComponent },
    { path: "account", component: account_component_1.AccountComponent },
    { path: "payment", component: payment_component_1.PaymentComponent },
    { path: "contests", component: contests_component_1.ContestsComponent },
    { path: "statistics", component: statistics_component_1.StatisticsComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9yZS1yb3V0aW5nLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1vcmUtcm91dGluZy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBeUM7QUFFekMsc0RBQXVFO0FBQ3ZFLDJEQUF5RDtBQUN6RCw4REFBNEQ7QUFDNUQsaUVBQStEO0FBQy9ELHlEQUF1RDtBQUN2RCxpRUFBK0Q7QUFDL0Qsb0VBQWtFO0FBQ2xFLDBFQUF3RTtBQUV4RSxJQUFNLE1BQU0sR0FBVztJQUNyQixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxrQ0FBZSxFQUFFO0lBQzlDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsb0NBQWdCLEVBQUU7SUFDaEQsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxvQ0FBZ0IsRUFBRTtJQUNoRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNDQUFpQixFQUFFO0lBQ2xELEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsMENBQW1CLEVBQUU7Q0FDdkQsQ0FBQztBQVNGO0lBQUE7SUFBaUMsQ0FBQztJQUFyQixpQkFBaUI7UUFQN0IsZUFBUSxDQUFDO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLDRCQUFZO2dCQUNaLGlDQUF3QixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7YUFDMUM7WUFDRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUNwQyxDQUFDO09BQ1csaUJBQWlCLENBQUk7SUFBRCx3QkFBQztDQUFBLEFBQWxDLElBQWtDO0FBQXJCLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFRyYWRlQ29tcG9uZW50IH0gZnJvbSAnLi90cmFkZS90cmFkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2ZmZXJzQ29tcG9uZW50IH0gZnJvbSAnLi9vZmZlcnMvb2ZmZXJzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBY2NvdW50Q29tcG9uZW50IH0gZnJvbSAnLi9hY2NvdW50L2FjY291bnQuY29tcG9uZW50JztcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4uL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7IFBheW1lbnRDb21wb25lbnQgfSBmcm9tICcuL3BheW1lbnQvcGF5bWVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29udGVzdHNDb21wb25lbnQgfSBmcm9tICcuL2NvbnRlc3RzL2NvbnRlc3RzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdGF0aXN0aWNzQ29tcG9uZW50IH0gZnJvbSAnLi9zdGF0aXN0aWNzL3N0YXRpc3RpY3MuY29tcG9uZW50JztcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gIHsgcGF0aDogXCJ0cmFkZVwiLCBjb21wb25lbnQ6IFRyYWRlQ29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJvZmZlcnNcIiwgY29tcG9uZW50OiBPZmZlcnNDb21wb25lbnQgfSxcbiAgeyBwYXRoOiBcImFjY291bnRcIiwgY29tcG9uZW50OiBBY2NvdW50Q29tcG9uZW50IH0sXG4gIHsgcGF0aDogXCJwYXltZW50XCIsIGNvbXBvbmVudDogUGF5bWVudENvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwiY29udGVzdHNcIiwgY29tcG9uZW50OiBDb250ZXN0c0NvbXBvbmVudCB9LFxuICB7IHBhdGg6IFwic3RhdGlzdGljc1wiLCBjb21wb25lbnQ6IFN0YXRpc3RpY3NDb21wb25lbnQgfVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIFNoYXJlZE1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yQ2hpbGQocm91dGVzKVxuICBdLFxuICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBNb3JlUm91dGluZ01vZHVsZSB7IH1cbiJdfQ==