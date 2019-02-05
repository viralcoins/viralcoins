"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var loading_service_1 = require("../services/loading.service");
var MainComponent = /** @class */ (function () {
    function MainComponent(loadingService) {
        this.loadingService = loadingService;
        this.isLoading = false;
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent.prototype.onStartScan = function () {
        this.loadingService.setLoading(true);
    };
    MainComponent.prototype.onEndScan = function () {
        this.loadingService.setLoading(false);
    };
    MainComponent = __decorate([
        core_1.Component({
            selector: 'ns-main',
            templateUrl: './main.component.html',
            styleUrls: ['./main.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [loading_service_1.LoadingService])
    ], MainComponent);
    return MainComponent;
}());
exports.MainComponent = MainComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYWluLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwrREFBNkQ7QUFTN0Q7SUFHRSx1QkFDVSxjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFIeEMsY0FBUyxHQUFHLEtBQUssQ0FBQztJQUtsQixDQUFDO0lBRUQsZ0NBQVEsR0FBUjtJQUVBLENBQUM7SUFFRCxtQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUVELGlDQUFTLEdBQVQ7UUFDRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBbEJVLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxTQUFTO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7WUFDbkMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBSzBCLGdDQUFjO09BSjdCLGFBQWEsQ0FvQnpCO0lBQUQsb0JBQUM7Q0FBQSxBQXBCRCxJQW9CQztBQXBCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbWFpbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9tYWluLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWFpbi5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIE1haW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICAgICkge1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG5cbiAgfVxuXG4gIG9uU3RhcnRTY2FuKCk6IHZvaWQge1xuICAgIHRoaXMubG9hZGluZ1NlcnZpY2Uuc2V0TG9hZGluZyh0cnVlKTtcbiAgfVxuXG4gIG9uRW5kU2NhbigpOiB2b2lkIHtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNldExvYWRpbmcoZmFsc2UpO1xuICB9XG5cbn1cbiJdfQ==