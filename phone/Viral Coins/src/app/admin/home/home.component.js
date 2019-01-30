"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var create_component_1 = require("../create/create.component");
var coin_detail_component_1 = require("../coin-detail/coin-detail.component");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var router_1 = require("nativescript-angular/router");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(coinService, page, vcRef, modal, barcodeScanner, routerExtensions) {
        this.coinService = coinService;
        this.page = page;
        this.vcRef = vcRef;
        this.modal = modal;
        this.barcodeScanner = barcodeScanner;
        this.routerExtensions = routerExtensions;
        this.code = "";
        this.templateSelectorFunction = function (item, index, items) {
            return item.code != null ? 'coin' : 'empty';
        };
        this.page.actionBarHidden = true;
    }
    HomeComponent.prototype.load = function () {
        var _this_1 = this;
        this.coinService.all()
            .subscribe(function (coins) {
            _this_1._dataItems.splice(0);
            if (coins.length > 0) {
                for (var _i = 0, coins_1 = coins; _i < coins_1.length; _i++) {
                    var coin = coins_1[_i];
                    _this_1._dataItems.push(coin);
                }
            }
            else {
                _this_1._dataItems.push({ code: null });
            }
            _this_1.listView.nativeElement.notifyPullToRefreshFinished();
        });
    };
    HomeComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        setTimeout(function () {
            var listView = args.object;
            _this.coinService.reloadAllCoins = true;
            _this.load();
            listView.notifyPullToRefreshFinished();
        }, 1000);
    };
    HomeComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.load();
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
    HomeComponent.prototype.onAddTap = function () {
        var _this_1 = this;
        var _this = this;
        this.scanBarcode().then(function (code) {
            _this_1.code = code;
            setTimeout(function () {
                _this.openCreate(_this.code);
            }, 1000);
        });
    };
    HomeComponent.prototype.openCreate = function (code) {
        var _this_1 = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: {
                code: code
            },
            fullscreen: true
        };
        this.modal.showModal(create_component_1.CreateComponent, options)
            .then(function () {
            _this_1.code = "";
            _this_1.coinService.reloadAllCoins = true;
            _this_1.load();
        });
    };
    HomeComponent.prototype.openCoin = function (coin) {
        var _this_1 = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: coin,
            fullscreen: true
        };
        this.modal.showModal(coin_detail_component_1.CoinDetailComponent, options)
            .then(function () {
            _this_1.coinService.reloadAllCoins = true;
            _this_1.load();
        });
    };
    HomeComponent.prototype.scanBarcode = function () {
        var _this_1 = this;
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this_1.barcodeScanner.scan({
                formats: "QR_CODE, EAN_13",
                // cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
                cancelLabelBackgroundColor: "#333333",
                message: "Use the volume buttons for extra light",
                showFlipCameraButton: true,
                preferFrontCamera: false,
                showTorchButton: true,
                beepOnScan: true,
                torchOn: false,
                closeCallback: function () { },
                // resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
                // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
                openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
            }).then(function (result) {
                console.log("Result Fired");
                resolve(_this_1.handleCode(result.text));
            }, function (errorMessage) {
                console.log("No scan. " + errorMessage);
            });
        });
    };
    HomeComponent.prototype.handleCode = function (text) {
        var regex = new RegExp("[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}");
        if (regex.test(text)) {
            var match = text.match(regex);
            var code = "";
            if (match) {
                code = match[0];
            }
            return code;
        }
        return "";
    };
    HomeComponent.prototype.createCode = function () {
        var output = "";
        var valid = "0123456789ABCDEFGHIJKLMOPQRSTUVWXYZ";
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                var index = Math.floor(Math.random() * valid.length);
                var character = valid.substr(index, 1);
                output += character;
            }
            if (i < 3) {
                output += "-";
            }
        }
        return output;
    };
    HomeComponent.prototype.onGenerateTap = function () {
        this.code = this.createCode();
    };
    HomeComponent.prototype.coinDrop = function () {
        this.coinService.coinDrop().subscribe(function () {
            alert("Coin Dropped!");
        });
    };
    HomeComponent.prototype.onItemTap = function (coin) {
        this.openCoin(coin);
    };
    __decorate([
        core_1.ViewChild('listView'),
        __metadata("design:type", Object)
    ], HomeComponent.prototype, "listView", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "admin-home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"],
            providers: [nativescript_barcodescanner_1.BarcodeScanner]
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            page_1.Page,
            core_1.ViewContainerRef,
            dialogs_1.ModalDialogService,
            nativescript_barcodescanner_1.BarcodeScanner,
            router_1.RouterExtensions])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
