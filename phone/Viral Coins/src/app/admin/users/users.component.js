"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var list_view_component_1 = require("../../components/list-view.component");
var loading_service_1 = require("../../services/loading.service");
var UsersComponent = /** @class */ (function (_super) {
    __extends(UsersComponent, _super);
    function UsersComponent(userService, loadingService) {
        var _this = _super.call(this, loadingService) || this;
        _this.userService = userService;
        _this.loadingService = loadingService;
        _this.templateSelectorFunction = function (item, index, items) {
            return item.type == null ? 'user' : 'empty';
        };
        return _this;
    }
    UsersComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.load();
    };
    UsersComponent.prototype.getData = function () {
        return this.userService.getAllUsers();
    };
    UsersComponent.prototype.doReload = function () {
        this.userService.reloadAllUsers = true;
    };
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'ns-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            loading_service_1.LoadingService])
    ], UsersComponent);
    return UsersComponent;
}(list_view_component_1.ListViewComponent));
exports.UsersComponent = UsersComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlcnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDREQUEwRDtBQUUxRCw0RUFBeUU7QUFFekUsa0VBQWdFO0FBUWhFO0lBQW9DLGtDQUFpQjtJQUVuRCx3QkFDVSxXQUF3QixFQUN6QixjQUE4QjtRQUZ2QyxZQUlFLGtCQUFNLGNBQWMsQ0FBQyxTQUN0QjtRQUpTLGlCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3pCLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWNoQyw4QkFBd0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBVTtZQUNyRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUM5QyxDQUFDLENBQUE7O0lBYkQsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0NBQU8sR0FBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUN2QyxDQUFDO0lBTU0saUNBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBeEJVLGNBQWM7UUFOMUIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFFLENBQUMsdUJBQXVCLENBQUM7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBSXVCLDBCQUFXO1lBQ1QsZ0NBQWM7T0FKNUIsY0FBYyxDQXlCMUI7SUFBRCxxQkFBQztDQUFBLEFBekJELENBQW9DLHVDQUFpQixHQXlCcEQ7QUF6Qlksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBMaXN0Vmlld0NvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvbGlzdC12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2xvYWRpbmcuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXVzZXJzJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3VzZXJzLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdXNlcnMuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBVc2Vyc0NvbXBvbmVudCBleHRlbmRzIExpc3RWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwdWJsaWMgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlXG4gICAgKSB7XG4gICAgc3VwZXIobG9hZGluZ1NlcnZpY2UpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmxvYWQoKTsgICAgXG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHJldHVybiB0aGlzLnVzZXJTZXJ2aWNlLmdldEFsbFVzZXJzKClcbiAgfSAgICBcblxuICBwdWJsaWMgdGVtcGxhdGVTZWxlY3RvckZ1bmN0aW9uID0gKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgcmV0dXJuIGl0ZW0udHlwZSA9PSBudWxsID8gJ3VzZXInIDogJ2VtcHR5JztcbiAgfSAgICBcblxuICBwdWJsaWMgZG9SZWxvYWQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5yZWxvYWRBbGxVc2VycyA9IHRydWU7ICAgIFxuICB9XG59XG4iXX0=