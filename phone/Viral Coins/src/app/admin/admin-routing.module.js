"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var home_component_1 = require("./home/home.component");
var users_component_1 = require("./users/users.component");
var settings_component_1 = require("./settings/settings.component");
var messages_component_1 = require("./messages/messages.component");
var routes = [
    { path: "home", component: home_component_1.HomeComponent },
    { path: "users", component: users_component_1.UsersComponent },
    { path: "settings", component: settings_component_1.SettingsComponent },
    { path: "messages", component: messages_component_1.MessagesComponent }
];
var AdminRoutingModule = /** @class */ (function () {
    function AdminRoutingModule() {
    }
    AdminRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forChild(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AdminRoutingModule);
    return AdminRoutingModule;
}());
exports.AdminRoutingModule = AdminRoutingModule;
