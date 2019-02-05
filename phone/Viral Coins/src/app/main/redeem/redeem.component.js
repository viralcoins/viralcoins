"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var address_model_1 = require("../../models/address.model");
var router_1 = require("@angular/router");
var coin_service_1 = require("../../services/coin.service");
var router_2 = require("nativescript-angular/router");
var dialogs = require("tns-core-modules/ui/dialogs");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var RedeemComponent = /** @class */ (function () {
    function RedeemComponent(coinService, route, routerExtensions, params) {
        this.coinService = coinService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.params = params;
        this.first = "Benjamin";
        this.last = "Morrise";
        this.address = new address_model_1.Address("13637 Podocarpus Ln", "", "Orlando", "FL", "32828");
        this.coin = params.context;
    }
    RedeemComponent.prototype.ngOnInit = function () {
    };
    RedeemComponent.prototype.onSubmit = function () {
        var _this = this;
        this.coinService.redeemPrize(this.coin.id, this.first, this.last, this.address).subscribe(function () {
            dialogs.alert({
                title: "Success!",
                message: "Your prize has been redeemed. You will receive an email when your prize has been sent.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback();
            });
        });
    };
    RedeemComponent.prototype.onCancel = function () {
        this.params.closeCallback();
    };
    RedeemComponent = __decorate([
        core_1.Component({
            selector: 'ns-redeem',
            templateUrl: './redeem.component.html',
            styleUrls: ['./redeem.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            modal_dialog_1.ModalDialogParams])
    ], RedeemComponent);
    return RedeemComponent;
}());
exports.RedeemComponent = RedeemComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkZWVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZGVlbS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsNERBQXFEO0FBQ3JELDBDQUFpRDtBQUNqRCw0REFBMEQ7QUFDMUQsc0RBQStEO0FBQy9ELHFEQUF1RDtBQUN2RCxrRUFBc0U7QUFRdEU7SUFPRSx5QkFDVSxXQUF3QixFQUN4QixLQUFxQixFQUNyQixnQkFBa0MsRUFDbEMsTUFBeUI7UUFIekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQVRuQyxVQUFLLEdBQVcsVUFBVSxDQUFDO1FBQzNCLFNBQUksR0FBVyxTQUFTLENBQUM7UUFDekIsWUFBTyxHQUFZLElBQUksdUJBQU8sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQVNsRixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDN0IsQ0FBQztJQUVELGtDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUFBLGlCQVVDO1FBVEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUM7WUFDeEYsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsT0FBTyxFQUFFLHdGQUF3RjtnQkFDakcsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQWpDVSxlQUFlO1FBTjNCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsV0FBVztZQUNyQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1lBQ3JDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQVN1QiwwQkFBVztZQUNqQix1QkFBYztZQUNILHlCQUFnQjtZQUMxQixnQ0FBaUI7T0FYeEIsZUFBZSxDQWtDM0I7SUFBRCxzQkFBQztDQUFBLEFBbENELElBa0NDO0FBbENZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuLi8uLi9tb2RlbHMvYWRkcmVzcy5tb2RlbCc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvaW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29pbi5zZXJ2aWNlJztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtcmVkZWVtJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlZGVlbS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlZGVlbS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIFJlZGVlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgZmlyc3Q6IHN0cmluZyA9IFwiQmVuamFtaW5cIjtcbiAgbGFzdDogc3RyaW5nID0gXCJNb3JyaXNlXCI7XG4gIGFkZHJlc3M6IEFkZHJlc3MgPSBuZXcgQWRkcmVzcyhcIjEzNjM3IFBvZG9jYXJwdXMgTG5cIiwgXCJcIiwgXCJPcmxhbmRvXCIsIFwiRkxcIiwgXCIzMjgyOFwiKTtcbiAgY29pbjogYW55O1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZSxcbiAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICBwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zXG4gICkge1xuICAgIHRoaXMuY29pbiA9IHBhcmFtcy5jb250ZXh0O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvblN1Ym1pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnJlZGVlbVByaXplKHRoaXMuY29pbi5pZCwgdGhpcy5maXJzdCwgdGhpcy5sYXN0LCB0aGlzLmFkZHJlc3MpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgdGl0bGU6IFwiU3VjY2VzcyFcIixcbiAgICAgICAgbWVzc2FnZTogXCJZb3VyIHByaXplIGhhcyBiZWVuIHJlZGVlbWVkLiBZb3Ugd2lsbCByZWNlaXZlIGFuIGVtYWlsIHdoZW4geW91ciBwcml6ZSBoYXMgYmVlbiBzZW50LlwiLFxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgfSkudGhlbigoKT0+IHtcbiAgICAgICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBvbkNhbmNlbCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7ICAgIFxuICB9XG59XG4iXX0=