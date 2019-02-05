"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var user_service_1 = require("../../services/user.service");
var page_1 = require("ui/page");
var MoreComponent = /** @class */ (function () {
    function MoreComponent(routerExtensions, userService, page) {
        this.routerExtensions = routerExtensions;
        this.userService = userService;
        this.page = page;
        page.actionBarHidden = true;
    }
    MoreComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.page.actionBarHidden = true;
        if (!this.userService.currentUserValue) {
            this.userService.getUser().subscribe(function (user) {
                _this.user = user;
            });
        }
        else {
            this.user = this.userService.currentUserValue;
        }
    };
    MoreComponent.prototype.onNavigate = function (url) {
        this.routerExtensions.navigate([url], {
            transition: {
                name: "slideLeft"
            }
        });
    };
    MoreComponent = __decorate([
        core_1.Component({
            selector: 'ns-more',
            templateUrl: './more.component.html',
            styleUrls: ['./more.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions,
            user_service_1.UserService,
            page_1.Page])
    ], MoreComponent);
    return MoreComponent;
}());
exports.MoreComponent = MoreComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9yZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtb3JlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCxzREFBK0Q7QUFDL0QsNERBQTBEO0FBQzFELGdDQUErQjtBQVEvQjtJQUlFLHVCQUNTLGdCQUFrQyxFQUNqQyxXQUF3QixFQUN4QixJQUFVO1FBRlgscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBRWxCLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQzlCLENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQUEsaUJBU0M7UUFSQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO2dCQUN2QyxLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQsa0NBQVUsR0FBVixVQUFXLEdBQVc7UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3BDLFVBQVUsRUFBRTtnQkFDVixJQUFJLEVBQUUsV0FBVzthQUNsQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUE3QlUsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLHVCQUF1QjtZQUNwQyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztZQUNuQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FNMkIseUJBQWdCO1lBQ3BCLDBCQUFXO1lBQ2xCLFdBQUk7T0FQVCxhQUFhLENBOEJ6QjtJQUFELG9CQUFDO0NBQUEsQUE5QkQsSUE4QkM7QUE5Qlksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvdXNlci5zZXJ2aWNlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1tb3JlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21vcmUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tb3JlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgTW9yZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgdXNlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgXHRwcml2YXRlIHJvdXRlckV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgcHJpdmF0ZSB1c2VyU2VydmljZTogVXNlclNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlXG4gICkge1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGlmICghdGhpcy51c2VyU2VydmljZS5jdXJyZW50VXNlclZhbHVlKSB7XG4gICAgICB0aGlzLnVzZXJTZXJ2aWNlLmdldFVzZXIoKS5zdWJzY3JpYmUodXNlciA9PiB7XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51c2VyID0gdGhpcy51c2VyU2VydmljZS5jdXJyZW50VXNlclZhbHVlO1xuICAgIH0gICAgXG4gIH1cblxuICBvbk5hdmlnYXRlKHVybDogc3RyaW5nKSB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFt1cmxdLCB7XG4gICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgIG5hbWU6IFwic2xpZGVMZWZ0XCJcbiAgICAgIH1cbiAgICB9KTsgICAgXG4gIH1cbn1cbiJdfQ==