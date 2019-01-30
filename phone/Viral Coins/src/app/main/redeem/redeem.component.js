"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var address_model_1 = require("../../models/address.model");
var router_1 = require("@angular/router");
var coin_service_1 = require("../../services/coin.service");
var router_2 = require("nativescript-angular/router");
var dialogs = require("tns-core-modules/ui/dialogs");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var RedeemComponent = /** @class */ (function () {
    function RedeemComponent(coinService, route, routerExtensions, params) {
        this.coinService = coinService;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.params = params;
        this.first = "Benjamin";
        this.last = "Morrise";
        this.address = new address_model_1.Address("13637 Podocarpus Ln", "", "Orlando", "FL", "32828");
        this.coin = params.context;
    }
    RedeemComponent.prototype.ngOnInit = function () {
    };
    RedeemComponent.prototype.onSubmit = function () {
        var _this = this;
        this.coinService.redeemPrize(this.coin.id, this.first, this.last, this.address).subscribe(function () {
            dialogs.alert({
                title: "Success!",
                message: "Your prize has been redeemed. You will receive an email when your prize has been sent.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback();
            });
        });
    };
    RedeemComponent.prototype.onCancel = function () {
        this.params.closeCallback();
    };
    RedeemComponent = __decorate([
        core_1.Component({
            selector: 'ns-redeem',
            templateUrl: './redeem.component.html',
            styleUrls: ['./redeem.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            modal_dialog_1.ModalDialogParams])
    ], RedeemComponent);
    return RedeemComponent;
}());
exports.RedeemComponent = RedeemComponent;
