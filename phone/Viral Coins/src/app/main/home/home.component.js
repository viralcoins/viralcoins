"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var router_1 = require("nativescript-angular/router");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var timer_1 = require("tns-core-modules/timer");
var user_service_1 = require("../../services/user.service");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var send_message_component_1 = require("../send-message/send-message.component");
var offer_panel_component_1 = require("../../more/offer-panel/offer-panel.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(page, vcRef, modal, routerExtensions, userService, _changeDetectionRef, cacheService, coinService) {
        var _this_1 = this;
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this._changeDetectionRef = _changeDetectionRef;
        this.cacheService = cacheService;
        this.coinService = coinService;
        this.templateSelectorFunction = function (item, index, items) {
            return _this_1._dataItems.getItem(0) == "empty" ? "empty" : item.type;
        };
        this.page.actionBarHidden = true;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.load();
    };
    HomeComponent.prototype.load = function () {
        var _this_1 = this;
        this.userService.feed().subscribe(function (feed) {
            _this_1._dataItems.splice(0);
            if (feed.length > 0) {
                for (var _i = 0, feed_1 = feed; _i < feed_1.length; _i++) {
                    var feedItem = feed_1[_i];
                    _this_1._dataItems.push(feedItem);
                }
            }
            else {
                _this_1._dataItems.push("empty");
            }
            _this_1.listView.nativeElement.notifyPullToRefreshFinished();
        });
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
            this._dataItems.push("empty");
            this.cacheService.store("feed", []);
        }
        else {
            this.cacheService.store("feed", this._dataItems.slice(0, this._dataItems.length));
        }
        this.userService.deleteFeedItem(feedItem.id).subscribe();
    };
    Object.defineProperty(HomeComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        timer_1.setTimeout(function () {
            _this.userService.refreshFeed = true;
            _this.load();
        }, 1000);
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
    __decorate([
        core_1.ViewChild('listView'),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "listView", void 0);
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
            core_1.ChangeDetectorRef,
            cache_service_1.CacheService,
            coin_service_1.CoinService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
