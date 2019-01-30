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
