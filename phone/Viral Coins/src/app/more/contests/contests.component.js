"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var list_view_component_1 = require("../../components/list-view.component");
var coin_service_1 = require("../../services/coin.service");
var page_1 = require("ui/page");
var loading_service_1 = require("../../services/loading.service");
var ContestsComponent = /** @class */ (function (_super) {
    __extends(ContestsComponent, _super);
    function ContestsComponent(coinService, page, loadingService) {
        var _this = _super.call(this, loadingService) || this;
        _this.coinService = coinService;
        _this.page = page;
        _this.loadingService = loadingService;
        _this.templateSelectorFunction = function (item, index, items) {
            return item.type == "empty" ? "empty" : "standard";
        };
        page.actionBarHidden = true;
        return _this;
    }
    ContestsComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.load();
    };
    ContestsComponent.prototype.getData = function () {
        return this.coinService.getContests();
    };
    ContestsComponent.prototype.onContestTap = function () {
    };
    ContestsComponent = __decorate([
        core_1.Component({
            selector: 'ns-contests',
            templateUrl: './contests.component.html',
            styleUrls: ['./contests.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            page_1.Page,
            loading_service_1.LoadingService])
    ], ContestsComponent);
    return ContestsComponent;
}(list_view_component_1.ListViewComponent));
exports.ContestsComponent = ContestsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVzdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGVzdHMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDRFQUF5RTtBQUV6RSw0REFBMEQ7QUFDMUQsZ0NBQStCO0FBRS9CLGtFQUFnRTtBQVFoRTtJQUF1QyxxQ0FBaUI7SUFFdEQsMkJBQ1UsV0FBd0IsRUFDeEIsSUFBVSxFQUNYLGNBQThCO1FBSHZDLFlBS0Usa0JBQU0sY0FBYyxDQUFDLFNBRXRCO1FBTlMsaUJBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsVUFBSSxHQUFKLElBQUksQ0FBTTtRQUNYLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVc3Qiw4QkFBd0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBVTtZQUN4RSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztRQUNyRCxDQUFDLENBQUE7UUFWQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7SUFDOUIsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBTU0sbUNBQU8sR0FBZDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBRUQsd0NBQVksR0FBWjtJQUVBLENBQUM7SUExQlUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsYUFBYTtZQUN2QixXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLFNBQVMsRUFBRSxDQUFDLDBCQUEwQixDQUFDO1lBQ3ZDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQUl1QiwwQkFBVztZQUNsQixXQUFJO1lBQ0ssZ0NBQWM7T0FMNUIsaUJBQWlCLENBNEI3QjtJQUFELHdCQUFDO0NBQUEsQUE1QkQsQ0FBdUMsdUNBQWlCLEdBNEJ2RDtBQTVCWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgQ29pblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtY29udGVzdHMnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29udGVzdHMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb250ZXN0cy5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlc3RzQ29tcG9uZW50IGV4dGVuZHMgTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgICBwdWJsaWMgbG9hZGluZ1NlcnZpY2U6IExvYWRpbmdTZXJ2aWNlXG4gICkgeyAgICBcbiAgICBzdXBlcihsb2FkaW5nU2VydmljZSk7XG4gICAgcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLmxvYWQoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB0ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb24gPSAoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBpdGVtczogYW55KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gaXRlbS50eXBlID09IFwiZW1wdHlcIiA/IFwiZW1wdHlcIiA6IFwic3RhbmRhcmRcIjtcbiAgfSAgICBcblxuICBwdWJsaWMgZ2V0RGF0YSgpOiBPYnNlcnZhYmxlPGFueT4ge1xuICAgIHJldHVybiB0aGlzLmNvaW5TZXJ2aWNlLmdldENvbnRlc3RzKCk7XG4gIH1cblxuICBvbkNvbnRlc3RUYXAoKTogdm9pZCB7XG4gICAgXG4gIH1cblxufVxuIl19