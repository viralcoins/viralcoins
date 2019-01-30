"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var config_1 = require("../../config");
var appSettings = require("tns-core-modules/application-settings");
var SettingsComponent = /** @class */ (function () {
    function SettingsComponent() {
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
    SettingsComponent = __decorate([
        core_1.Component({
            selector: 'ns-settings',
            templateUrl: './settings.component.html',
            styleUrls: ['./settings.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [])
    ], SettingsComponent);
    return SettingsComponent;
}());
exports.SettingsComponent = SettingsComponent;
