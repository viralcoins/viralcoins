"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var cache_service_1 = require("../services/cache.service");
var config_1 = require("../config");
var appSettings = require("tns-core-modules/application-settings");
var base_service_1 = require("./base.service");
var UserService = /** @class */ (function (_super) {
    __extends(UserService, _super);
    function UserService(http, cacheService) {
        var _this = _super.call(this, http, cacheService) || this;
        _this.http = http;
        _this.cacheService = cacheService;
        _this.reloadAllUsers = false;
        _this.reloadUser = false;
        _this.refreshFeed = false;
        _this.reloadMessages = false;
        _this.currentUserSubject = new rxjs_1.BehaviorSubject(null);
        _this.currentUser = _this.currentUserSubject.asObservable();
        return _this;
    }
    UserService.prototype.register = function (user) {
        return this.post(this.baseUrl + "/user/signup", {
            username: user.username,
            email: user.email,
            password: user.password
        });
    };
    Object.defineProperty(UserService.prototype, "currentUserValue", {
        get: function () {
            return this.currentUserSubject.value;
        },
        enumerable: true,
        configurable: true
    });
    UserService.prototype.getAllUsers = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/user/all", "allusers", this.reloadAllUsers)
            .pipe(operators_1.tap(function (data) {
            _this.reloadAllUsers = false;
        }));
    };
    UserService.prototype.getUser = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/user", "user", this.reloadUser)
            .pipe(operators_1.tap(function (data) {
            _this.reloadUser = false;
        }));
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        return this.post(this.baseUrl + "/user/auth", {
            username: user.username,
            password: user.password
        }).pipe(operators_1.tap(function (data) {
            _this.currentUserSubject.next(data.user);
            appSettings.setString("token", data.token);
            config_1.Config.token = data.token;
        }));
    };
    UserService.prototype.update = function (user) {
        var _this = this;
        return this.post(this.baseUrl + "/user", {
            first: user.first,
            last: user.last,
            email: user.email
        }).pipe(operators_1.tap(function (data) {
            _this.currentUserSubject.next(data);
        }), operators_1.catchError(this.handleErrors));
    };
    UserService.prototype.forgotPassword = function (email) {
        return this.post(this.baseUrl + "/password/forgot", {
            email: email
        });
    };
    UserService.prototype.feed = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/feed", "feed", this.refreshFeed)
            .pipe(operators_1.tap(function (data) {
            _this.refreshFeed = false;
        }));
    };
    UserService.prototype.deleteFeedItem = function (id) {
        return this.delete(this.baseUrl + "/feed/" + id);
    };
    UserService.prototype.sendMessage = function (message) {
        return this.post(this.baseUrl + "/message", {
            content: message
        });
    };
    UserService.prototype.messages = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/messages", "messages", this.reloadMessages)
            .pipe(operators_1.tap(function (data) {
            _this.reloadMessages = false;
        }));
    };
    UserService.prototype.deleteMessage = function (messageId) {
        return this.delete(this.baseUrl + "/message/" + messageId);
    };
    UserService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http,
            cache_service_1.CacheService])
    ], UserService);
    return UserService;
}(base_service_1.BaseService));
exports.UserService = UserService;
