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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FjaGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNhY2hlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFDM0MsbUVBQXFFO0FBQ3JFLDZCQUFzQztBQUN0Qyw0Q0FBaUQ7QUFHakQ7SUFEQTtRQUdFLGFBQVEsR0FBRyxLQUFLLENBQUM7SUErQm5CLENBQUM7SUE3QkMsNEJBQUssR0FBTCxVQUFNLEdBQVcsRUFBRSxLQUFVO1FBQzNCLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsMkJBQUksR0FBSixVQUFLLEdBQVc7UUFDZCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDNUMsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFBWSxJQUFJLEVBQUUsR0FBRyxFQUFFLGFBQWE7UUFBcEMsaUJBbUJDO1FBbEJDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUM5QyxJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEdBQUcsR0FBRyxHQUFHLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBRSxDQUFDO1lBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztZQUM5QyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ2IsT0FBTyxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQ3pCLGVBQUcsQ0FBQyxVQUFBLElBQUk7Z0JBQ04sS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQ0gsQ0FBQztTQUNIO2FBQU07WUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDLENBQUM7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQzlDLE9BQU8sU0FBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25CO0lBQ0gsQ0FBQztJQWhDVSxZQUFZO1FBRHhCLGlCQUFVLEVBQUU7T0FDQSxZQUFZLENBaUN4QjtJQUFELG1CQUFDO0NBQUEsQUFqQ0QsSUFpQ0M7QUFqQ1ksb0NBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCAqIGFzIGFwcFNldHRpbmdzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBvZiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBDYWNoZVNlcnZpY2Uge1xuXG4gIG92ZXJyaWRlID0gZmFsc2U7XG5cbiAgc3RvcmUoa2V5OiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBhbnkge1xuICAgIGFwcFNldHRpbmdzLnNldFN0cmluZyhrZXksIEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XG4gIH1cblxuICBsb2FkKGtleTogc3RyaW5nKTogYW55IHtcbiAgICBsZXQgb2JqZWN0ID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKGtleSk7XG4gICAgcmV0dXJuIG9iamVjdCA/IEpTT04ucGFyc2Uob2JqZWN0KSA6IG51bGw7XG4gIH1cblxuICBoYW5kbGVDYWNoZShmbGFnLCBrZXksIHJlZnJlc2hNZXRob2QpIHtcbiAgICBjb25zb2xlLmxvZyhcIioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlwiKTtcbiAgICBjb25zdCBvYmplY3QgPSB0aGlzLmxvYWQoa2V5KTtcbiAgICBpZiAoIW9iamVjdCB8fCBmbGFnIHx8IHRoaXMub3ZlcnJpZGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiKiBMb2FkaW5nIFwiICsga2V5ICsgXCIgZnJvbSBzZXJ2ZXJcIik7XG4gICAgICBjb25zb2xlLmxvZyhcIiogQmVjYXVzZSBcIiArIGZsYWcgKTtcbiAgICAgIGNvbnNvbGUubG9nKFwiKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXCIpO1xuICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuIHJlZnJlc2hNZXRob2QoKS5waXBlKFxuICAgICAgICBtYXAoZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5zdG9yZShrZXksIGRhdGEpO1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coXCIqIExvYWRpbmcgXCIgKyBrZXkgKyBcIiBmcm9tIGNhY2hlXCIpO1xuICAgICAgY29uc29sZS5sb2coXCIqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcIik7XG4gICAgICByZXR1cm4gb2Yob2JqZWN0KTtcbiAgICB9ICAgIFxuICB9ICBcbn1cbiJdfQ==