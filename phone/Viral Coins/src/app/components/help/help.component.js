"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var HelpComponent = /** @class */ (function () {
    function HelpComponent(params) {
        this.params = params;
        this.header = params.context.header;
        this.content = params.context.content;
        this.src = params.context.src;
    }
    HelpComponent.prototype.ngOnInit = function () {
    };
    HelpComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    HelpComponent = __decorate([
        core_1.Component({
            selector: 'ns-help',
            templateUrl: './help.component.html',
            styleUrls: ['./help.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams])
    ], HelpComponent);
    return HelpComponent;
}());
exports.HelpComponent = HelpComponent;
