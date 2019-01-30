"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var config_1 = require("../../config");
var router_1 = require("nativescript-angular/router");
var coin_service_1 = require("../../services/coin.service");
var DetailModalComponent = /** @class */ (function () {
    function DetailModalComponent(params, routerExtensions, coinService) {
        this.params = params;
        this.routerExtensions = routerExtensions;
        this.coinService = coinService;
        this.coinImage = '';
        this.isLoading = false;
        this.coin = params.context;
        this.coinImage = config_1.Config.apiUrl + "/coin/" + this.coin.code + "/qr?size=8";
    }
    DetailModalComponent.prototype.ngOnInit = function () {
        // Init your component properties here.
    };
    DetailModalComponent.prototype.onClose = function () {
        this.params.closeCallback({
            action: "close",
            value: this.coin
        });
    };
    DetailModalComponent.prototype.onShareTap = function () {
        this.params.closeCallback({
            action: "share",
            value: this.coin.code
        });
    };
    DetailModalComponent.prototype.onSellTap = function () {
        var _this = this;
        this.isLoading = true;
        this.coinService.sell(this.coin.id).subscribe(function (coin) {
            _this.isLoading = false;
            _this.coin = coin;
        });
    };
    DetailModalComponent.prototype.onUnlistTap = function () {
        var _this = this;
        this.isLoading = true;
        this.coinService.unlist(this.coin.id).subscribe(function (coin) {
            _this.isLoading = false;
            _this.coin = coin;
        });
    };
    DetailModalComponent = __decorate([
        core_1.Component({
            selector: "app-detail-modal",
            moduleId: module.id,
            templateUrl: "./detail-modal.component.html",
            styleUrls: ['./detail-modal.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            router_1.RouterExtensions,
            coin_service_1.CoinService])
    ], DetailModalComponent);
    return DetailModalComponent;
}());
exports.DetailModalComponent = DetailModalComponent;
