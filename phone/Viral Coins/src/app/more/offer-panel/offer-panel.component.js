"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialogs = require("tns-core-modules/ui/dialogs");
var OfferPanelComponent = /** @class */ (function () {
    function OfferPanelComponent(params, coinService) {
        this.params = params;
        this.coinService = coinService;
        this.offerId = params.context.id;
    }
    OfferPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coinService.getOffer(this.offerId).subscribe(function (offer) {
            _this.offer = offer;
        });
    };
    OfferPanelComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    OfferPanelComponent.prototype.onAcceptTap = function () {
        var _this = this;
        this.coinService.acceptOffer(this.offerId).subscribe(function (offer) {
            dialogs.alert({
                title: "Success!",
                message: "You have accepted their offer. The user will be notified and when payment is received, the coin will be transfered to your wallet.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback({
                    action: "accepted",
                    value: offer
                });
            });
        });
    };
    OfferPanelComponent.prototype.onRejectTap = function () {
        var _this = this;
        this.coinService.rejectOffer(this.offerId).subscribe(function (offer) {
            dialogs.alert({
                title: "Success!",
                message: "You have rejected their offer. They can make additional offers while your coins is listed for sale.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback({
                    action: "rejected",
                    value: offer
                });
            });
        });
    };
    OfferPanelComponent = __decorate([
        core_1.Component({
            selector: 'ns-offer-panel',
            templateUrl: './offer-panel.component.html',
            styleUrls: ['./offer-panel.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            coin_service_1.CoinService])
    ], OfferPanelComponent);
    return OfferPanelComponent;
}());
exports.OfferPanelComponent = OfferPanelComponent;
