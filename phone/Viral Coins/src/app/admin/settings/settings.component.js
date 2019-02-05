"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../config");
var appSettings = require("tns-core-modules/application-settings");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var send_notification_component_1 = require("../send-notification/send-notification.component");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent(vcRef, modal) {
        this.vcRef = vcRef;
        this.modal = modal;
        this.url = 'https://viralcoins.co';
    }
    SettingsComponent.prototype.ngOnInit = function () {
        this.url = config_1.Config.apiUrl;
    };
    SettingsComponent.prototype.onUpdateTap = function () {
        config_1.Config.apiUrl = this.url;
        appSettings.setString("apiUrl", this.url);
        console.log(config_1.Config);
    };
    SettingsComponent.prototype.onSendNotificationTap = function () {
        var options = {
            viewContainerRef: this.vcRef,
            context: {},
            fullscreen: true
        };
        this.modal.showModal(send_notification_component_1.SendNotificationComponent, options)
            .then(function () {
            console.log("");
        });
    };
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'ns-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [core_1.ViewContainerRef,
            dialogs_1.ModalDialogService])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0dGluZ3MuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2V0dGluZ3MuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLHVDQUFzQztBQUN0QyxtRUFBcUU7QUFDckUsbUVBQWlHO0FBQ2pHLGdHQUE2RjtBQVE3RjtJQUlFLDJCQUNVLEtBQXVCLEVBQ3ZCLEtBQXlCO1FBRHpCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBSjVCLFFBQUcsR0FBVyx1QkFBdUIsQ0FBQztJQUt2QyxDQUFDO0lBRVAsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBTSxDQUFDLE1BQU0sQ0FBQztJQUMzQixDQUFDO0lBRU0sdUNBQVcsR0FBbEI7UUFDRSxlQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDekIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBTSxDQUFDLENBQUM7SUFDdEIsQ0FBQztJQUVNLGlEQUFxQixHQUE1QjtRQUNFLElBQU0sT0FBTyxHQUF1QjtZQUNsQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsRUFBRTtZQUNYLFVBQVUsRUFBRSxJQUFJO1NBQ2pCLENBQUM7UUFFRixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyx1REFBeUIsRUFBRSxPQUFPLENBQUM7YUFDckQsSUFBSSxDQUFDO1lBQ0osT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUE5QlUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3ZDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU1pQix1QkFBZ0I7WUFDaEIsNEJBQWtCO09BTnhCLGlCQUFpQixDQStCN0I7SUFBRCx3QkFBQztDQUFBLEFBL0JELElBK0JDO0FBL0JZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q29udGFpbmVyUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcbmltcG9ydCB7IFNlbmROb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuLi9zZW5kLW5vdGlmaWNhdGlvbi9zZW5kLW5vdGlmaWNhdGlvbi5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1zZXR0aW5ncycsXG4gIHRlbXBsYXRlVXJsOiAnLi9zZXR0aW5ncy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NldHRpbmdzLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyB1cmw6IHN0cmluZyA9ICdodHRwczovL3ZpcmFsY29pbnMuY28nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSBtb2RhbDogTW9kYWxEaWFsb2dTZXJ2aWNlXG4gICAgKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVybCA9IENvbmZpZy5hcGlVcmw7XG4gIH1cblxuICBwdWJsaWMgb25VcGRhdGVUYXAoKSB7XG4gICAgQ29uZmlnLmFwaVVybCA9IHRoaXMudXJsO1xuICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhcImFwaVVybFwiLCB0aGlzLnVybCk7XG4gICAgY29uc29sZS5sb2coQ29uZmlnKTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlbmROb3RpZmljYXRpb25UYXAoKSB7XG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgIGNvbnRleHQ6IHt9LFxuICAgICAgZnVsbHNjcmVlbjogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLm1vZGFsLnNob3dNb2RhbChTZW5kTm90aWZpY2F0aW9uQ29tcG9uZW50LCBvcHRpb25zKVxuICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlwiKTtcbiAgICAgIH0pOyAgICBcbiAgfVxufVxuIl19