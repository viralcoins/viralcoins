"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var appSettings = require("tns-core-modules/application-settings");
var config_1 = require("./config");
var loading_service_1 = require("./services/loading.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(routerExtensions, loadingService) {
        var _this = this;
        this.routerExtensions = routerExtensions;
        this.loadingService = loadingService;
        this.isLoading = false;
        this.loadingService.isLoading.subscribe(function (isLoading) {
            _this.isLoading = isLoading;
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        var token = appSettings.getString("token");
        if (token) {
            config_1.Config.token = token;
            this.routerExtensions.navigate(['/main/home'], {
                clearHistory: true
            });
        }
        else {
            this.routerExtensions.navigate(['/login'], {
                clearHistory: true
            });
        }
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: "ns-app",
            templateUrl: "app.component.html"
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            loading_service_1.LoadingService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsc0RBQStEO0FBQy9ELG1FQUFxRTtBQUNyRSxtQ0FBa0M7QUFDbEMsOERBQTREO0FBTzVEO0lBSUUsc0JBQ1UsZ0JBQWtDLEVBQ2xDLGNBQThCO1FBRnhDLGlCQU9DO1FBTlMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFKeEMsY0FBUyxHQUFHLEtBQUssQ0FBQztRQU1oQixJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBQSxTQUFTO1lBQy9DLEtBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELCtCQUFRLEdBQVI7UUFDRSxJQUFJLEtBQUssR0FBVyxXQUFXLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksS0FBSyxFQUFFO1lBQ1QsZUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksQ0FBQyxFQUFFO2dCQUM3QyxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6QyxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUF6QlUsWUFBWTtRQUx4QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDbEMsQ0FBQzt5Q0FNNEIseUJBQWdCO1lBQ2xCLGdDQUFjO09BTjdCLFlBQVksQ0EwQnhCO0lBQUQsbUJBQUM7Q0FBQSxBQTFCRCxJQTBCQztBQTFCWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvbi1zZXR0aW5nc1wiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4vY29uZmlnXCI7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGlzTG9hZGluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICApIHtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLmlzTG9hZGluZy5zdWJzY3JpYmUoaXNMb2FkaW5nID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gaXNMb2FkaW5nO1xuICAgIH0pOyAgICBcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHZhciB0b2tlbjogc3RyaW5nID0gYXBwU2V0dGluZ3MuZ2V0U3RyaW5nKFwidG9rZW5cIik7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICBDb25maWcudG9rZW4gPSB0b2tlbjtcbiAgICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy9tYWluL2hvbWUnXSwge1xuICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMubmF2aWdhdGUoWycvbG9naW4nXSwge1xuICAgICAgICBjbGVhckhpc3Rvcnk6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19