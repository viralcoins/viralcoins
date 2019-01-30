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
                settings_component_1.SettingsComponent
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
                create_component_1.CreateComponent
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA]
        })
    ], AdminModule);
    return AdminModule;
}());
exports.AdminModule = AdminModule;
