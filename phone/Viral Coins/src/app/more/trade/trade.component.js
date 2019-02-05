"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var TradeComponent = /** @class */ (function () {
    function TradeComponent(coinService, cacheService, modal, vcRef, page, routerExtensions) {
        this.coinService = coinService;
        this.cacheService = cacheService;
        this.modal = modal;
        this.vcRef = vcRef;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.templateSelectorFunction = function (item, index, items) {
            if (item.price != null) {
                return 'sale';
            }
            return item.code != null ? 'coin' : 'empty';
        };
        page.actionBarHidden = true;
    }
    TradeComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this._coinItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.loadAvailable();
    };
    Object.defineProperty(TradeComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TradeComponent.prototype, "coinItems", {
        get: function () {
            return this._coinItems;
        },
        enumerable: true,
        configurable: true
    });
    TradeComponent.prototype.loadAvailable = function () {
        var _this_1 = this;
        this.coinService.sale().subscribe(function (coins) {
            _this_1._coinItems.splice(0);
            if (coins.length > 0) {
                for (var _i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
                    var coin = coins_1[_i];
                    _this_1._coinItems.push(coin);
                }
            }
            else {
                _this_1._coinItems.push({ value: null });
            }
            _this_1.mySaleListView.listView.notifyPullToRefreshFinished();
        });
    };
    TradeComponent.prototype.onItemTap = function (coin) {
        var navigationExtras = {
            queryParams: {
                "coinId": coin.id,
                "price": coin.price
            }
        };
        this.routerExtensions.navigate(['/payment'], navigationExtras);
        // const options: ModalDialogOptions = {
        //   viewContainerRef: this.vcRef,
        //   context: coin,
        //   fullscreen: true
        // };
        // this.modal.showModal(TradePanelComponent, options)
        //   .then((result: any) => {
        //   });
    };
    TradeComponent.prototype.onPullToRefreshSaleInitiated = function ($event) {
        var _this = this;
        setTimeout(function () {
            _this.coinService.reloadSaleCoins = true;
            _this.loadAvailable();
        }, 1000);
    };
    __decorate([
        core_1.ViewChild('mySaleListView'),
        __metadata("design:type", Object)
    ], TradeComponent.prototype, "mySaleListView", void 0);
    TradeComponent = __decorate([
        core_1.Component({
            selector: 'ns-trade',
            templateUrl: './trade.component.html',
            styleUrls: ['./trade.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            cache_service_1.CacheService,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            page_1.Page,
            router_1.RouterExtensions])
    ], TradeComponent);
    return TradeComponent;
}());
exports.TradeComponent = TradeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhZGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStFO0FBQy9FLDREQUEwRDtBQUMxRCw4REFBNEQ7QUFFNUQsbUVBQWlHO0FBRWpHLDJFQUF5RTtBQUV6RSxzREFBK0Q7QUFFL0QsZ0NBQStCO0FBUS9CO0lBTUUsd0JBQ1UsV0FBd0IsRUFDeEIsWUFBMEIsRUFDMUIsS0FBeUIsRUFDekIsS0FBdUIsRUFDdkIsSUFBVSxFQUNWLGdCQUFrQztRQUxsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6QixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQW9CckMsNkJBQXdCLEdBQUcsVUFBQyxJQUFTLEVBQUUsS0FBYSxFQUFFLEtBQVU7WUFDckUsSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDdEIsT0FBTyxNQUFNLENBQUM7YUFDZjtZQUNELE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQXZCQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksa0NBQWUsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsd0JBQXdCLENBQUM7UUFDdkQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxzQkFBSSw0Q0FBZ0I7YUFBcEI7WUFDRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBcUIsS0FBdUQ7WUFDMUUsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUNqQyxDQUFDOzs7T0FKQTtJQWFELHNCQUFJLHFDQUFTO2FBQWI7WUFDRSxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFTSxzQ0FBYSxHQUFwQjtRQUFBLG1CQVlDO1FBWEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO1lBQ3JDLE9BQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ3BCLEtBQWlCLFVBQUssRUFBTCxlQUFLLEVBQUwsbUJBQUssRUFBTCxJQUFLLEVBQUU7b0JBQW5CLElBQUksSUFBSSxjQUFBO29CQUNYLE9BQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjthQUNGO2lCQUFNO2dCQUNMLE9BQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7YUFDckM7WUFDRCxPQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLGtDQUFTLEdBQWhCLFVBQWlCLElBQUk7UUFDbkIsSUFBSSxnQkFBZ0IsR0FBcUI7WUFDdkMsV0FBVyxFQUFFO2dCQUNYLFFBQVEsRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLO2FBQ3BCO1NBQ0YsQ0FBQztRQUNGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9ELHdDQUF3QztRQUN4QyxrQ0FBa0M7UUFDbEMsbUJBQW1CO1FBQ25CLHFCQUFxQjtRQUNyQixLQUFLO1FBRUwscURBQXFEO1FBQ3JELDZCQUE2QjtRQUM3QixRQUFRO0lBQ1YsQ0FBQztJQUVNLHFEQUE0QixHQUFuQyxVQUFvQyxNQUFNO1FBQ3hDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixVQUFVLENBQUM7WUFDVCxLQUFLLENBQUMsV0FBVyxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDekMsS0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7SUFqRjRCO1FBQTVCLGdCQUFTLENBQUMsZ0JBQWdCLENBQUM7OzBEQUFnQjtJQURqQyxjQUFjO1FBTjFCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsVUFBVTtZQUNwQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQVF1QiwwQkFBVztZQUNWLDRCQUFZO1lBQ25CLDRCQUFrQjtZQUNsQix1QkFBZ0I7WUFDakIsV0FBSTtZQUNRLHlCQUFnQjtPQVpqQyxjQUFjLENBbUYxQjtJQUFELHFCQUFDO0NBQUEsQUFuRkQsSUFtRkM7QUFuRlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvaW4uc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3NlZ21lbnRlZC1iYXJcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcbmltcG9ydCB7IFRyYWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuLi90cmFkZS1wYW5lbC90cmFkZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBPZmZlclBhbmVsQ29tcG9uZW50IH0gZnJvbSAnLi4vb2ZmZXItcGFuZWwvb2ZmZXItcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXRyYWRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyYWRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJhZGUuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBUcmFkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ215U2FsZUxpc3RWaWV3JykgbXlTYWxlTGlzdFZpZXc7XG5cbiAgcHJpdmF0ZSBfY29pbkl0ZW1zOiBPYnNlcnZhYmxlQXJyYXk8YW55PjtcbiAgcHJpdmF0ZSBfdGVtcGxhdGVTZWxlY3RvcjogKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xuICApIHtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLl9jb2luSXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KCk7XG4gICAgdGhpcy5fdGVtcGxhdGVTZWxlY3RvciA9IHRoaXMudGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uO1xuICAgIHRoaXMubG9hZEF2YWlsYWJsZSgpO1xuICB9XG5cbiAgZ2V0IHRlbXBsYXRlU2VsZWN0b3IoKTogKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdGVtcGxhdGVTZWxlY3RvcjtcbiAgfVxuXG4gIHNldCB0ZW1wbGF0ZVNlbGVjdG9yKHZhbHVlOiAoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBpdGVtczogYW55KSA9PiBzdHJpbmcpIHtcbiAgICB0aGlzLl90ZW1wbGF0ZVNlbGVjdG9yID0gdmFsdWU7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uID0gKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgaWYgKGl0ZW0ucHJpY2UgIT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdzYWxlJztcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0uY29kZSAhPSBudWxsID8gJ2NvaW4nIDogJ2VtcHR5JztcbiAgfVxuXG4gIGdldCBjb2luSXRlbXMoKTogT2JzZXJ2YWJsZUFycmF5PGFueT4ge1xuICAgIHJldHVybiB0aGlzLl9jb2luSXRlbXM7XG4gIH1cblxuICBwdWJsaWMgbG9hZEF2YWlsYWJsZSgpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnNhbGUoKS5zdWJzY3JpYmUoY29pbnMgPT4geyAgICAgIFxuICAgICAgdGhpcy5fY29pbkl0ZW1zLnNwbGljZSgwKTtcbiAgICAgIGlmIChjb2lucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZvciAobGV0IGNvaW4gb2YgY29pbnMpIHtcbiAgICAgICAgICB0aGlzLl9jb2luSXRlbXMucHVzaChjb2luKTtcbiAgICAgICAgfSAgICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb2luSXRlbXMucHVzaCh7dmFsdWU6IG51bGx9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMubXlTYWxlTGlzdFZpZXcubGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgfSk7ICAgIFxuICB9XG5cbiAgcHVibGljIG9uSXRlbVRhcChjb2luKSB7XG4gICAgbGV0IG5hdmlnYXRpb25FeHRyYXM6IE5hdmlnYXRpb25FeHRyYXMgPSB7XG4gICAgICBxdWVyeVBhcmFtczoge1xuICAgICAgICBcImNvaW5JZFwiOiBjb2luLmlkLFxuICAgICAgICBcInByaWNlXCI6IGNvaW4ucHJpY2VcbiAgICAgIH1cbiAgICB9OyAgICBcbiAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvcGF5bWVudCddLCBuYXZpZ2F0aW9uRXh0cmFzKTtcbiAgICAvLyBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgLy8gICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgIC8vICAgY29udGV4dDogY29pbixcbiAgICAvLyAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICAvLyB9O1xuXG4gICAgLy8gdGhpcy5tb2RhbC5zaG93TW9kYWwoVHJhZGVQYW5lbENvbXBvbmVudCwgb3B0aW9ucylcbiAgICAvLyAgIC50aGVuKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgIC8vICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25QdWxsVG9SZWZyZXNoU2FsZUluaXRpYXRlZCgkZXZlbnQpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5jb2luU2VydmljZS5yZWxvYWRTYWxlQ29pbnMgPSB0cnVlO1xuICAgICAgX3RoaXMubG9hZEF2YWlsYWJsZSgpO1xuICAgIH0sIDEwMDApOyAgICBcbiAgfSBcbn1cbiJdfQ==