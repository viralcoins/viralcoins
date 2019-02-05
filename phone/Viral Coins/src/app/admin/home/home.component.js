"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var page_1 = require("ui/page");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var create_component_1 = require("../create/create.component");
var coin_detail_component_1 = require("../coin-detail/coin-detail.component");
var nativescript_barcodescanner_1 = require("nativescript-barcodescanner");
var list_view_component_1 = require("../../components/list-view.component");
var loading_service_1 = require("../../services/loading.service");
var HomeComponent = /** @class */ (function (_super) {
    __extends(HomeComponent, _super);
    function HomeComponent(coinService, page, vcRef, modal, barcodeScanner, loadingService) {
        var _this_1 = _super.call(this, loadingService) || this;
        _this_1.coinService = coinService;
        _this_1.page = page;
        _this_1.vcRef = vcRef;
        _this_1.modal = modal;
        _this_1.barcodeScanner = barcodeScanner;
        _this_1.loadingService = loadingService;
        _this_1.code = "";
        _this_1.templateSelectorFunction = function (item, index, items) {
            return item.type == null ? 'coin' : 'empty';
        };
        _this_1.page.actionBarHidden = true;
        return _this_1;
    }
    HomeComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.load();
    };
    HomeComponent.prototype.getData = function () {
        return this.coinService.all();
    };
    HomeComponent.prototype.doReload = function () {
        this.coinService.reloadAllCoins = true;
    };
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
    HomeComponent.prototype.onItemTap = function (coin) {
        this.openCoin(coin);
    };
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
            loading_service_1.LoadingService])
    ], HomeComponent);
    return HomeComponent;
}(list_view_component_1.ListViewComponent));
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRTtBQUNwRSw0REFBMEQ7QUFFMUQsZ0NBQStCO0FBQy9CLG1FQUFpRztBQUNqRywrREFBNkQ7QUFDN0QsOEVBQTJFO0FBQzNFLDJFQUE2RDtBQUc3RCw0RUFBeUU7QUFFekUsa0VBQWdFO0FBU2hFO0lBQW1DLGlDQUFpQjtJQUdsRCx1QkFDVSxXQUF3QixFQUN4QixJQUFVLEVBQ1YsS0FBdUIsRUFDdkIsS0FBeUIsRUFDekIsY0FBOEIsRUFDL0IsY0FBOEI7UUFOdkMsY0FRRSxrQkFBTSxjQUFjLENBQUMsU0FFdEI7UUFUUyxtQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixZQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsYUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIsYUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDekIsc0JBQWMsR0FBZCxjQUFjLENBQWdCO1FBQy9CLHNCQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVJ2QyxZQUFJLEdBQVcsRUFBRSxDQUFDO1FBMkJYLGdDQUF3QixHQUFHLFVBQUMsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFVO1lBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQWxCQyxPQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7O0lBQ25DLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0UsaUJBQU0sUUFBUSxXQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2QsQ0FBQztJQUVELCtCQUFPLEdBQVA7UUFDRSxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDaEMsQ0FB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WixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUF0SVUsYUFBYTtRQVB6QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsU0FBUyxFQUFFLENBQUMsNENBQWMsQ0FBQztTQUM1QixDQUFDO3lDQUt1QiwwQkFBVztZQUNsQixXQUFJO1lBQ0gsdUJBQWdCO1lBQ2hCLDRCQUFrQjtZQUNULDRDQUFjO1lBQ2YsZ0NBQWM7T0FUNUIsYUFBYSxDQXVJekI7SUFBRCxvQkFBQztDQUFBLEFBdklELENBQW1DLHVDQUFpQixHQXVJbkQ7QUF2SVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvaW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvY29pbi5tb2RlbCc7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcbmltcG9ydCB7IENyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4uL2NyZWF0ZS9jcmVhdGUuY29tcG9uZW50JztcbmltcG9ydCB7IENvaW5EZXRhaWxDb21wb25lbnQgfSBmcm9tICcuLi9jb2luLWRldGFpbC9jb2luLWRldGFpbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQmFyY29kZVNjYW5uZXIgfSBmcm9tICduYXRpdmVzY3JpcHQtYmFyY29kZXNjYW5uZXInO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbmltcG9ydCB7IExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9saXN0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImFkbWluLWhvbWVcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9ob21lLmNvbXBvbmVudC5jc3NcIl0sXG4gIHByb3ZpZGVyczogW0JhcmNvZGVTY2FubmVyXVxufSlcbmV4cG9ydCBjbGFzcyBIb21lQ29tcG9uZW50IGV4dGVuZHMgTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2RlOiBzdHJpbmcgPSBcIlwiO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIGJhcmNvZGVTY2FubmVyOiBCYXJjb2RlU2Nhbm5lcixcbiAgICBwdWJsaWMgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlXG4gICkge1xuICAgIHN1cGVyKGxvYWRpbmdTZXJ2aWNlKTtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5sb2FkKCk7XG4gIH0gIFxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuY29pblNlcnZpY2UuYWxsKCk7XG4gIH0gIFxuXG4gIGRvUmVsb2FkKCkge1xuICAgIHRoaXMuY29pblNlcnZpY2UucmVsb2FkQWxsQ29pbnMgPSB0cnVlOyAgICBcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb24gPSAoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBpdGVtczogYW55KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gaXRlbS50eXBlID09IG51bGwgPyAnY29pbicgOiAnZW1wdHknO1xuICB9ICAgXG5cbiAgb25BZGRUYXAoKTogdm9pZCB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIHRoaXMuc2NhbkJhcmNvZGUoKS50aGVuKGNvZGUgPT4ge1xuICAgICAgdGhpcy5jb2RlID0gY29kZTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLm9wZW5DcmVhdGUoX3RoaXMuY29kZSk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIG9wZW5DcmVhdGUoY29kZSk6IHZvaWQge1xuICAgIGNvbnN0IG9wdGlvbnM6IE1vZGFsRGlhbG9nT3B0aW9ucyA9IHtcbiAgICAgIHZpZXdDb250YWluZXJSZWY6IHRoaXMudmNSZWYsXG4gICAgICBjb250ZXh0OiB7XG4gICAgICAgIGNvZGU6IGNvZGVcbiAgICAgIH0sXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlXG4gICAgfTtcblxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKENyZWF0ZUNvbXBvbmVudCwgb3B0aW9ucylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb2RlID0gXCJcIjtcbiAgICAgICAgdGhpcy5jb2luU2VydmljZS5yZWxvYWRBbGxDb2lucyA9IHRydWU7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBvcGVuQ29pbihjb2luKTogdm9pZCB7XG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgIGNvbnRleHQ6IGNvaW4sXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlXG4gICAgfTtcblxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKENvaW5EZXRhaWxDb21wb25lbnQsIG9wdGlvbnMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMuY29pblNlcnZpY2UucmVsb2FkQWxsQ29pbnMgPSB0cnVlO1xuICAgICAgICB0aGlzLmxvYWQoKTsgICAgICAgIFxuICAgICAgfSk7XG4gIH1cblxuICBzY2FuQmFyY29kZSgpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5iYXJjb2RlU2Nhbm5lci5zY2FuKHtcbiAgICAgICAgZm9ybWF0czogXCJRUl9DT0RFLCBFQU5fMTNcIixcbiAgICAgICAgLy8gY2FuY2VsTGFiZWw6IFwiRVhJVC4gQWxzbywgdHJ5IHRoZSB2b2x1bWUgYnV0dG9ucyFcIiwgLy8gaU9TIG9ubHksIGRlZmF1bHQgJ0Nsb3NlJ1xuICAgICAgICBjYW5jZWxMYWJlbEJhY2tncm91bmRDb2xvcjogXCIjMzMzMzMzXCIsIC8vIGlPUyBvbmx5LCBkZWZhdWx0ICcjMDAwMDAwJyAoYmxhY2spXG4gICAgICAgIG1lc3NhZ2U6IFwiVXNlIHRoZSB2b2x1bWUgYnV0dG9ucyBmb3IgZXh0cmEgbGlnaHRcIiwgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IGlzICdQbGFjZSBhIGJhcmNvZGUgaW5zaWRlIHRoZSB2aWV3ZmluZGVyIHJlY3RhbmdsZSB0byBzY2FuIGl0LidcbiAgICAgICAgc2hvd0ZsaXBDYW1lcmFCdXR0b246IHRydWUsICAgLy8gZGVmYXVsdCBmYWxzZVxuICAgICAgICBwcmVmZXJGcm9udENhbWVyYTogZmFsc2UsICAgICAvLyBkZWZhdWx0IGZhbHNlXG4gICAgICAgIHNob3dUb3JjaEJ1dHRvbjogdHJ1ZSwgICAgICAgIC8vIGRlZmF1bHQgZmFsc2VcbiAgICAgICAgYmVlcE9uU2NhbjogdHJ1ZSwgICAgICAgICAgICAgLy8gUGxheSBvciBTdXBwcmVzcyBiZWVwIG9uIHNjYW4gKGRlZmF1bHQgdHJ1ZSlcbiAgICAgICAgdG9yY2hPbjogZmFsc2UsICAgICAgICAgICAgICAgLy8gbGF1bmNoIHdpdGggdGhlIGZsYXNobGlnaHQgb24gKGRlZmF1bHQgZmFsc2UpXG4gICAgICAgIGNsb3NlQ2FsbGJhY2s6ICgpID0+IHt9LCAvLyBpbnZva2VkIHdoZW4gdGhlIHNjYW5uZXIgd2FzIGNsb3NlZCAoc3VjY2VzcyBvciBhYm9ydClcbiAgICAgICAgLy8gcmVzdWx0RGlzcGxheUR1cmF0aW9uOiA1MDAsICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IDE1MDAgKG1zKSwgc2V0IHRvIDAgdG8gZGlzYWJsZSBlY2hvaW5nIHRoZSBzY2FubmVkIHRleHRcbiAgICAgICAgLy8gb3JpZW50YXRpb246IG9yaWVudGF0aW9uLCAgICAgLy8gQW5kcm9pZCBvbmx5LCBkZWZhdWx0IHVuZGVmaW5lZCAoc2Vuc29yLWRyaXZlbiBvcmllbnRhdGlvbiksIG90aGVyIG9wdGlvbnM6IHBvcnRyYWl0fGxhbmRzY2FwZVxuICAgICAgICBvcGVuU2V0dGluZ3NJZlBlcm1pc3Npb25XYXNQcmV2aW91c2x5RGVuaWVkOiB0cnVlIC8vIE9uIGlPUyB5b3UgY2FuIHNlbmQgdGhlIHVzZXIgdG8gdGhlIHNldHRpbmdzIGFwcCBpZiBhY2Nlc3Mgd2FzIHByZXZpb3VzbHkgZGVuaWVkXG4gICAgICB9KS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSZXN1bHQgRmlyZWRcIik7XG4gICAgICAgIHJlc29sdmUodGhpcy5oYW5kbGVDb2RlKHJlc3VsdC50ZXh0KSk7XG4gICAgICB9LCAoZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2Nhbi4gXCIgKyBlcnJvck1lc3NhZ2UpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlQ29kZSh0ZXh0KSB7XG4gICAgbGV0IHJlZ2V4ID0gbmV3IFJlZ0V4cChcIlswLTlBLVpdezR9LVswLTlBLVpdezR9LVswLTlBLVpdezR9LVswLTlBLVpdezR9XCIpO1xuICAgIGlmIChyZWdleC50ZXN0KHRleHQpKSB7XG4gICAgICBsZXQgbWF0Y2ggPSB0ZXh0Lm1hdGNoKHJlZ2V4KTtcbiAgICAgIGxldCBjb2RlID0gXCJcIjtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBjb2RlID0gbWF0Y2hbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29kZTtcbiAgICB9XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gIFxuXG4gIGNyZWF0ZUNvZGUoKTogc3RyaW5nIHtcbiAgICB2YXIgb3V0cHV0ID0gXCJcIjtcbiAgICB2YXIgdmFsaWQgPSBcIjAxMjM0NTY3ODlBQkNERUZHSElKS0xNT1BRUlNUVVZXWFlaXCI7XG4gICAgZm9yICggdmFyIGkgPSAwOyBpIDwgNDsgaSsrICkge1xuICAgICAgZm9yICggdmFyIGogPSAwOyBqIDwgNDsgaisrICkge1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB2YWxpZC5sZW5ndGgpO1xuICAgICAgICB2YXIgY2hhcmFjdGVyID0gdmFsaWQuc3Vic3RyKGluZGV4LCAxKTtcbiAgICAgICAgb3V0cHV0ICs9IGNoYXJhY3RlcjtcbiAgICAgIH1cbiAgICAgIGlmIChpIDwgMykge1xuICAgICAgICBvdXRwdXQgKz0gXCItXCI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gIFxuXG4gIG9uR2VuZXJhdGVUYXAoKSB7XG4gICAgdGhpcy5jb2RlID0gdGhpcy5jcmVhdGVDb2RlKCk7XG4gIH1cblxuICBvbkl0ZW1UYXAoY29pbikge1xuICAgIHRoaXMub3BlbkNvaW4oY29pbik7XG4gIH1cbn1cbiJdfQ==