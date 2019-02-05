"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var user_service_1 = require("../../services/user.service");
var router_1 = require("nativescript-angular/router");
var AccountComponent = /** @class */ (function () {
    function AccountComponent(page, userService, routerExtensions) {
        this.page = page;
        this.userService = userService;
        this.routerExtensions = routerExtensions;
        this.isLoading = true;
        this.page.actionBarHidden = true;
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this_1 = this;
        this.page.actionBarHidden = true;
        if (!this.userService.currentUserValue) {
            this.userService.getUser().subscribe(function (user) {
                _this_1.user = user;
                _this_1.isLoading = false;
            });
        }
        else {
            this.user = this.userService.currentUserValue;
            this.isLoading = false;
        }
    };
    AccountComponent.prototype.onSaveTap = function () {
        this.userService.update({
            first: this.user.profile.first,
            last: this.user.profile.last,
            email: this.user.email
        }).subscribe(function () {
            alert("Your account was updated.");
        }, function (err) { return alert("We were unable to update your account" + err); });
    };
    AccountComponent.prototype.onLogOutTap = function () {
        var _this = this;
        this.userService.logout();
        setTimeout(function () {
            _this.routerExtensions.navigate(['/login'], {
                clearHistory: true
            });
        });
    };
    AccountComponent = __decorate([
        core_1.Component({
            selector: "account",
            moduleId: module.id,
            templateUrl: "./account.component.html",
            styleUrls: ['./account.component.css']
        }),
        __metadata("design:paramtypes", [page_1.Page,
            user_service_1.UserService,
            router_1.RouterExtensions])
    ], AccountComponent);
    return AccountComponent;
}());
exports.AccountComponent = AccountComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY2NvdW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxnQ0FBK0I7QUFDL0IsNERBQTBEO0FBRTFELHNEQUErRDtBQVUvRDtJQUlFLDBCQUNVLElBQVUsRUFDVixXQUF3QixFQUN4QixnQkFBa0M7UUFGbEMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFONUMsY0FBUyxHQUFHLElBQUksQ0FBQztRQVFmLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUNuQyxDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUFBLG1CQVdDO1FBVkMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFO1lBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtnQkFDdkMsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ2pCLE9BQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQztZQUM5QyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztTQUN4QjtJQUNILENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7WUFDdEIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUs7WUFDOUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUk7WUFDNUIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSztTQUN2QixDQUFDLENBQUMsU0FBUyxDQUNWO1lBQ0UsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUNELFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSyxDQUFDLHVDQUF1QyxHQUFHLEdBQUcsQ0FBQyxFQUFwRCxDQUFvRCxDQUM5RCxDQUFDO0lBQ0osQ0FBQztJQUVELHNDQUFXLEdBQVg7UUFDRSxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixVQUFVLENBQUM7WUFDVCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzFDLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTlDVSxnQkFBZ0I7UUFONUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsMEJBQTBCO1lBQ3ZDLFNBQVMsRUFBRSxDQUFDLHlCQUF5QixDQUFDO1NBQ3ZDLENBQUM7eUNBTWdCLFdBQUk7WUFDRywwQkFBVztZQUNOLHlCQUFnQjtPQVBqQyxnQkFBZ0IsQ0ErQzVCO0lBQUQsdUJBQUM7Q0FBQSxBQS9DRCxJQStDQztBQS9DWSw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0ICogYXMgYXBwU2V0dGluZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBVc2VyIH0gZnJvbSAnLi4vLi4vbW9kZWxzL3VzZXIubW9kZWwnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYWNjb3VudFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2FjY291bnQuY29tcG9uZW50Lmh0bWxcIixcbiAgc3R5bGVVcmxzOiBbJy4vYWNjb3VudC5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3VudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGlzTG9hZGluZyA9IHRydWU7XG4gIHVzZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xuICApIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfSAgXG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gICAgaWYgKCF0aGlzLnVzZXJTZXJ2aWNlLmN1cnJlbnRVc2VyVmFsdWUpIHtcbiAgICAgIHRoaXMudXNlclNlcnZpY2UuZ2V0VXNlcigpLnN1YnNjcmliZSh1c2VyID0+IHsgICAgICAgIFxuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXNlciA9IHRoaXMudXNlclNlcnZpY2UuY3VycmVudFVzZXJWYWx1ZTtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgb25TYXZlVGFwKCkge1xuICAgIHRoaXMudXNlclNlcnZpY2UudXBkYXRlKHtcbiAgICAgIGZpcnN0OiB0aGlzLnVzZXIucHJvZmlsZS5maXJzdCxcbiAgICAgIGxhc3Q6IHRoaXMudXNlci5wcm9maWxlLmxhc3QsXG4gICAgICBlbWFpbDogdGhpcy51c2VyLmVtYWlsXG4gICAgfSkuc3Vic2NyaWJlKFxuICAgICAgKCkgPT4ge1xuICAgICAgICBhbGVydChcIllvdXIgYWNjb3VudCB3YXMgdXBkYXRlZC5cIik7XG4gICAgICB9LFxuICAgICAgKGVycikgPT4gYWxlcnQoXCJXZSB3ZXJlIHVuYWJsZSB0byB1cGRhdGUgeW91ciBhY2NvdW50XCIgKyBlcnIpXG4gICAgKTtcbiAgfVxuXG4gIG9uTG9nT3V0VGFwKCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ291dCgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL2xvZ2luJ10sIHtcbiAgICAgICAgY2xlYXJIaXN0b3J5OiB0cnVlXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuIl19