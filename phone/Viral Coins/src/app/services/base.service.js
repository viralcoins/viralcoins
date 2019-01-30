"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var http_1 = require("@angular/http");
var cache_service_1 = require("./cache.service");
var config_1 = require("../config");
var BaseService = /** @class */ (function () {
    function BaseService(http, cacheService) {
        this.http = http;
        this.cacheService = cacheService;
        this.baseUrl = config_1.Config.apiUrl;
    }
    BaseService.prototype.get = function (url) {
        return this.http.get(url, {
            headers: this.getCommonHeaders()
        }).pipe(operators_1.map(function (res) { return res.json(); }));
    };
    BaseService.prototype.post = function (url, data) {
        return this.http.post(url, data, {
            headers: this.getCommonHeaders()
        }).pipe(operators_1.map(function (res) {
            return res.json();
        }));
    };
    BaseService.prototype.put = function (url, data) {
        return this.http.put(url, data, {
            headers: this.getCommonHeaders()
        }).pipe(operators_1.map(function (res) {
            return res.json();
        }));
    };
    BaseService.prototype.delete = function (url) {
        var _this = this;
        console.log("Delete: " + url);
        return this.http.delete(url, {
            headers: this.getCommonHeaders()
        }).pipe(operators_1.map(function (res) {
            return res.json();
        }), operators_1.catchError(function (e) { return _this.handleErrors(e); }));
    };
    BaseService.prototype.getCached = function (url, key, flag) {
        var _this = this;
        return this.cacheService.handleCache(flag, key, function () {
            return _this.get(url);
        });
    };
    BaseService.prototype.getCommonHeaders = function () {
        var headers = new http_1.Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", "Bearer " + config_1.Config.token);
        return headers;
    };
    BaseService.prototype.handleErrors = function (error) {
        console.log(error);
        return rxjs_1.Observable.throw(error);
    };
    BaseService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            cache_service_1.CacheService])
    ], BaseService);
    return BaseService;
}());
exports.BaseService = BaseService;
