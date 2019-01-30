"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var user_service_1 = require("../../services/user.service");
var page_1 = require("ui/page");
var MoreComponent = /** @class */ (function () {
    function MoreComponent(routerExtensions, userService, page) {
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.page = page;
        page.actionBarHidden = true;
    }
    MoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.currentUserValue) {
            this.userService.getUser().subscribe(function (user) {
                _this.user = user;
            });
        }
        else {
            this.user = this.userService.currentUserValue;
        }
    };
    MoreComponent.prototype.onNavigate = function (url) {
        this.routerExtensions.navigate([url], {
            transition: {
                name: "slideLeft"
            }
        });
    };
    MoreComponent = __decorate([
        core_1.Component({
            selector: 'ns-more',
            templateUrl: './more.component.html',
            styleUrls: ['./more.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            user_service_1.UserService,
            page_1.Page])
    ], MoreComponent);
    return MoreComponent;
}());
exports.MoreComponent = MoreComponent;
