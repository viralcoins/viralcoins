"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("tns-core-modules/ui/enums");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var coin_service_1 = require("../../services/coin.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(coinService, params) {
        this.coinService = coinService;
        this.params = params;
        this.code = "";
        this.description = "";
        this.locationLoaded = false;
        this.requiresAddress = false;
        this.prizeName = "";
        this.price = 1999;
        this.code = params.context.code;
        nativescript_geolocation_1.enableLocationRequest(true);
    }
    CreateComponent.prototype.ngOnInit = function () {
        this.getLocationOnce();
    };
    CreateComponent.prototype.getLocationOnce = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: enums_1.Accuracy.high,
            timeout: 5000
        })
            .then(function (location) {
            _this.longitude = location.longitude;
            _this.latitude = location.latitude;
            _this.locationLoaded = true;
        }).catch(function (error) {
            console.log("Location error received: " + error);
            alert("Location error received: " + error);
        });
    };
    CreateComponent.prototype.onAddTap = function () {
        var _this = this;
        var prize = null;
        if (this.prizeName) {
            prize = {
                "name": this.prizeName,
                "addressRequired": true
            };
        }
        this.coinService.create(this.latitude, this.longitude, this.code, this.description, prize, this.price)
            .subscribe(function (coin) {
            _this.params.closeCallback();
        });
    };
    CreateComponent.prototype.onCancelTap = function () {
        this.params.closeCallback();
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'ns-create',
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            modal_dialog_1.ModalDialogParams])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
