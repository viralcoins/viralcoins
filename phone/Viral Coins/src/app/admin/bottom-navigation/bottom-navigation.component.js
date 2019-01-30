"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var operators_1 = require("rxjs/operators");
var BottomNavigationComponent = /** @class */ (function () {
    function BottomNavigationComponent(router, routerExtensions) {
        this.router = router;
        this.routerExtensions = routerExtensions;
    }
    BottomNavigationComponent.prototype.selectTab = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });
    };
    BottomNavigationComponent.prototype.ngOnInit = function () {
        this._activatedUrl = "/admin/home";
        var _this = this;
        this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            setTimeout(function () {
                _this._activatedUrl = event.urlAfterRedirects;
            }, 150);
        });
    };
    BottomNavigationComponent.prototype.isComponentSelected = function (url) {
        return this._activatedUrl === url;
    };
    BottomNavigationComponent = __decorate([
        core_1.Component({
            selector: "bottom-navigation-admin",
            moduleId: module.id,
            templateUrl: "./bottom-navigation.component.html",
            styleUrls: ['./bottom-navigation.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_2.RouterExtensions])
    ], BottomNavigationComponent);
    return BottomNavigationComponent;
}());
exports.BottomNavigationComponent = BottomNavigationComponent;
