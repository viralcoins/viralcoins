"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(routerExtensions) {
        this.routerExtensions = routerExtensions;
        this.onMessage = new core_1.EventEmitter();
        this.onClose = new core_1.EventEmitter();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onBackTap = function () {
        if (this.link) {
            this.routerExtensions.navigate([this.link], {
                transition: {
                    name: "slideRight"
                }
            });
        }
        else {
            this.routerExtensions.back();
        }
    };
    HeaderComponent.prototype.onMessageTap = function () {
        this.onMessage.emit();
    };
    HeaderComponent.prototype.onCloseTap = function () {
        this.onClose.emit();
    };
    __decorate([
        core_1.Output('onMessage'),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "onMessage", void 0);
    __decorate([
        core_1.Output('onClose'),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "onClose", void 0);
    __decorate([
        core_1.Input('left'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "left", void 0);
    __decorate([
        core_1.Input('right'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "right", void 0);
    __decorate([
        core_1.Input('link'),
        __metadata("design:type", String)
    ], HeaderComponent.prototype, "link", void 0);
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'vc-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [router_1.RouterExtensions])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0U7QUFDL0Usc0RBQStEO0FBUS9EO0lBUUUseUJBQ1MsZ0JBQWtDO1FBQWxDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFQdEIsY0FBUyxHQUFHLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQ2pDLFlBQU8sR0FBRyxJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQU81QyxDQUFDO0lBRUwsa0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCxtQ0FBUyxHQUFUO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztnQkFDekMsVUFBVSxFQUFFO29CQUNWLElBQUksRUFBRSxZQUFZO2lCQUNuQjthQUNGLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsc0NBQVksR0FBWjtRQUNFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELG9DQUFVLEdBQVY7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUEvQm9CO1FBQXBCLGFBQU0sQ0FBQyxXQUFXLENBQUM7O3NEQUFnQztJQUNqQztRQUFsQixhQUFNLENBQUMsU0FBUyxDQUFDOztvREFBOEI7SUFDakM7UUFBZCxZQUFLLENBQUMsTUFBTSxDQUFDOztpREFBYztJQUNaO1FBQWYsWUFBSyxDQUFDLE9BQU8sQ0FBQzs7a0RBQWU7SUFDZjtRQUFkLFlBQUssQ0FBQyxNQUFNLENBQUM7O2lEQUFjO0lBTmpCLGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFdBQVcsRUFBRSx5QkFBeUI7WUFDdEMsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUM7WUFDckMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBVTJCLHlCQUFnQjtPQVRoQyxlQUFlLENBbUMzQjtJQUFELHNCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7QUFuQ1ksMENBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd2Yy1oZWFkZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vaGVhZGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBAT3V0cHV0KCdvbk1lc3NhZ2UnKSBvbk1lc3NhZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoJ29uQ2xvc2UnKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ2xlZnQnKSBsZWZ0OiBzdHJpbmc7XG4gIEBJbnB1dCgncmlnaHQnKSByaWdodDogc3RyaW5nO1xuICBASW5wdXQoJ2xpbmsnKSBsaW5rOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gIFx0cHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zXG4gICkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gIH1cblxuICBvbkJhY2tUYXAoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGluaykge1xuICAgICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFt0aGlzLmxpbmtdLHtcbiAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgIG5hbWU6IFwic2xpZGVSaWdodFwiXG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpOyAgICAgIFxuICAgIH1cbiAgfSAgXG5cbiAgb25NZXNzYWdlVGFwKCk6IHZvaWQge1xuICAgIHRoaXMub25NZXNzYWdlLmVtaXQoKTtcbiAgfVxuXG4gIG9uQ2xvc2VUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNsb3NlLmVtaXQoKTtcbiAgfVxuXG59XG4iXX0=