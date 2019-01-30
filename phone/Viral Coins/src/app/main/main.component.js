"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MainComponent = /** @class */ (function () {
    function MainComponent() {
        this.isLoading = false;
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent.prototype.onStartScan = function () {
        this.isLoading = true;
    };
    MainComponent.prototype.onEndScan = function () {
        this.isLoading = false;
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'ns-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
