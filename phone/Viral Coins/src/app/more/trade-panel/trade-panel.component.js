"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var coin_service_1 = require("../../services/coin.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var TradePanelComponent = /** @class */ (function () {
    function TradePanelComponent(params, coinService) {
        this.params = params;
        this.coinService = coinService;
        this.coin = params.context;
    }
    TradePanelComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    TradePanelComponent.prototype.ngOnInit = function () {
    };
    TradePanelComponent.prototype.onHelpTap = function () {
        alert("Do help");
    };
    TradePanelComponent.prototype.onSubmitTap = function () {
        var _this = this;
        this.coinService.makeOffer(this.coin.id, this.offer).subscribe(function () {
            dialogs.alert({
                title: "Success!",
                message: "Your offer has been submitted.",
                okButtonText: "OK"
            }).then(function () {
                _this.onClose();
            });
        });
    };
    TradePanelComponent = __decorate([
        core_1.Component({
            selector: 'ns-trade-panel',
            templateUrl: './trade-panel.component.html',
            styleUrls: ['./trade-panel.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            coin_service_1.CoinService])
    ], TradePanelComponent);
    return TradePanelComponent;
}());
exports.TradePanelComponent = TradePanelComponent;
