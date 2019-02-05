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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1tZXNzYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbmQtbWVzc2FnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsa0VBQXNFO0FBQ3RFLDREQUEwRDtBQUMxRCxxREFBdUQ7QUFRdkQ7SUFLRSw4QkFDUyxNQUF5QixFQUN4QixXQUF3QjtRQUR6QixXQUFNLEdBQU4sTUFBTSxDQUFtQjtRQUN4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUxsQyxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2IsY0FBUyxHQUFZLEtBQUssQ0FBQztJQUt2QixDQUFDO0lBRUwsdUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFTSx1Q0FBUSxHQUFmO1FBQUEsaUJBV0M7UUFWQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsT0FBTztZQUMxRCxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNaLEtBQUssRUFBRSxTQUFTO2dCQUNoQixPQUFPLEVBQUUsd0JBQXdCO2dCQUNqQyxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVNLHNDQUFPLEdBQWQ7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUE1QlUsb0JBQW9CO1FBTmhDLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7WUFDM0MsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBT2lCLGdDQUFpQjtZQUNYLDBCQUFXO09BUHZCLG9CQUFvQixDQThCaEM7SUFBRCwyQkFBQztDQUFBLEFBOUJELElBOEJDO0FBOUJZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZyc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtc2VuZC1tZXNzYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbmQtbWVzc2FnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbmQtbWVzc2FnZS5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIFNlbmRNZXNzYWdlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBtZXNzYWdlID0gXCJcIjtcbiAgaXNTZW5kaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG5cdCAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBwdWJsaWMgb25TdWJtaXQoKTogdm9pZCB7XG4gICAgdGhpcy5pc1NlbmRpbmcgPSB0cnVlO1xuICAgIHRoaXMudXNlclNlcnZpY2Uuc2VuZE1lc3NhZ2UodGhpcy5tZXNzYWdlKS5zdWJzY3JpYmUobWVzc2FnZSA9PiB7XG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgdGl0bGU6IFwiU3VjY2Vzc1wiLFxuICAgICAgICBtZXNzYWdlOiBcIllvdXIgbWVzc2FnZSB3YXMgc2VudCFcIixcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICB9XG5cbn1cbiJdfQ==