"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("nativescript-angular/forms");
var admin_routing_module_1 = require("./admin-routing.module");
var common_1 = require("nativescript-angular/common");
var admin_component_1 = require("./admin.component");
var home_component_1 = require("./home/home.component");
var bottom_navigation_component_1 = require("./bottom-navigation/bottom-navigation.component");
var angular_1 = require("nativescript-ui-listview/angular");
var shared_module_1 = require("../shared/shared.module");
var coin_detail_component_1 = require("./coin-detail/coin-detail.component");
var create_component_1 = require("./create/create.component");
var messages_component_1 = require("./messages/messages.component");
var users_component_1 = require("./users/users.component");
var settings_component_1 = require("./settings/settings.component");
var message_detail_component_1 = require("./message-detail/message-detail.component");
var send_notification_component_1 = require("./send-notification/send-notification.component");
var AdminModule = /** @class */ (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        core_1.NgModule({
            declarations: [
                admin_component_1.AdminComponent,
                home_component_1.HomeComponent,
                bottom_navigation_component_1.BottomNavigationComponent,
                coin_detail_component_1.CoinDetailComponent,
                create_component_1.CreateComponent,
                messages_component_1.MessagesComponent,
                users_component_1.UsersComponent,
                settings_component_1.SettingsComponent,
                message_detail_component_1.MessageDetailComponent,
                send_notification_component_1.SendNotificationComponent
            ],
            imports: [
                admin_routing_module_1.AdminRoutingModule,
                common_1.NativeScriptCommonModule,
                forms_1.NativeScriptFormsModule,
                angular_1.NativeScriptUIListViewModule,
                shared_module_1.SharedModule
            ],
            entryComponents: [
                coin_detail_component_1.CoinDetailComponent,
                create_component_1.CreateComponent,
                message_detail_component_1.MessageDetailComponent,
                send_notification_component_1.SendNotificationComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWRtaW4ubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWRtaW4ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJEO0FBQzNELG9EQUFxRTtBQUNyRSwrREFBNEQ7QUFDNUQsc0RBQXVFO0FBQ3ZFLHFEQUFtRDtBQUNuRCx3REFBc0Q7QUFDdEQsK0ZBQTRGO0FBQzVGLDREQUFnRjtBQUNoRix5REFBdUQ7QUFDdkQsNkVBQTBFO0FBQzFFLDhEQUE0RDtBQUM1RCxvRUFBa0U7QUFDbEUsMkRBQXlEO0FBQ3pELG9FQUFrRTtBQUNsRSxzRkFBbUY7QUFDbkYsK0ZBQTRGO0FBOEI1RjtJQUFBO0lBQTJCLENBQUM7SUFBZixXQUFXO1FBNUJ2QixlQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ2IsZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2IsdURBQXlCO2dCQUN4QiwyQ0FBbUI7Z0JBQ25CLGtDQUFlO2dCQUNmLHNDQUFpQjtnQkFDakIsZ0NBQWM7Z0JBQ2Qsc0NBQWlCO2dCQUNqQixpREFBc0I7Z0JBQ3RCLHVEQUF5QjthQUMxQjtZQUNELE9BQU8sRUFBRTtnQkFDUCx5Q0FBa0I7Z0JBQ2xCLGlDQUF3QjtnQkFDeEIsK0JBQXVCO2dCQUN2QixzQ0FBNEI7Z0JBQzVCLDRCQUFZO2FBQ2I7WUFDRCxlQUFlLEVBQUU7Z0JBQ2YsMkNBQW1CO2dCQUNuQixrQ0FBZTtnQkFDZixpREFBc0I7Z0JBQ3RCLHVEQUF5QjthQUMxQjtZQUNELE9BQU8sRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzVCLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO0FBQWYsa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZm9ybXNcIjtcbmltcG9ydCB7IEFkbWluUm91dGluZ01vZHVsZSB9IGZyb20gJy4vYWRtaW4tcm91dGluZy5tb2R1bGUnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Q29tbW9uTW9kdWxlIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEFkbWluQ29tcG9uZW50IH0gZnJvbSAnLi9hZG1pbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgSG9tZUNvbXBvbmVudCB9IGZyb20gJy4vaG9tZS9ob21lLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCb3R0b21OYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9ib3R0b20tbmF2aWdhdGlvbi9ib3R0b20tbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlMaXN0Vmlld01vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXcvYW5ndWxhclwiO1xuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSAnLi4vc2hhcmVkL3NoYXJlZC5tb2R1bGUnO1xuaW1wb3J0IHsgQ29pbkRldGFpbENvbXBvbmVudCB9IGZyb20gJy4vY29pbi1kZXRhaWwvY29pbi1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IENyZWF0ZUNvbXBvbmVudCB9IGZyb20gJy4vY3JlYXRlL2NyZWF0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZXNDb21wb25lbnQgfSBmcm9tICcuL21lc3NhZ2VzL21lc3NhZ2VzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBVc2Vyc0NvbXBvbmVudCB9IGZyb20gJy4vdXNlcnMvdXNlcnMuY29tcG9uZW50JztcbmltcG9ydCB7IFNldHRpbmdzQ29tcG9uZW50IH0gZnJvbSAnLi9zZXR0aW5ncy9zZXR0aW5ncy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVzc2FnZURldGFpbENvbXBvbmVudCB9IGZyb20gJy4vbWVzc2FnZS1kZXRhaWwvbWVzc2FnZS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNlbmROb3RpZmljYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3NlbmQtbm90aWZpY2F0aW9uL3NlbmQtbm90aWZpY2F0aW9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICBcdEFkbWluQ29tcG9uZW50LFxuICBcdEhvbWVDb21wb25lbnQsXG4gIFx0Qm90dG9tTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgICBDb2luRGV0YWlsQ29tcG9uZW50LFxuICAgIENyZWF0ZUNvbXBvbmVudCxcbiAgICBNZXNzYWdlc0NvbXBvbmVudCxcbiAgICBVc2Vyc0NvbXBvbmVudCxcbiAgICBTZXR0aW5nc0NvbXBvbmVudCxcbiAgICBNZXNzYWdlRGV0YWlsQ29tcG9uZW50LFxuICAgIFNlbmROb3RpZmljYXRpb25Db21wb25lbnRcbiAgXSxcbiAgaW1wb3J0czogWyAgXG4gICAgQWRtaW5Sb3V0aW5nTW9kdWxlLFxuICAgIE5hdGl2ZVNjcmlwdENvbW1vbk1vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICBOYXRpdmVTY3JpcHRVSUxpc3RWaWV3TW9kdWxlLFxuICAgIFNoYXJlZE1vZHVsZVxuICBdLFxuICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICBDb2luRGV0YWlsQ29tcG9uZW50LFxuICAgIENyZWF0ZUNvbXBvbmVudCxcbiAgICBNZXNzYWdlRGV0YWlsQ29tcG9uZW50LFxuICAgIFNlbmROb3RpZmljYXRpb25Db21wb25lbnRcbiAgXSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIEFkbWluTW9kdWxlIHsgfVxuIl19