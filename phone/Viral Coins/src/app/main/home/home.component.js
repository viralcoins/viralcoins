"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("nativescript-angular/router");
var config_1 = require("../../config");
var user_service_1 = require("../../services/user.service");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var send_message_component_1 = require("../send-message/send-message.component");
var offer_panel_component_1 = require("../../more/offer-panel/offer-panel.component");
var list_view_component_1 = require("../../components/list-view.component");
var Admob = require("nativescript-admob");
var loading_service_1 = require("../../services/loading.service");
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(page, vcRef, modal, routerExtensions, userService, cacheService, coinService, loadingService) {
        var _this_1 = _super.call(this, loadingService) || this;
        _this_1.page = page;
        _this_1.vcRef = vcRef;
        _this_1.modal = modal;
        _this_1.routerExtensions = routerExtensions;
        _this_1.userService = userService;
        _this_1.cacheService = cacheService;
        _this_1.coinService = coinService;
        _this_1.loadingService = loadingService;
        _this_1.templateSelectorFunction = function (item, index, items) {
            return item.type == "empty" ? "empty" : item.type;
        };
        page.actionBarHidden = true;
        return _this_1;
    }
    HomeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.page.actionBarHidden = true;
        this.load();
        // const _this = this;
        // setTimeout(function() {
        //   _this.createBanner();
        // }, 1000);
    };
    HomeComponent.prototype.getData = function () {
        return this.userService.feed();
    };
    HomeComponent.prototype.onCellSwiping = function (args) { };
    HomeComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var rightItem = swipeView.getViewById('delete-view');
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    };
    HomeComponent.prototype.onSwipeCellFinished = function (args) {
    };
    HomeComponent.prototype.onRightSwipeClick = function (args) {
        var feedItem = args.object.bindingContext;
        this.dataItems.splice(this.dataItems.indexOf(feedItem), 1);
        if (this._dataItems.length == 0) {
            this._dataItems.push({ type: "empty" });
            this.cacheService.store("feed", []);
        }
        else {
            this.cacheService.store("feed", this._dataItems.slice(0, this._dataItems.length));
        }
        this.userService.deleteFeedItem(feedItem.id).subscribe();
    };
    HomeComponent.prototype.doReload = function () {
        this.userService.refreshFeed = true;
    };
    HomeComponent.prototype.onMessage = function () {
        var _this = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: true
        };
        this.modal.showModal(send_message_component_1.SendMessageComponent, options)
            .then(function (result) {
        });
    };
    HomeComponent.prototype.onOfferTap = function (offer) {
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
        });
    };
    HomeComponent.prototype.onOfferAcceptedTap = function (item) {
        this.routerExtensions.navigate(['/main/payment']);
    };
    HomeComponent.prototype.onFindTap = function () {
        this.routerExtensions.navigate(['/main/find']);
    };
    HomeComponent.prototype.onBuyTap = function () {
        this.coinService.reloadSaleCoins = true;
        this.routerExtensions.navigate(['/trade'], {
            transition: {
                name: 'slideLeft'
            }
        });
    };
    HomeComponent.prototype.onNotificationTap = function (item) {
        console.log(item.data);
    };
    HomeComponent.prototype.createBanner = function () {
        Admob.createBanner({
            testing: true,
            size: Admob.AD_SIZE.BANNER,
            iosBannerId: config_1.Config.iosBannerId,
            androidBannerId: config_1.Config.androidBannerId,
            iosTestDeviceIds: ["8dd6f211135fabd3fed1a3c8d40e485bdb597255"],
            margins: {
                bottom: 60
            }
        }).then(function () {
            console.log("admob createBanner done");
        }, function (error) {
            console.log("admob createBanner error: " + error);
        });
    };
    HomeComponent.prototype.hideBanner = function () {
        Admob.hideBanner().then(function () {
            console.log("admob hideBanner done");
        }, function (error) {
            console.log("admob hideBanner error: " + error);
        });
    };
    HomeComponent.prototype.createInterstitial = function () {
        Admob.createInterstitial({
            testing: true,
            iosInterstitialId: config_1.Config.iosInterstitialId,
            androidInterstitialId: config_1.Config.androidInterstitialId,
            iosTestDeviceIds: ["8dd6f211135fabd3fed1a3c8d40e485bdb597255"]
        }).then(function () {
            console.log("admob createInterstitial done");
        }, function (error) {
            console.log("admob createInterstitial error: " + error);
        });
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: "home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ['./home.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            router_1.RouterExtensions,
            user_service_1.UserService,
            cache_service_1.CacheService,
            coin_service_1.CoinService,
            loading_service_1.LoadingService])
    ], HomeComponent);
    return HomeComponent;
}(list_view_component_1.ListViewComponent));
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4RztBQUU5RyxnQ0FBK0I7QUFDL0IsbUVBQWlHO0FBRWpHLHNEQUErRDtBQUMvRCx1Q0FBc0M7QUFHdEMsNERBQTBEO0FBQzFELDREQUEwRDtBQUMxRCw4REFBNEQ7QUFDNUQsaUZBQThFO0FBQzlFLHNGQUFtRjtBQUNuRiw0RUFBeUU7QUFFekUsMENBQTRDO0FBQzVDLGtFQUFnRTtBQVFoRTtJQUFtQyxpQ0FBaUI7SUFHbEQsdUJBQ1UsSUFBVSxFQUNWLEtBQXVCLEVBQ3ZCLEtBQXlCLEVBQ3pCLGdCQUFrQyxFQUNsQyxXQUF3QixFQUN4QixZQUEwQixFQUMxQixXQUF3QixFQUN6QixjQUE4QjtRQVJ2QyxjQVVFLGtCQUFNLGNBQWMsQ0FBQyxTQUV0QjtRQVhTLFlBQUksR0FBSixJQUFJLENBQU07UUFDVixhQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixhQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUN6Qix3QkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLG1CQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLG9CQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLG1CQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pCLHNCQUFjLEdBQWQsY0FBYyxDQUFnQjtRQThDaEMsZ0NBQXdCLEdBQUcsVUFBQyxJQUFTLEVBQUUsS0FBYSxFQUFFLEtBQVU7WUFDckUsT0FBTyxJQUFJLENBQUMsSUFBSSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3BELENBQUMsQ0FBQTtRQTdDQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7SUFDOUIsQ0FBQztJQUVELGdDQUFRLEdBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztR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aUIsR0F5Sm5EO0FBekpZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkV4dHJhcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcbmltcG9ydCB7IExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC11aS1saXN0dmlld1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uLy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBWaWV3IH0gZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91aS9jb3JlL3ZpZXcnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvaW4uc2VydmljZSc7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlbmRNZXNzYWdlQ29tcG9uZW50IH0gZnJvbSAnLi4vc2VuZC1tZXNzYWdlL3NlbmQtbWVzc2FnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2ZmZXJQYW5lbENvbXBvbmVudCB9IGZyb20gJy4uLy4uL21vcmUvb2ZmZXItcGFuZWwvb2ZmZXItcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9saXN0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCAqIGFzIEFkbW9iIGZyb20gXCJuYXRpdmVzY3JpcHQtYWRtb2JcIjtcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImhvbWVcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogWycuL2hvbWUuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhvbWVDb21wb25lbnQgZXh0ZW5kcyBMaXN0Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHByaXZhdGUgcmlnaHRUaHJlc2hvbGRQYXNzZWQ6IGJvb2xlYW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlLFxuICAgIHB1YmxpYyBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIobG9hZGluZ1NlcnZpY2UpO1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgdGhpcy5sb2FkKCk7XG4gICAgLy8gY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgLy8gICBfdGhpcy5jcmVhdGVCYW5uZXIoKTtcbiAgICAvLyB9LCAxMDAwKTtcbiAgfSAgXG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy51c2VyU2VydmljZS5mZWVkKCk7XG4gIH1cblxuICBwdWJsaWMgb25DZWxsU3dpcGluZyhhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge31cblxuICBwdWJsaWMgb25Td2lwZUNlbGxTdGFydGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgY29uc3Qgc3dpcGVMaW1pdHMgPSBhcmdzLmRhdGEuc3dpcGVMaW1pdHM7XG4gICAgY29uc3Qgc3dpcGVWaWV3ID0gYXJnc1snb2JqZWN0J107XG4gICAgY29uc3QgcmlnaHRJdGVtID0gc3dpcGVWaWV3LmdldFZpZXdCeUlkPFZpZXc+KCdkZWxldGUtdmlldycpO1xuICAgIHN3aXBlTGltaXRzLmxlZnQgPSAwO1xuICAgIHN3aXBlTGltaXRzLnJpZ2h0ID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKTtcbiAgICBzd2lwZUxpbWl0cy50aHJlc2hvbGQgPSByaWdodEl0ZW0uZ2V0TWVhc3VyZWRXaWR0aCgpIC8gMjtcbiAgfVxuXG4gIHB1YmxpYyBvblN3aXBlQ2VsbEZpbmlzaGVkKGFyZ3M6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gIH1cblxuICBwdWJsaWMgb25SaWdodFN3aXBlQ2xpY2soYXJncykge1xuICBcdGNvbnN0IGZlZWRJdGVtID0gYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdGhpcy5kYXRhSXRlbXMuc3BsaWNlKHRoaXMuZGF0YUl0ZW1zLmluZGV4T2YoZmVlZEl0ZW0pLCAxKTtcbiAgICBpZiAodGhpcy5fZGF0YUl0ZW1zLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLl9kYXRhSXRlbXMucHVzaCh7dHlwZTogXCJlbXB0eVwifSk7XG4gICAgICB0aGlzLmNhY2hlU2VydmljZS5zdG9yZShcImZlZWRcIiwgW10pO1xuICAgIH0gZWxzZSB7XG4gICAgXHR0aGlzLmNhY2hlU2VydmljZS5zdG9yZShcImZlZWRcIiwgdGhpcy5fZGF0YUl0ZW1zLnNsaWNlKDAsIHRoaXMuX2RhdGFJdGVtcy5sZW5ndGgpKTtcbiAgICB9XG4gICAgdGhpcy51c2VyU2VydmljZS5kZWxldGVGZWVkSXRlbShmZWVkSXRlbS5pZCkuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwdWJsaWMgdGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uID0gKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PSBcImVtcHR5XCIgPyBcImVtcHR5XCIgOiBpdGVtLnR5cGU7XG4gIH1cblxuICBwdWJsaWMgZG9SZWxvYWQoKTogdm9pZCB7XG4gICAgdGhpcy51c2VyU2VydmljZS5yZWZyZXNoRmVlZCA9IHRydWU7XG4gIH1cblxuICBvbk1lc3NhZ2UoKSB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICBjb250ZXh0OiB7fSxcbiAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoU2VuZE1lc3NhZ2VDb21wb25lbnQsIG9wdGlvbnMpXG4gICAgICAudGhlbigocmVzdWx0KSA9PiB7XG5cbiAgICAgIH0pOyAgICBcbiAgfVxuXG4gIG9uT2ZmZXJUYXAob2ZmZXIpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgIFx0aWQ6IG9mZmVyLmlkXG4gICAgICB9LFxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChPZmZlclBhbmVsQ29tcG9uZW50LCBvcHRpb25zKVxuICAgICAgLnRoZW4oKHJlc3VsdCkgPT4ge1xuXG4gICAgICB9KTsgIFx0XG4gIH1cblxuICBvbk9mZmVyQWNjZXB0ZWRUYXAoaXRlbSkge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9tYWluL3BheW1lbnQnXSk7XG4gIH1cblxuICBvbkZpbmRUYXAoKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL21haW4vZmluZCddKTsgICAgXG4gIH1cblxuICBvbkJ1eVRhcCgpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnJlbG9hZFNhbGVDb2lucyA9IHRydWU7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL3RyYWRlJ10sIHtcbiAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgbmFtZTogJ3NsaWRlTGVmdCdcbiAgICAgIH1cbiAgICB9KTsgICAgXG4gIH1cblxuICBvbk5vdGlmaWNhdGlvblRhcChpdGVtKSB7XG4gICAgY29uc29sZS5sb2coaXRlbS5kYXRhKTtcbiAgfVxuXG4gIHB1YmxpYyBjcmVhdGVCYW5uZXIoKSB7XG4gICAgQWRtb2IuY3JlYXRlQmFubmVyKHtcbiAgICAgIHRlc3Rpbmc6IHRydWUsXG4gICAgICBzaXplOiBBZG1vYi5BRF9TSVpFLkJBTk5FUixcbiAgICAgIGlvc0Jhbm5lcklkOiBDb25maWcuaW9zQmFubmVySWQsXG4gICAgICBhbmRyb2lkQmFubmVySWQ6IENvbmZpZy5hbmRyb2lkQmFubmVySWQsXG4gICAgICBpb3NUZXN0RGV2aWNlSWRzOiBbXCI4ZGQ2ZjIxMTEzNWZhYmQzZmVkMWEzYzhkNDBlNDg1YmRiNTk3MjU1XCJdLFxuICAgICAgbWFyZ2luczoge1xuICAgICAgICBib3R0b206IDYwXG4gICAgICB9XG4gICAgfSkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlQmFubmVyIGRvbmVcIik7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgY3JlYXRlQmFubmVyIGVycm9yOiBcIiArIGVycm9yKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoaWRlQmFubmVyKCkge1xuICAgIEFkbW9iLmhpZGVCYW5uZXIoKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBoaWRlQmFubmVyIGRvbmVcIik7XG4gICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiYWRtb2IgaGlkZUJhbm5lciBlcnJvcjogXCIgKyBlcnJvcik7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlSW50ZXJzdGl0aWFsKCkge1xuICAgIEFkbW9iLmNyZWF0ZUludGVyc3RpdGlhbCh7XG4gICAgICB0ZXN0aW5nOiB0cnVlLFxuICAgICAgaW9zSW50ZXJzdGl0aWFsSWQ6IENvbmZpZy5pb3NJbnRlcnN0aXRpYWxJZCxcbiAgICAgIGFuZHJvaWRJbnRlcnN0aXRpYWxJZDogQ29uZmlnLmFuZHJvaWRJbnRlcnN0aXRpYWxJZCxcbiAgICAgIGlvc1Rlc3REZXZpY2VJZHM6IFtcIjhkZDZmMjExMTM1ZmFiZDNmZWQxYTNjOGQ0MGU0ODViZGI1OTcyNTVcIl1cbiAgICB9KS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBjcmVhdGVJbnRlcnN0aXRpYWwgZG9uZVwiKTtcbiAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coXCJhZG1vYiBjcmVhdGVJbnRlcnN0aXRpYWwgZXJyb3I6IFwiICsgZXJyb3IpO1xuICAgIH0pO1xuICB9XG59XG4iXX0=