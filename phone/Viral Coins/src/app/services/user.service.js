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
    UserService.prototype.logout = function () {
        appSettings.clear();
        this.currentUserSubject.next(null);
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
    UserService.prototype.addFeedItem = function (item) {
        return this.post(this.baseUrl + '/feed', item);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLHNDQUF3RDtBQUN4RCw2QkFBbUQ7QUFDbkQsNENBQXNEO0FBR3RELDJEQUF5RDtBQUN6RCxvQ0FBbUM7QUFDbkMsbUVBQXFFO0FBQ3JFLCtDQUE2QztBQUc3QztJQUFpQywrQkFBVztJQVExQyxxQkFDUyxJQUFVLEVBQ1YsWUFBMEI7UUFGbkMsWUFJRSxrQkFBTSxJQUFJLEVBQUUsWUFBWSxDQUFDLFNBRzFCO1FBTlEsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBUDVCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLG9CQUFjLEdBQUcsS0FBSyxDQUFDO1FBTzVCLEtBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLHNCQUFlLENBQU0sSUFBSSxDQUFDLENBQUM7UUFDekQsS0FBSSxDQUFDLFdBQVcsR0FBRyxLQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7O0lBQzVELENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsSUFBVTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUU7WUFDNUMsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7U0FDeEIsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNCQUFXLHlDQUFnQjthQUEzQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQztRQUN2QyxDQUFDOzs7T0FBQTtJQUVELGlDQUFXLEdBQVg7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LFVBQVksSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLE9BQU87UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsVUFBVSxFQUFFO1lBQ3hDLE9BQU8sRUFBRSxPQUFPO1NBQ2pCLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQUEsaUJBT0M7UUFOQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUM7YUFDL0UsSUFBSSxDQUNILGVBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM5QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxTQUFTO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBM0hVLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FVSSxXQUFJO1lBQ0ksNEJBQVk7T0FWeEIsV0FBVyxDQTRIdkI7SUFBRCxrQkFBQztDQUFBLEFBNUhELENBQWlDLDBCQUFXLEdBNEgzQztBQTVIWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSBcInJ4anNcIjtcbmltcG9ydCB7IGNhdGNoRXJyb3IsIG1hcCwgdGFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXNlclNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG4gIHByaXZhdGUgY3VycmVudFVzZXJTdWJqZWN0OiBCZWhhdmlvclN1YmplY3Q8VXNlcj47XG4gIHB1YmxpYyBjdXJyZW50VXNlcjogT2JzZXJ2YWJsZTxVc2VyPjtcbiAgcHVibGljIHJlbG9hZEFsbFVzZXJzID0gZmFsc2U7XG4gIHB1YmxpYyByZWxvYWRVc2VyID0gZmFsc2U7XG4gIHB1YmxpYyByZWZyZXNoRmVlZCA9IGZhbHNlO1xuICBwdWJsaWMgcmVsb2FkTWVzc2FnZXMgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgaHR0cDogSHR0cCxcbiAgICBwdWJsaWMgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2VcbiAgKSB7XG4gICAgc3VwZXIoaHR0cCwgY2FjaGVTZXJ2aWNlKTtcbiAgICB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8YW55PihudWxsKTtcbiAgICB0aGlzLmN1cnJlbnRVc2VyID0gdGhpcy5jdXJyZW50VXNlclN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICByZWdpc3Rlcih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCh0aGlzLmJhc2VVcmwgKyBcIi91c2VyL3NpZ251cFwiLCB7XG4gICAgICAgIHVzZXJuYW1lOiB1c2VyLnVzZXJuYW1lLFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbCxcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldCBjdXJyZW50VXNlclZhbHVlKCk6IFVzZXIge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC52YWx1ZTtcbiAgfVxuXG4gIGdldEFsbFVzZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmdldENhY2hlZCh0aGlzLmJhc2VVcmwgKyBcIi91c2VyL2FsbFwiLCBcImFsbHVzZXJzXCIsIHRoaXMucmVsb2FkQWxsVXNlcnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucmVsb2FkQWxsVXNlcnMgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICk7ICAgIFxuICB9XG5cbiAgZ2V0VXNlcigpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQodGhpcy5iYXNlVXJsICsgXCIvdXNlclwiLCBcInVzZXJcIiwgdGhpcy5yZWxvYWRVc2VyKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnJlbG9hZFVzZXIgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBsb2dpbih1c2VyOiBVc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdChcbiAgICAgIHRoaXMuYmFzZVVybCArIFwiL3VzZXIvYXV0aFwiLFxuICAgICAge1xuICAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IHVzZXIucGFzc3dvcmRcbiAgICAgIH0pLnBpcGUoXG4gICAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnRVc2VyU3ViamVjdC5uZXh0KGRhdGEudXNlcik7XG4gICAgICAgICAgYXBwU2V0dGluZ3Muc2V0U3RyaW5nKFwidG9rZW5cIiwgZGF0YS50b2tlbik7XG4gICAgICAgICAgQ29uZmlnLnRva2VuID0gZGF0YS50b2tlbjtcbiAgICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgbG9nb3V0KCkge1xuICAgIGFwcFNldHRpbmdzLmNsZWFyKCk7ICAgIFxuICAgIHRoaXMuY3VycmVudFVzZXJTdWJqZWN0Lm5leHQobnVsbCk7XG4gIH0gIFxuXG4gIHVwZGF0ZSh1c2VyOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KFxuICAgICAgdGhpcy5iYXNlVXJsICsgXCIvdXNlclwiLFxuICAgICAge1xuICAgICAgICBmaXJzdDogdXNlci5maXJzdCxcbiAgICAgICAgbGFzdDogdXNlci5sYXN0LFxuICAgICAgICBlbWFpbDogdXNlci5lbWFpbFxuICAgICAgfVxuICAgICkucGlwZShcbiAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgdGhpcy5jdXJyZW50VXNlclN1YmplY3QubmV4dChkYXRhKTtcbiAgICAgIH0pLFxuICAgICAgY2F0Y2hFcnJvcih0aGlzLmhhbmRsZUVycm9ycylcbiAgICApO1xuICB9XG5cbiAgZm9yZ290UGFzc3dvcmQoZW1haWw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLnBvc3QodGhpcy5iYXNlVXJsICsgXCIvcGFzc3dvcmQvZm9yZ290XCIsIHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9KTtcbiAgfVxuXG4gIGZlZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKHRoaXMuYmFzZVVybCArIFwiL2ZlZWRcIiwgXCJmZWVkXCIsIHRoaXMucmVmcmVzaEZlZWQpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucmVmcmVzaEZlZWQgPSBmYWxzZTsgICAgICAgICAgXG4gICAgICAgIH0pXG4gICAgICApOyAgIFxuICB9XG5cbiAgZGVsZXRlRmVlZEl0ZW0oaWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGUodGhpcy5iYXNlVXJsICsgXCIvZmVlZC9cIiArIGlkKTtcbiAgfVxuXG4gIGFkZEZlZWRJdGVtKGl0ZW0pIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KHRoaXMuYmFzZVVybCArICcvZmVlZCcsIGl0ZW0pO1xuICB9XG5cbiAgc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgIHJldHVybiB0aGlzLnBvc3QodGhpcy5iYXNlVXJsICsgXCIvbWVzc2FnZVwiLCB7XG4gICAgICAgIGNvbnRlbnQ6IG1lc3NhZ2VcbiAgICAgIH0pO1xuICB9XG5cbiAgbWVzc2FnZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKHRoaXMuYmFzZVVybCArIFwiL21lc3NhZ2VzXCIsIFwibWVzc2FnZXNcIiwgdGhpcy5yZWxvYWRNZXNzYWdlcylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWxvYWRNZXNzYWdlcyA9IGZhbHNlOyAgICAgICAgICBcbiAgICAgICAgfSlcbiAgICAgICk7ICAgICBcbiAgfVxuXG4gIGRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsZXRlKHRoaXMuYmFzZVVybCArIFwiL21lc3NhZ2UvXCIgKyBtZXNzYWdlSWQpO1xuICB9ICBcbn1cbiJdfQ==