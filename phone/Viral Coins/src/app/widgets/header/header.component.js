"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.onMessage = new core_1.EventEmitter();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onBackTap = function () {
        if (this.link) {
            this.routerExtensions.navigate([this.link], {
                transition: {
                    name: "slideRight"
                }
            });
        }
        else {
            this.routerExtensions.back();
        }
    };
    HeaderComponent.prototype.onMessageTap = function () {
        this.onMessage.emit();
    };
    __decorate([
        core_1.Output('onMessage'),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "onMessage", void 0);
    __decorate([
        core_1.Input('left'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "left", void 0);
    __decorate([
        core_1.Input('right'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "right", void 0);
    __decorate([
        core_1.Input('link'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "link", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'vc-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
