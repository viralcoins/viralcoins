"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var operators_1 = require("rxjs/operators");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var coin_service_1 = require("../../services/coin.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var BottomNavigationComponent = /** @class */ (function () {
    function BottomNavigationComponent(barcodeScanner, coinService, router, routerExtensions) {
        this.barcodeScanner = barcodeScanner;
        this.coinService = coinService;
        this.router = router;
        this.routerExtensions = routerExtensions;
        this.onStartScan = new core_1.EventEmitter();
        this.onEndScan = new core_1.EventEmitter();
        this.selectedTab = 0;
        this._activatedUrl = '/main/home';
        this.code = "";
    }
    BottomNavigationComponent.prototype.selectTab = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });
    };
    BottomNavigationComponent.prototype.updateTab = function (url) {
        if (url.indexOf('main') != -1) {
            this._activatedUrl = url;
        }
    };
    BottomNavigationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            setTimeout(function () {
                _this.updateTab(event.urlAfterRedirects);
            }, 150);
        });
    };
    BottomNavigationComponent.prototype.isComponentSelected = function (url) {
        return this._activatedUrl === url;
    };
    BottomNavigationComponent.prototype.onScanTap = function () {
        this.openBarcodeScanner();
    };
    BottomNavigationComponent.prototype.openBarcodeScanner = function () {
        var _this_1 = this;
        this.barcodeScanner.scan({
            formats: "QR_CODE, EAN_13",
            // cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
            cancelLabelBackgroundColor: "#333333",
            message: "Use the volume buttons for extra light",
            showFlipCameraButton: true,
            preferFrontCamera: false,
            showTorchButton: true,
            beepOnScan: true,
            torchOn: false,
            closeCallback: function () { console.log("Scanner closed"); },
            // resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
            // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
            openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
        }).then(function (result) {
            console.log(result.text);
            _this_1.handleCode(result.text);
        }, function (errorMessage) {
            console.log("No scan. " + errorMessage);
        });
    };
    BottomNavigationComponent.prototype.showDialog = function (title, message, buttonText) {
        return dialogs.alert({
            title: title,
            message: message,
            okButtonText: buttonText
        });
    };
    BottomNavigationComponent.prototype.handleCode = function (text) {
        var _this_1 = this;
        var regex = new RegExp("[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}");
        if (regex.test(text)) {
            this.onStartScan.emit();
            var match = text.match(regex);
            var code_1 = "";
            if (match) {
                code_1 = match[0];
            }
            this.code = code_1;
            this.coinService.load(code_1).subscribe(function (coin) {
                var claimed = coin.claimed;
                _this_1.coinService.claim(code_1).subscribe(function (coin) {
                    _this_1.code = "";
                    _this_1.coinService.reloadCoins = true;
                    if (claimed) {
                        _this_1.showDialog("Success!", "You have promoted this coin.", "OK");
                    }
                    else {
                        _this_1.coinService.reloadWallet = true;
                        _this_1.showDialog("Success!", "The coin has been added to your wallet.", "OK").then(function () {
                            if (coin.hasPrize) {
                                _this_1.showDialog("Congratulations!", "You have found a prize coin. Head over to your wallet to redeem your prize.", "OK");
                            }
                        });
                    }
                    _this_1.coin = coin;
                    _this_1.onEndScan.emit();
                }, function () {
                    _this_1.handleError();
                });
            }, function () {
                _this_1.handleError();
            });
        }
        else {
            this.handleError();
        }
    };
    BottomNavigationComponent.prototype.handleError = function () {
        this.showDialog("Error!", "Invalid QR Code", "OK");
        this.code = "";
        this.onEndScan.emit();
    };
    __decorate([
        core_1.ViewChild('tabHighlight'),
        __metadata("design:type", core_1.ElementRef)
    ], BottomNavigationComponent.prototype, "tabHighlight", void 0);
    __decorate([
        core_1.Output('onStartScan'),
        __metadata("design:type", Object)
    ], BottomNavigationComponent.prototype, "onStartScan", void 0);
    __decorate([
        core_1.Output('onEndScan'),
        __metadata("design:type", Object)
    ], BottomNavigationComponent.prototype, "onEndScan", void 0);
    BottomNavigationComponent = __decorate([
        core_1.Component({
            selector: "app-bottom-navigation",
            moduleId: module.id,
            templateUrl: "./bottom-navigation.component.html",
            styleUrls: ['./bottom-navigation.component.css'],
            providers: [nativescript_barcodescanner_1.BarcodeScanner]
        }),
        __metadata("design:paramtypes", [nativescript_barcodescanner_1.BarcodeScanner,
            coin_service_1.CoinService,
            router_1.Router,
            router_2.RouterExtensions])
    ], BottomNavigationComponent);
    return BottomNavigationComponent;
}());
exports.BottomNavigationComponent = BottomNavigationComponent;
