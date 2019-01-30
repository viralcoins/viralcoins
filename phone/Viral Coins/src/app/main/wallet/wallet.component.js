"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var page_1 = require("ui/page");
var help_component_1 = require("../../components/help/help.component");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var SocialShare = require("nativescript-social-share");
var image_source_1 = require("image-source");
var detail_modal_component_1 = require("../detail-modal/detail-modal.component");
var redeem_component_1 = require("../redeem/redeem.component");
var config_1 = require("../../config");
var router_1 = require("nativescript-angular/router");
var timer_1 = require("tns-core-modules/timer");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var WalletComponent = /** @class */ (function () {
    function WalletComponent(coinService, page, routerExtensions, modal, vcRef, cacheService) {
        this.coinService = coinService;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.modal = modal;
        this.vcRef = vcRef;
        this.cacheService = cacheService;
        this.totalValue = 0;
        this.percentage = 0;
        this.templateSelectorFunction = function (item, index, items) {
            return item.code != null ? 'coin' : 'empty';
        };
        this.page.actionBarHidden = true;
    }
    WalletComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.load();
    };
    Object.defineProperty(WalletComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WalletComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    WalletComponent.prototype.load = function () {
        var _this_1 = this;
        this.coinService.loadWallet()
            .subscribe(function (wallet) {
            _this_1.wallet = wallet;
            _this_1._dataItems.splice(0);
            if (wallet.coins.length > 0) {
                for (var _i = 0, _a = wallet.coins; _i < _a.length; _i++) {
                    var coin = _a[_i];
                    _this_1._dataItems.push(coin);
                }
            }
            else {
                _this_1._dataItems.push({ code: null });
            }
            _this_1.listView.nativeElement.notifyPullToRefreshFinished();
        });
    };
    WalletComponent.prototype.onFindTap = function () {
        this.routerExtensions.navigate(['/main/find']);
    };
    WalletComponent.prototype.onBuyTap = function () {
        this.routerExtensions.navigate(['/trade'], {
            transition: {
                name: 'slideLeft'
            }
        });
    };
    WalletComponent.prototype.onHelpTap = function () {
        var helpText = "Your wallet displays which coins you own as well as the total value of those coins. Once a coin is found and claimed it will show up here.";
        var options = {
            viewContainerRef: this.vcRef,
            context: {
                header: "Wallet",
                content: helpText
            },
            fullscreen: true
        };
        this.modal.showModal(help_component_1.HelpComponent, options)
            .then(function () {
            console.log("");
        });
    };
    WalletComponent.prototype.onUpdated = function (coins) {
        this.wallet.coins = coins;
        this.cacheService.store("wallet", this.wallet);
    };
    WalletComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        timer_1.setTimeout(function () {
            var listView = args.object;
            _this.coinService.reloadWallet = true;
            _this.load();
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    WalletComponent.prototype.onItemTap = function (coin) {
        var _this_1 = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: coin,
            fullscreen: true
        };
        this.modal.showModal(detail_modal_component_1.DetailModalComponent, options)
            .then(function (result) {
            if (result) {
                switch (result.action) {
                    case "share":
                        image_source_1.fromUrl(config_1.Config.apiUrl + "/coin/" + result.value + "/qr?size=4").then(function (image) {
                            SocialShare.shareImage(image);
                        });
                        break;
                    case "close":
                        _this_1.updateCoin(result.value);
                        break;
                }
            }
        });
    };
    WalletComponent.prototype.onRedeemTap = function (coin) {
        var options = {
            viewContainerRef: this.vcRef,
            context: coin,
            fullscreen: true
        };
        this.modal.showModal(redeem_component_1.RedeemComponent, options)
            .then(function (result) { });
    };
    WalletComponent.prototype.updateCoin = function (coin) {
        for (var i = 0; i < this._dataItems.length; i++) {
            if (this._dataItems.getItem(i).id == coin.id) {
                this._dataItems.setItem(i, coin);
            }
        }
        this.onUpdated(this._dataItems.slice(0, this._dataItems.length));
    };
    __decorate([
        core_1.ViewChild('listView'),
        __metadata("design:type", Object)
    ], WalletComponent.prototype, "listView", void 0);
    WalletComponent = __decorate([
        core_1.Component({
            selector: "wallet",
            moduleId: module.id,
            templateUrl: "./wallet.component.html",
            styleUrls: ['./wallet.component.css']
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            page_1.Page,
            router_1.RouterExtensions,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            cache_service_1.CacheService])
    ], WalletComponent);
    return WalletComponent;
}());
exports.WalletComponent = WalletComponent;
