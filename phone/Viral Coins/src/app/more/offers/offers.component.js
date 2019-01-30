"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var offer_panel_component_1 = require("../offer-panel/offer-panel.component");
var router_1 = require("nativescript-angular/router");
var page_1 = require("ui/page");
var OffersComponent = /** @class */ (function () {
    function OffersComponent(coinService, cacheService, modal, vcRef, page, routerExtensions) {
        this.coinService = coinService;
        this.cacheService = cacheService;
        this.modal = modal;
        this.vcRef = vcRef;
        this.page = page;
        this.routerExtensions = routerExtensions;
        this.templateSelectorFunction = function (item, index, items) {
            return item.type;
        };
        page.actionBarHidden = true;
    }
    OffersComponent.prototype.ngOnInit = function () {
        this._offerItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.loadOffers();
    };
    Object.defineProperty(OffersComponent.prototype, "offerItems", {
        get: function () {
            return this._offerItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(OffersComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    OffersComponent.prototype.loadOffers = function () {
        var _this_1 = this;
        this.coinService.getOffers().subscribe(function (offers) {
            _this_1._offerItems.splice(0);
            if (offers.length > 0) {
                for (var _i = 0, offers_1 = offers; _i < offers_1.length; _i++) {
                    var offer = offers_1[_i];
                    _this_1._offerItems.push(offer);
                }
            }
            else {
                _this_1._offerItems.push({ type: 'empty' });
            }
            _this_1.myActivityListView.listView.notifyPullToRefreshFinished();
        });
    };
    OffersComponent.prototype.onPullToRefreshMyActivityInitiated = function ($event) {
        var _this = this;
        setTimeout(function () {
            _this.coinService.reloadOffers = true;
            _this.loadOffers();
        }, 1000);
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
        for (var i = 0; i < this._offerItems.length; i++) {
            if (this._offerItems.getItem(i).id == offer.id) {
                this._offerItems.setItem(i, offer);
            }
        }
        this.onUpdated(this._offerItems.slice(0, this._offerItems.length));
    };
    OffersComponent.prototype.onUpdated = function (offers) {
        this.cacheService.store("offers", offers);
    };
    __decorate([
        core_1.ViewChild('myActivityListView'),
        __metadata("design:type", Object)
    ], OffersComponent.prototype, "myActivityListView", void 0);
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
            router_1.RouterExtensions])
    ], OffersComponent);
    return OffersComponent;
}());
exports.OffersComponent = OffersComponent;
