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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLDZCQUFzQztBQUN0Qyw0Q0FBaUQ7QUFDakQsc0NBQXdEO0FBQ3hELGlEQUErQztBQUMvQyxvQ0FBbUM7QUFHbkM7SUFJQyxxQkFDUSxJQUFVLEVBQ1IsWUFBMEI7UUFENUIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNSLGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBSjVCLFlBQU8sR0FBVyxlQUFNLENBQUMsTUFBTSxDQUFDO0lBS3BDLENBQUM7SUFFRyx5QkFBRyxHQUFWLFVBQVcsR0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUN4QixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsR0FBRyxJQUFNLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQ2xDLENBQUM7SUFDTixDQUFDO0lBRU0sMEJBQUksR0FBWCxVQUFZLEdBQVcsRUFBRSxJQUFTO1FBQ2hDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtZQUMvQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU0seUJBQUcsR0FBVixVQUFXLEdBQVcsRUFBRSxJQUFTO1FBQy9CLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRTtZQUM5QixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRU0sNEJBQU0sR0FBYixVQUFjLEdBQVc7UUFBekIsaUJBVUM7UUFUQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUM5QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRTtZQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFO1NBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsR0FBRztZQUNMLE9BQU8sR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxFQUNGLHNCQUFVLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFwQixDQUFvQixDQUFDLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRU0sK0JBQVMsR0FBaEIsVUFBaUIsR0FBVyxFQUFFLEdBQVcsRUFBRSxJQUFhO1FBQXhELGlCQUlDO1FBSEMsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFO1lBQzlDLE9BQU8sS0FBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQ0FBZ0IsR0FBaEI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQzVCLE9BQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDbkQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsU0FBUyxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQsa0NBQVksR0FBWixVQUFhLEtBQWU7UUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQixPQUFPLGlCQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFqRVUsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQU1FLFdBQUk7WUFDTSw0QkFBWTtPQU54QixXQUFXLENBa0V2QjtJQUFELGtCQUFDO0NBQUEsQUFsRUQsSUFrRUM7QUFsRVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBDYWNoZVNlcnZpY2UgfSBmcm9tICcuL2NhY2hlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEJhc2VTZXJ2aWNlIHtcblxuICBwdWJsaWMgYmFzZVVybDogc3RyaW5nID0gQ29uZmlnLmFwaVVybDtcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwdWJsaWMgaHR0cDogSHR0cCxcbiAgICBwdWJsaWMgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2Vcblx0XHQpIHt9XG5cbiAgcHVibGljIGdldCh1cmw6IHN0cmluZykge1xuICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KHVybCwge1xuICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKClcbiAgICB9KS5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHsgcmV0dXJuIHJlcy5qc29uKCkgfSlcbiAgICAgICk7XG4gIH1cblxuICBwdWJsaWMgcG9zdCh1cmw6IHN0cmluZywgZGF0YTogYW55KSB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSwge1xuICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKClcbiAgICB9KS5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHsgXG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgICAgfSlcbiAgICAgICk7ICAgIFxuICB9ICBcblxuICBwdWJsaWMgcHV0KHVybDogc3RyaW5nLCBkYXRhOiBhbnkpIHtcbiAgICByZXR1cm4gdGhpcy5odHRwLnB1dCh1cmwsIGRhdGEsIHtcbiAgICAgIGhlYWRlcnM6IHRoaXMuZ2V0Q29tbW9uSGVhZGVycygpXG4gICAgfSkucGlwZShcbiAgICAgICAgbWFwKHJlcyA9PiB7IFxuICAgICAgICAgIHJldHVybiByZXMuanNvbigpXG4gICAgICAgIH0pXG4gICAgICApOyAgICBcbiAgfVxuXG4gIHB1YmxpYyBkZWxldGUodXJsOiBzdHJpbmcpIHtcbiAgICBjb25zb2xlLmxvZyhcIkRlbGV0ZTogXCIgKyB1cmwpO1xuICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKHVybCwge1xuICAgICAgaGVhZGVyczogdGhpcy5nZXRDb21tb25IZWFkZXJzKClcbiAgICB9KS5waXBlKFxuICAgICAgICBtYXAocmVzID0+IHsgXG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKClcbiAgICAgICAgfSksXG4gICAgICAgIGNhdGNoRXJyb3IoZSA9PiB0aGlzLmhhbmRsZUVycm9ycyhlKSlcbiAgICAgICk7ICAgIFxuICB9ICAgIFxuXG4gIHB1YmxpYyBnZXRDYWNoZWQodXJsOiBzdHJpbmcsIGtleTogc3RyaW5nLCBmbGFnOiBib29sZWFuKSB7XG4gICAgcmV0dXJuIHRoaXMuY2FjaGVTZXJ2aWNlLmhhbmRsZUNhY2hlKGZsYWcsIGtleSwgKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0KHVybCk7XG4gICAgfSk7ICAgIFxuICB9XG5cbiAgZ2V0Q29tbW9uSGVhZGVycygpIHtcbiAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKCk7XG4gICAgaGVhZGVycy5hcHBlbmQoXCJDb250ZW50LVR5cGVcIiwgXCJhcHBsaWNhdGlvbi9qc29uXCIpO1xuICAgIGhlYWRlcnMuYXBwZW5kKFwiQXV0aG9yaXphdGlvblwiLCBcIkJlYXJlciBcIiArIENvbmZpZy50b2tlbik7XG4gICAgcmV0dXJuIGhlYWRlcnM7XG4gIH1cblxuICBoYW5kbGVFcnJvcnMoZXJyb3I6IFJlc3BvbnNlKSB7XG4gICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcbiAgfVxufSJdfQ==