"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var appSettings = require("tns-core-modules/application-settings");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var CacheService = /** @class */ (function () {
    function CacheService() {
        this.override = false;
    }
    CacheService.prototype.store = function (key, value) {
        appSettings.setString(key, JSON.stringify(value));
    };
    CacheService.prototype.load = function (key) {
        var object = appSettings.getString(key);
        return object ? JSON.parse(object) : null;
    };
    CacheService.prototype.handleCache = function (flag, key, refreshMethod) {
        var _this = this;
        console.log("******************************");
        var object = this.load(key);
        if (!object || flag || this.override) {
            console.log("* Loading " + key + " from server");
            console.log("* Because " + flag);
            console.log("******************************");
            flag = false;
            return refreshMethod().pipe(operators_1.map(function (data) {
                _this.store(key, data);
                return data;
            }));
        }
        else {
            console.log("* Loading " + key + " from cache");
            console.log("******************************");
            return rxjs_1.of(object);
        }
    };
    CacheService = __decorate([
        core_1.Injectable()
    ], CacheService);
    return CacheService;
}());
exports.CacheService = CacheService;
