"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var user_service_1 = require("../../services/user.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var SendMessageComponent = /** @class */ (function () {
    function SendMessageComponent(params, userService) {
        this.params = params;
        this.userService = userService;
        this.message = "";
        this.isSending = false;
    }
    SendMessageComponent.prototype.ngOnInit = function () {
    };
    SendMessageComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSending = true;
        this.userService.sendMessage(this.message).subscribe(function (message) {
            dialogs.alert({
                title: "Success",
                message: "Your message was sent!",
                okButtonText: "OK"
            }).then(function () {
                _this.onClose();
            });
        });
    };
    SendMessageComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    SendMessageComponent = __decorate([
        core_1.Component({
            selector: 'ns-send-message',
            templateUrl: './send-message.component.html',
            styleUrls: ['./send-message.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            user_service_1.UserService])
    ], SendMessageComponent);
    return SendMessageComponent;
}());
exports.SendMessageComponent = SendMessageComponent;
