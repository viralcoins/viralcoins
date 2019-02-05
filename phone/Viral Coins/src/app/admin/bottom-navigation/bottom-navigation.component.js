"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var operators_1 = require("rxjs/operators");
var BottomNavigationComponent = /** @class */ (function () {
    function BottomNavigationComponent(router, routerExtensions) {
        this.router = router;
        this.routerExtensions = routerExtensions;
    }
    BottomNavigationComponent.prototype.selectTab = function (navItemRoute) {
        this.routerExtensions.navigate([navItemRoute], {
            transition: {
                name: "fade"
            },
            clearHistory: true
        });
    };
    BottomNavigationComponent.prototype.ngOnInit = function () {
        this._activatedUrl = "/admin/home";
        var _this = this;
        this.router.events
            .pipe(operators_1.filter(function (event) { return event instanceof router_1.NavigationEnd; }))
            .subscribe(function (event) {
            setTimeout(function () {
                _this._activatedUrl = event.urlAfterRedirects;
            }, 150);
        });
    };
    BottomNavigationComponent.prototype.isComponentSelected = function (url) {
        return this._activatedUrl === url;
    };
    BottomNavigationComponent = __decorate([
        core_1.Component({
            selector: "bottom-navigation-admin",
            moduleId: module.id,
            templateUrl: "./bottom-navigation.component.html",
            styleUrls: ['./bottom-navigation.component.css']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_2.RouterExtensions])
    ], BottomNavigationComponent);
    return BottomNavigationComponent;
}());
exports.BottomNavigationComponent = BottomNavigationComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUF3RDtBQUN4RCxzREFBK0Q7QUFDL0QsNENBQXdDO0FBU3hDO0lBR0MsbUNBQ1MsTUFBYyxFQUNkLGdCQUFrQztRQURsQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtJQUMzQyxDQUFDO0lBRUEsNkNBQVMsR0FBVCxVQUFVLFlBQW9CO1FBQzVCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUM3QyxVQUFVLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07YUFDYjtZQUNELFlBQVksRUFBRSxJQUFJO1NBQ25CLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRiw0Q0FBUSxHQUFSO1FBQ0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDakMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTTthQUNoQixJQUFJLENBQUMsa0JBQU0sQ0FBQyxVQUFDLEtBQVUsSUFBSyxPQUFBLEtBQUssWUFBWSxzQkFBYSxFQUE5QixDQUE4QixDQUFDLENBQUM7YUFDNUQsU0FBUyxDQUFDLFVBQUMsS0FBb0I7WUFDM0IsVUFBVSxDQUFDO2dCQUNULEtBQUssQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGlCQUFpQixDQUFBO1lBQy9DLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELHVEQUFtQixHQUFuQixVQUFvQixHQUFXO1FBQzlCLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxHQUFHLENBQUM7SUFDbkMsQ0FBQztJQS9CVyx5QkFBeUI7UUFOckMsZ0JBQVMsQ0FBQztZQUNWLFFBQVEsRUFBRSx5QkFBeUI7WUFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSxvQ0FBb0M7WUFDakQsU0FBUyxFQUFFLENBQUMsbUNBQW1DLENBQUM7U0FDaEQsQ0FBQzt5Q0FLZ0IsZUFBTTtZQUNJLHlCQUFnQjtPQUwvQix5QkFBeUIsQ0FnQ3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQWhDRCxJQWdDQztBQWhDWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRW5kLCBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcblxuQENvbXBvbmVudCh7XG5cdHNlbGVjdG9yOiBcImJvdHRvbS1uYXZpZ2F0aW9uLWFkbWluXCIsXG5cdG1vZHVsZUlkOiBtb2R1bGUuaWQsXG5cdHRlbXBsYXRlVXJsOiBcIi4vYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50Lmh0bWxcIixcblx0c3R5bGVVcmxzOiBbJy4vYm90dG9tLW5hdmlnYXRpb24uY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJvdHRvbU5hdmlnYXRpb25Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXHRwcml2YXRlIF9hY3RpdmF0ZWRVcmw6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuXHRcdHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucykge1xuXHR9XG5cbiAgc2VsZWN0VGFiKG5hdkl0ZW1Sb3V0ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFtuYXZJdGVtUm91dGVdLCB7XG4gICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgIG5hbWU6IFwiZmFkZVwiXG4gICAgICB9LFxuICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgfSk7XG4gIH0gIFxuXG5cdG5nT25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuX2FjdGl2YXRlZFVybCA9IFwiL2FkbWluL2hvbWVcIjtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG5cdFx0dGhpcy5yb3V0ZXIuZXZlbnRzXG5cdFx0XHQucGlwZShmaWx0ZXIoKGV2ZW50OiBhbnkpID0+IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCkpXG5cdFx0XHQuc3Vic2NyaWJlKChldmVudDogTmF2aWdhdGlvbkVuZCkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgIF90aGlzLl9hY3RpdmF0ZWRVcmwgPSBldmVudC51cmxBZnRlclJlZGlyZWN0c1xuICAgICAgICB9LCAxNTApO1xuICAgICAgfSk7XG5cdH1cblxuXHRpc0NvbXBvbmVudFNlbGVjdGVkKHVybDogc3RyaW5nKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2FjdGl2YXRlZFVybCA9PT0gdXJsO1xuXHR9XG59XG5cbiJdfQ==