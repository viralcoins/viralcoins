"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_service_1 = require("../../services/user.service");
var appSettings = require("tns-core-modules/application-settings");
var router_1 = require("nativescript-angular/router");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(page, userService, routerExtensions) {
        this.page = page;
        this.userService = userService;
        this.routerExtensions = routerExtensions;
        this.isLoading = true;
        this.page.actionBarHidden = true;
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        if (!this.userService.currentUserValue) {
            this.userService.getUser().subscribe(function (user) {
                _this_1.user = user;
                _this_1.isLoading = false;
            });
        }
        else {
            this.user = this.userService.currentUserValue;
            this.isLoading = false;
        }
    };
    AccountComponent.prototype.onSaveTap = function () {
        this.userService.update({
            first: this.user.profile.first,
            last: this.user.profile.last,
            email: this.user.email
        }).subscribe(function () {
            alert("Your account was updated.");
        }, function (err) { return alert("We were unable to update your account" + err); });
    };
    AccountComponent.prototype.onLogOutTap = function () {
        var _this = this;
        appSettings.setString('token', '');
        setTimeout(function () {
            _this.routerExtensions.navigate(['/login']);
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: "account",
            moduleId: module.id,
            templateUrl: "./account.component.html",
            styleUrls: ['./account.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            user_service_1.UserService,
            router_1.RouterExtensions])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
