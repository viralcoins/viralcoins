"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var offer_panel_component_1 = require("../offer-panel/offer-panel.component");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var list_view_component_1 = require("../../components/list-view.component");
var loading_service_1 = require("../../services/loading.service");
var OffersComponent = /** @class */ (function (_super) {
    __extends(OffersComponent, _super);
    function OffersComponent(coinService, cacheService, modal, vcRef, page, routerExtensions, loadingService) {
        var _this_1 = _super.call(this, loadingService) || this;
        _this_1.coinService = coinService;
        _this_1.cacheService = cacheService;
        _this_1.modal = modal;
        _this_1.vcRef = vcRef;
        _this_1.page = page;
        _this_1.routerExtensions = routerExtensions;
        _this_1.loadingService = loadingService;
        _this_1.templateSelectorFunction = function (item, index, items) {
            return item.type;
        };
        page.actionBarHidden = true;
        return _this_1;
    }
    OffersComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.load();
    };
    OffersComponent.prototype.getData = function () {
        return this.coinService.getOffers();
    };
    OffersComponent.prototype.doReload = function () {
        this.coinService.reloadOffers = true;
    };
    OffersComponent.prototype.onReceivedOfferTap = function (offer) {
        var _this_1 = this;
        var _this = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: {
                id: offer.id
            },
            fullscreen: true
        };
        this.modal.showModal(offer_panel_component_1.OfferPanelComponent, options)
            .then(function (result) {
            if (result.action) {
                _this_1.updateOffer(result.value);
            }
        });
    };
    OffersComponent.prototype.updateOffer = function (offer) {
        for (var i = 0; i < this._dataItems.length; i++) {
            if (this._dataItems.getItem(i).id == offer.id) {
                this._dataItems.setItem(i, offer);
            }
        }
        this.onUpdated(this._dataItems.slice(0, this._dataItems.length));
    };
    OffersComponent.prototype.onUpdated = function (offers) {
        this.cacheService.store("offers", offers);
    };
    OffersComponent = __decorate([
        core_1.Component({
            selector: 'ns-offers',
            templateUrl: './offers.component.html',
            styleUrls: ['./offers.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            cache_service_1.CacheService,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            page_1.Page,
            router_1.RouterExtensions,
            loading_service_1.LoadingService])
    ], OffersComponent);
    return OffersComponent;
}(list_view_component_1.ListViewComponent));
exports.OffersComponent = OffersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXJzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9mZmVycy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0U7QUFDcEUsNERBQTBEO0FBQzFELDhEQUE0RDtBQUM1RCxtRUFBaUc7QUFDakcsOEVBQTJFO0FBQzNFLHNEQUErRDtBQUMvRCxnQ0FBK0I7QUFDL0IsNEVBQXlFO0FBRXpFLGtFQUFnRTtBQVFoRTtJQUFxQyxtQ0FBaUI7SUFDcEQseUJBQ1UsV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsSUFBVSxFQUNWLGdCQUFrQyxFQUNuQyxjQUE4QjtRQVB2QyxjQVNFLGtCQUFNLGNBQWMsQ0FBQyxTQUV0QjtRQVZTLG1CQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLGFBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLGFBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFlBQUksR0FBSixJQUFJLENBQU07UUFDVix3QkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ25DLHNCQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVdoQyxnQ0FBd0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBVTtZQUNyRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFBO1FBVkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7O0lBQzlCLENBQUM7SUFFRCxrQ0FBUSxHQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQU1NLGlDQUFPLEdBQWQ7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDckMsQ0FBQztJQUVNLGtDQUFRLEdBQWY7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELDRDQUFrQixHQUFsQixVQUFtQixLQUFLO1FBQXhCLG1CQWdCQztRQWZDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFNLE9BQU8sR0FBdUI7WUFDbEMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDNUIsT0FBTyxFQUFFO2dCQUNQLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFBRTthQUNiO1lBQ0QsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FBQztRQUVGLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLDJDQUFtQixFQUFFLE9BQU8sQ0FBQzthQUMvQyxJQUFJLENBQUMsVUFBQyxNQUFNO1lBQ1gsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNoQztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLEtBQUs7UUFDdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUNuQztTQUNGO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ25FLENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsTUFBTTtRQUNkLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBNURVLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBR3VCLDBCQUFXO1lBQ1YsNEJBQVk7WUFDbkIsNEJBQWtCO1lBQ2xCLHVCQUFnQjtZQUNqQixXQUFJO1lBQ1EseUJBQWdCO1lBQ25CLGdDQUFjO09BUjVCLGVBQWUsQ0E2RDNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdERCxDQUFxQyx1Q0FBaUIsR0E2RHJEO0FBN0RZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvaW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29pbi5zZXJ2aWNlJztcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dTZXJ2aWNlLCBNb2RhbERpYWxvZ09wdGlvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9kaXJlY3RpdmVzL2RpYWxvZ3MnO1xuaW1wb3J0IHsgT2ZmZXJQYW5lbENvbXBvbmVudCB9IGZyb20gJy4uL29mZmVyLXBhbmVsL29mZmVyLXBhbmVsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbGlzdC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtb2ZmZXJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL29mZmVycy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL29mZmVycy5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIE9mZmVyc0NvbXBvbmVudCBleHRlbmRzIExpc3RWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb2luU2VydmljZTogQ29pblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBjYWNoZVNlcnZpY2U6IENhY2hlU2VydmljZSxcbiAgICBwcml2YXRlIG1vZGFsOiBNb2RhbERpYWxvZ1NlcnZpY2UsXG4gICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHB1YmxpYyBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIobG9hZGluZ1NlcnZpY2UpO1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5sb2FkKCk7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uID0gKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGl0ZW0udHlwZTtcbiAgfSAgXG5cbiAgcHVibGljIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29pblNlcnZpY2UuZ2V0T2ZmZXJzKClcbiAgfVxuXG4gIHB1YmxpYyBkb1JlbG9hZCgpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnJlbG9hZE9mZmVycyA9IHRydWU7ICAgIFxuICB9XG5cbiAgb25SZWNlaXZlZE9mZmVyVGFwKG9mZmVyKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIGlkOiBvZmZlci5pZFxuICAgICAgfSxcbiAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoT2ZmZXJQYW5lbENvbXBvbmVudCwgb3B0aW9ucylcbiAgICAgIC50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdC5hY3Rpb24pIHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZU9mZmVyKHJlc3VsdC52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pOyAgICBcbiAgfSAgXG5cbiAgcHVibGljIHVwZGF0ZU9mZmVyKG9mZmVyKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kYXRhSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9kYXRhSXRlbXMuZ2V0SXRlbShpKS5pZCA9PSBvZmZlci5pZCkge1xuICAgICAgICB0aGlzLl9kYXRhSXRlbXMuc2V0SXRlbShpLCBvZmZlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMub25VcGRhdGVkKHRoaXMuX2RhdGFJdGVtcy5zbGljZSgwLCB0aGlzLl9kYXRhSXRlbXMubGVuZ3RoKSk7XG4gIH0gICBcblxuICBvblVwZGF0ZWQob2ZmZXJzKTogdm9pZCB7XG4gICAgdGhpcy5jYWNoZVNlcnZpY2Uuc3RvcmUoXCJvZmZlcnNcIiwgb2ZmZXJzKTtcbiAgfSAgIFxufVxuIl19