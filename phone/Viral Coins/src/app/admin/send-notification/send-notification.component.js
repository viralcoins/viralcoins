"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialogs = require("tns-core-modules/ui/dialogs");
var SendNotificationComponent = /** @class */ (function () {
    function SendNotificationComponent(userService, params) {
        this.userService = userService;
        this.params = params;
        this.type = "notification";
        this.isSending = false;
    }
    SendNotificationComponent.prototype.ngOnInit = function () {
    };
    SendNotificationComponent.prototype.onSubmit = function () {
        var _this = this;
        this.isSending = true;
        this.userService.addFeedItem({
            type: this.type,
            title: this.title,
            text: this.text,
            actionText: this.actionText
        }).subscribe(function () {
            dialogs.alert({
                title: "Success",
                message: "Your message was sent!",
                okButtonText: "OK"
            }).then(function () {
                _this.onClose();
            });
        });
    };
    SendNotificationComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    SendNotificationComponent = __decorate([
        core_1.Component({
            selector: 'ns-send-notification',
            templateUrl: './send-notification.component.html',
            styleUrls: ['./send-notification.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            modal_dialog_1.ModalDialogParams])
    ], SendNotificationComponent);
    return SendNotificationComponent;
}());
exports.SendNotificationComponent = SendNotificationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VuZC1ub3RpZmljYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VuZC1ub3RpZmljYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDREQUEwRDtBQUMxRCxrRUFBc0U7QUFDdEUscURBQXVEO0FBUXZEO0lBVUUsbUNBQ1UsV0FBd0IsRUFDeEIsTUFBeUI7UUFEekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFWbkMsU0FBSSxHQUFXLGNBQWMsQ0FBQztRQU05QixjQUFTLEdBQUcsS0FBSyxDQUFDO0lBS1osQ0FBQztJQUVQLDRDQUFRLEdBQVI7SUFDQSxDQUFDO0lBRUQsNENBQVEsR0FBUjtRQUFBLGlCQWdCQztRQWZDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDO1lBQzNCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7WUFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7U0FDNUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQztZQUNYLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sMkNBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQXRDVSx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxzQkFBc0I7WUFDaEMsV0FBVyxFQUFFLG9DQUFvQztZQUNqRCxTQUFTLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQztZQUNoRCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FZdUIsMEJBQVc7WUFDaEIsZ0NBQWlCO09BWnhCLHlCQUF5QixDQXdDckM7SUFBRCxnQ0FBQztDQUFBLEFBeENELElBd0NDO0FBeENZLDhEQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBVc2VyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZyc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtc2VuZC1ub3RpZmljYXRpb24nLFxuICB0ZW1wbGF0ZVVybDogJy4vc2VuZC1ub3RpZmljYXRpb24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZW5kLW5vdGlmaWNhdGlvbi5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIFNlbmROb3RpZmljYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHR5cGU6IHN0cmluZyA9IFwibm90aWZpY2F0aW9uXCI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHRleHQ6IHN0cmluZztcbiAgYWN0aW9uVGV4dDogc3RyaW5nO1xuICBkYXRhOiBzdHJpbmc7XG5cbiAgaXNTZW5kaW5nID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zXG4gICAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uU3VibWl0KCkge1xuICAgIHRoaXMuaXNTZW5kaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmFkZEZlZWRJdGVtKHtcbiAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgIHRpdGxlOiB0aGlzLnRpdGxlLFxuICAgICAgdGV4dDogdGhpcy50ZXh0LFxuICAgICAgYWN0aW9uVGV4dDogdGhpcy5hY3Rpb25UZXh0XG4gICAgfSkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICB0aXRsZTogXCJTdWNjZXNzXCIsXG4gICAgICAgIG1lc3NhZ2U6IFwiWW91ciBtZXNzYWdlIHdhcyBzZW50IVwiLFxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgfSk7ICAgICAgXG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gIH0gIFxuXG59XG4iXX0=