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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQStGO0FBQy9GLDBDQUF3RDtBQUN4RCxzREFBK0Q7QUFDL0QsNENBQXdDO0FBQ3hDLDJFQUE2RDtBQUM3RCw0REFBMEQ7QUFDMUQscURBQXVEO0FBV3ZEO0lBV0MsbUNBQ1csY0FBOEIsRUFDOUIsV0FBd0IsRUFDMUIsTUFBYyxFQUNkLGdCQUFrQztRQUhoQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDMUIsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNkLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFabkIsZ0JBQVcsR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUN4QyxjQUFTLEdBQUcsSUFBSSxtQkFBWSxFQUFPLENBQUM7UUFFakQsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDekIsa0JBQWEsR0FBVyxZQUFZLENBQUM7UUFDckMsU0FBSSxHQUFXLEVBQUUsQ0FBQztJQVExQixDQUFDO0lBRUEsNkNBQVMsR0FBVCxVQUFVLFlBQW9CO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM3QyxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2Q0FBUyxHQUFULFVBQVUsR0FBVztRQUNuQixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDN0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLENBQUM7U0FDMUI7SUFDSCxDQUFDO0lBRUYsNENBQVEsR0FBUjtRQUNHLElB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VTttRUFBQztJQUM3QjtRQUF0QixhQUFNLENBQUMsYUFBYSxDQUFDOztrRUFBdUM7SUFDeEM7UUFBcEIsYUFBTSxDQUFDLFdBQVcsQ0FBQzs7Z0VBQXFDO0lBSjlDLHlCQUF5QjtRQVByQyxnQkFBUyxDQUFDO1lBQ1YsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUMvQyxTQUFTLEVBQUUsQ0FBQyw0Q0FBYyxDQUFDO1NBQzVCLENBQUM7eUNBYTBCLDRDQUFjO1lBQ2pCLDBCQUFXO1lBQ2xCLGVBQU07WUFDSSx5QkFBZ0I7T0FmL0IseUJBQXlCLENBOEhyQztJQUFELGdDQUFDO0NBQUEsQUE5SEQsSUE4SEM7QUE5SFksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkVuZCwgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgQ29pblNlcnZpY2UgfSBmcm9tIFwiLi4vLi4vc2VydmljZXMvY29pbi5zZXJ2aWNlXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwicGxhdGZvcm1cIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcImFwcC1ib3R0b20tbmF2aWdhdGlvblwiLFxuXHRtb2R1bGVJZDogbW9kdWxlLmlkLFxuXHR0ZW1wbGF0ZVVybDogXCIuL2JvdHRvbS1uYXZpZ2F0aW9uLmNvbXBvbmVudC5odG1sXCIsXG5cdHN0eWxlVXJsczogWycuL2JvdHRvbS1uYXZpZ2F0aW9uLmNvbXBvbmVudC5jc3MnXSxcbiAgcHJvdmlkZXJzOiBbQmFyY29kZVNjYW5uZXJdXHRcbn0pXG5leHBvcnQgY2xhc3MgQm90dG9tTmF2aWdhdGlvbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZCgndGFiSGlnaGxpZ2h0JykgdGFiSGlnaGxpZ2h0OiBFbGVtZW50UmVmO1xuICBAT3V0cHV0KCdvblN0YXJ0U2NhbicpIG9uU3RhcnRTY2FuID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ29uRW5kU2NhbicpIG9uRW5kU2NhbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIHByaXZhdGUgc2VsZWN0ZWRUYWI6IG51bWJlciA9IDA7XG5cdHByaXZhdGUgX2FjdGl2YXRlZFVybDogc3RyaW5nID0gJy9tYWluL2hvbWUnO1xuICBwdWJsaWMgY29kZTogc3RyaW5nID0gXCJcIjtcbiAgY29pbjtcblxuXHRjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICBwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZSxcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuXHR9XG5cbiAgc2VsZWN0VGFiKG5hdkl0ZW1Sb3V0ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtuYXZJdGVtUm91dGVdLCB7XG4gICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgfSk7XG4gIH0gIFxuXG4gIHVwZGF0ZVRhYih1cmw6IHN0cmluZykge1xuICAgIGlmICh1cmwuaW5kZXhPZignbWFpbicpICE9IC0xKSB7XG4gICAgICB0aGlzLl9hY3RpdmF0ZWRVcmwgPSB1cmw7XG4gICAgfVxuICB9XG5cblx0bmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMucm91dGVyLmV2ZW50c1xuXHRcdFx0LnBpcGUoZmlsdGVyKChldmVudDogYW55KSA9PiBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FbmQpKVxuXHRcdFx0LnN1YnNjcmliZSgoZXZlbnQ6IE5hdmlnYXRpb25FbmQpID0+IHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBfdGhpcy51cGRhdGVUYWIoZXZlbnQudXJsQWZ0ZXJSZWRpcmVjdHMpO1xuICAgICAgICB9LCAxNTApO1xuICAgICAgfSk7XG5cdH1cblxuXHRpc0NvbXBvbmVudFNlbGVjdGVkKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2FjdGl2YXRlZFVybCA9PT0gdXJsO1xuXHR9XG5cbiAgb25TY2FuVGFwKCk6IHZvaWQge1xuICAgIHRoaXMub3BlbkJhcmNvZGVTY2FubmVyKCk7XG4gIH1cblxuICBvcGVuQmFyY29kZVNjYW5uZXIoKTogdm9pZCB7XG4gICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcbiAgICAgIGZvcm1hdHM6IFwiUVJfQ09ERSwgRUFOXzEzXCIsXG4gICAgICAvLyBjYW5jZWxMYWJlbDogXCJFWElULiBBbHNvLCB0cnkgdGhlIHZvbHVtZSBidXR0b25zIVwiLCAvLyBpT1Mgb25seSwgZGVmYXVsdCAnQ2xvc2UnXG4gICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXG4gICAgICBtZXNzYWdlOiBcIlVzZSB0aGUgdm9sdW1lIGJ1dHRvbnMgZm9yIGV4dHJhIGxpZ2h0XCIsIC8vIEFuZHJvaWQgb25seSwgZGVmYXVsdCBpcyAnUGxhY2UgYSBiYXJjb2RlIGluc2lkZSB0aGUgdmlld2ZpbmRlciByZWN0YW5nbGUgdG8gc2NhbiBpdC4nXG4gICAgICBzaG93RmxpcENhbWVyYUJ1dHRvbjogdHJ1ZSwgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBzaG93VG9yY2hCdXR0b246IHRydWUsICAgICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICBiZWVwT25TY2FuOiB0cnVlLCAgICAgICAgICAgICAvLyBQbGF5IG9yIFN1cHByZXNzIGJlZXAgb24gc2NhbiAoZGVmYXVsdCB0cnVlKVxuICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXG4gICAgICBjbG9zZUNhbGxiYWNrOiAoKSA9PiB7IGNvbnNvbGUubG9nKFwiU2Nhbm5lciBjbG9zZWRcIikgfSwgLy8gaW52b2tlZCB3aGVuIHRoZSBzY2FubmVyIHdhcyBjbG9zZWQgKHN1Y2Nlc3Mgb3IgYWJvcnQpXG4gICAgICAvLyByZXN1bHREaXNwbGF5RHVyYXRpb246IDUwMCwgICAvLyBBbmRyb2lkIG9ubHksIGRlZmF1bHQgMTUwMCAobXMpLCBzZXQgdG8gMCB0byBkaXNhYmxlIGVjaG9pbmcgdGhlIHNjYW5uZWQgdGV4dFxuICAgICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxuICAgICAgb3BlblNldHRpbmdzSWZQZXJtaXNzaW9uV2FzUHJldmlvdXNseURlbmllZDogdHJ1ZSAvLyBPbiBpT1MgeW91IGNhbiBzZW5kIHRoZSB1c2VyIHRvIHRoZSBzZXR0aW5ncyBhcHAgaWYgYWNjZXNzIHdhcyBwcmV2aW91c2x5IGRlbmllZFxuICAgIH0pLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzdWx0LnRleHQpO1xuICAgICAgdGhpcy5oYW5kbGVDb2RlKHJlc3VsdC50ZXh0KTtcbiAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcIk5vIHNjYW4uIFwiICsgZXJyb3JNZXNzYWdlKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc2hvd0RpYWxvZyh0aXRsZSwgbWVzc2FnZSwgYnV0dG9uVGV4dCkge1xuICAgIHJldHVybiBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICBva0J1dHRvblRleHQ6IGJ1dHRvblRleHRcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBoYW5kbGVDb2RlKHRleHQpIHtcbiAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKFwiWzAtOUEtWl17NH0tWzAtOUEtWl17NH0tWzAtOUEtWl17NH0tWzAtOUEtWl17NH1cIik7XG4gICAgaWYgKHJlZ2V4LnRlc3QodGV4dCkpIHtcbiAgICAgIHRoaXMub25TdGFydFNjYW4uZW1pdCgpO1xuICAgICAgbGV0IG1hdGNoID0gdGV4dC5tYXRjaChyZWdleCk7XG4gICAgICBsZXQgY29kZSA9IFwiXCI7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgY29kZSA9IG1hdGNoWzBdO1xuICAgICAgfVxuICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgIHRoaXMuY29pblNlcnZpY2UubG9hZChjb2RlKS5zdWJzY3JpYmUoY29pbiA9PiB7XG4gICAgICAgIGNvbnN0IGNsYWltZWQgPSBjb2luLmNsYWltZWQ7XG4gICAgICAgIHRoaXMuY29pblNlcnZpY2UuY2xhaW0oY29kZSkuc3Vic2NyaWJlKGNvaW4gPT4ge1xuICAgICAgICAgIHRoaXMuY29kZSA9IFwiXCI7XG4gICAgICAgICAgdGhpcy5jb2luU2VydmljZS5yZWxvYWRDb2lucyA9IHRydWU7ICAgICAgICAgIFxuICAgICAgICAgIGlmIChjbGFpbWVkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dEaWFsb2coXCJTdWNjZXNzIVwiLCBcIllvdSBoYXZlIHByb21vdGVkIHRoaXMgY29pbi5cIiwgXCJPS1wiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jb2luU2VydmljZS5yZWxvYWRXYWxsZXQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zaG93RGlhbG9nKFwiU3VjY2VzcyFcIiwgXCJUaGUgY29pbiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIHdhbGxldC5cIiwgXCJPS1wiKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgaWYgKGNvaW4uaGFzUHJpemUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dEaWFsb2coXCJDb25ncmF0dWxhdGlvbnMhXCIsIFwiWW91IGhhdmUgZm91bmQgYSBwcml6ZSBjb2luLiBIZWFkIG92ZXIgdG8geW91ciB3YWxsZXQgdG8gcmVkZWVtIHlvdXIgcHJpemUuXCIsIFwiT0tcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmNvaW4gPSBjb2luO1xuICAgICAgICAgIHRoaXMub25FbmRTY2FuLmVtaXQoKTtcbiAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoKTtcbiAgICAgICAgfSk7XG4gICAgICB9LCAoKSA9PiB7XG4gICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhbmRsZUVycm9yKCk7XG4gICAgfVxuICB9ICAgIFxuXG4gIGhhbmRsZUVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuc2hvd0RpYWxvZyhcIkVycm9yIVwiLCBcIkludmFsaWQgUVIgQ29kZVwiLCBcIk9LXCIpO1xuICAgIHRoaXMuY29kZSA9IFwiXCI7XG4gICAgdGhpcy5vbkVuZFNjYW4uZW1pdCgpO1xuICB9ICBcbn1cblxuIl19