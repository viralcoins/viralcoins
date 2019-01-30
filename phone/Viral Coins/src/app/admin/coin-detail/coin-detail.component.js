"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialogs = require("tns-core-modules/ui/dialogs");
var coin_service_1 = require("../../services/coin.service");
var CoinDetailComponent = /** @class */ (function () {
    function CoinDetailComponent(params, coinService) {
        this.params = params;
        this.coinService = coinService;
        this.coin = params.context;
    }
    CoinDetailComponent.prototype.ngOnInit = function () {
    };
    CoinDetailComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    CoinDetailComponent.prototype.onActivateTap = function () {
        var _this_1 = this;
        this.coinService.activate(this.coin.id).subscribe(function (coin) {
            _this_1.coin = coin;
        });
    };
    CoinDetailComponent.prototype.onDeleteTap = function () {
        var _this = this;
        dialogs.confirm({
            title: "Confirm Deletion",
            message: "Do you really want to delete this coin?",
            okButtonText: "Yes",
            cancelButtonText: "No"
        }).then(function (result) {
            if (result) {
                _this.coinService.remove(_this.coin.id).subscribe(function () {
                    _this.params.closeCallback({});
                });
            }
        });
    };
    CoinDetailComponent.prototype.onSellTap = function () {
        var _this_1 = this;
        this.coinService.sell(this.coin.id).subscribe(function (coin) {
            _this_1.coin.forSale = true;
        });
    };
    CoinDetailComponent = __decorate([
        core_1.Component({
            selector: 'ns-coin-detail',
            templateUrl: './coin-detail.component.html',
            styleUrls: ['./coin-detail.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            coin_service_1.CoinService])
    ], CoinDetailComponent);
    return CoinDetailComponent;
}());
exports.CoinDetailComponent = CoinDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29pbi1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29pbi1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGtFQUFzRTtBQUN0RSxxREFBdUQ7QUFDdkQsNERBQTBEO0FBUTFEO0lBSUUsNkJBQ1UsTUFBeUIsRUFDekIsV0FBd0I7UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFRCxzQ0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHFDQUFPLEdBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCwyQ0FBYSxHQUFiO1FBQUEsbUJBSUM7UUFIQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDcEQsT0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQseUNBQVcsR0FBWDtRQUNFLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ2QsS0FBSyxFQUFFLGtCQUFrQjtZQUN6QixPQUFPLEVBQUUseUNBQXlDO1lBQ2xELFlBQVksRUFBRSxLQUFLO1lBQ25CLGdCQUFnQixFQUFFLElBQUk7U0FDdkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLE1BQU07WUFDdEIsSUFBSSxNQUFNLEVBQUU7Z0JBQ1YsS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2hELEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBRTFCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsdUNBQVMsR0FBVDtRQUFBLG1CQUlDO1FBSEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2hELE9BQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE5Q1UsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFdBQVcsRUFBRSw4QkFBOEI7WUFDM0MsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7WUFDMUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1NBQ3BCLENBQUM7eUNBTWtCLGdDQUFpQjtZQUNaLDBCQUFXO09BTnZCLG1CQUFtQixDQStDL0I7SUFBRCwwQkFBQztDQUFBLEFBL0NELElBK0NDO0FBL0NZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1BhcmFtcyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZyc7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2RpYWxvZ3NcIjtcbmltcG9ydCB7IENvaW5TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29pbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtY29pbi1kZXRhaWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY29pbi1kZXRhaWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb2luLWRldGFpbC5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIENvaW5EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGNvaW47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlXG4gICAgKSB7XG4gICAgdGhpcy5jb2luID0gcGFyYW1zLmNvbnRleHQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uQ2xvc2UoKSB7XG4gICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICB9XG5cbiAgb25BY3RpdmF0ZVRhcCgpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLmFjdGl2YXRlKHRoaXMuY29pbi5pZCkuc3Vic2NyaWJlKGNvaW4gPT4ge1xuICAgICAgdGhpcy5jb2luID0gY29pbjtcbiAgICB9KTsgICAgXG4gIH1cblxuICBvbkRlbGV0ZVRhcCgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgZGlhbG9ncy5jb25maXJtKHtcbiAgICAgIHRpdGxlOiBcIkNvbmZpcm0gRGVsZXRpb25cIixcbiAgICAgIG1lc3NhZ2U6IFwiRG8geW91IHJlYWxseSB3YW50IHRvIGRlbGV0ZSB0aGlzIGNvaW4/XCIsXG4gICAgICBva0J1dHRvblRleHQ6IFwiWWVzXCIsXG4gICAgICBjYW5jZWxCdXR0b25UZXh0OiBcIk5vXCJcbiAgICB9KS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgX3RoaXMuY29pblNlcnZpY2UucmVtb3ZlKF90aGlzLmNvaW4uaWQpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgX3RoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soe1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgb25TZWxsVGFwKCkge1xuICAgIHRoaXMuY29pblNlcnZpY2Uuc2VsbCh0aGlzLmNvaW4uaWQpLnN1YnNjcmliZShjb2luID0+IHtcbiAgICAgIHRoaXMuY29pbi5mb3JTYWxlID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxufVxuIl19