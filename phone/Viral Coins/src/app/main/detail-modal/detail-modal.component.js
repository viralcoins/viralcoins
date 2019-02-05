"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var config_1 = require("../../config");
var router_1 = require("nativescript-angular/router");
var coin_service_1 = require("../../services/coin.service");
var DetailModalComponent = /** @class */ (function () {
    function DetailModalComponent(params, routerExtensions, coinService) {
        this.params = params;
        this.routerExtensions = routerExtensions;
        this.coinService = coinService;
        this.coinImage = '';
        this.isLoading = false;
        this.coin = params.context;
        this.coinImage = config_1.Config.apiUrl + "/coin/" + this.coin.code + "/qr?size=8";
    }
    DetailModalComponent.prototype.ngOnInit = function () {
        // Init your component properties here.
    };
    DetailModalComponent.prototype.onClose = function () {
        this.params.closeCallback({
            action: "close",
            value: this.coin
        });
    };
    DetailModalComponent.prototype.onShareTap = function () {
        this.params.closeCallback({
            action: "share",
            value: this.coin.code
        });
    };
    DetailModalComponent.prototype.onSellTap = function () {
        var _this = this;
        this.isLoading = true;
        this.coinService.sell(this.coin.id).subscribe(function (coin) {
            _this.isLoading = false;
            _this.coin = coin;
        });
    };
    DetailModalComponent.prototype.onUnlistTap = function () {
        var _this = this;
        this.isLoading = true;
        this.coinService.unlist(this.coin.id).subscribe(function (coin) {
            _this.isLoading = false;
            _this.coin = coin;
        });
    };
    DetailModalComponent = __decorate([
        core_1.Component({
            selector: "app-detail-modal",
            moduleId: module.id,
            templateUrl: "./detail-modal.component.html",
            styleUrls: ['./detail-modal.component.css']
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            router_1.RouterExtensions,
            coin_service_1.CoinService])
    ], DetailModalComponent);
    return DetailModalComponent;
}());
exports.DetailModalComponent = DetailModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0YWlsLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGFpbC1tb2RhbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsa0VBQXNFO0FBRXRFLHVDQUFzQztBQUN0QyxzREFBK0Q7QUFFL0QsNERBQTBEO0FBUTFEO0lBS0UsOEJBQ1UsTUFBeUIsRUFDekIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBRnhCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQ3pCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFOM0IsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN0QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBT2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQWUsQ0FBQztRQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQU0sQ0FBQyxNQUFNLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQTtJQUMzRSxDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNFLHVDQUF1QztJQUN6QyxDQUFDO0lBRU0sc0NBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBVSxHQUFqQjtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO1lBQ3hCLE1BQU0sRUFBRSxPQUFPO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtTQUN0QixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sd0NBQVMsR0FBaEI7UUFBQSxpQkFNQztRQUxDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsSUFBSTtZQUNoRCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixLQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSwwQ0FBVyxHQUFsQjtRQUFBLGlCQU1DO1FBTEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJO1lBQ2xELEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQTlDVSxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDNUMsQ0FBQzt5Q0FPa0IsZ0NBQWlCO1lBQ1AseUJBQWdCO1lBQ3JCLDBCQUFXO09BUnZCLG9CQUFvQixDQStDaEM7SUFBRCwyQkFBQztDQUFBLEFBL0NELElBK0NDO0FBL0NZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE1vZGFsRGlhbG9nUGFyYW1zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvbW9kYWwtZGlhbG9nJztcbmltcG9ydCB7IENvaW4gfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2NvaW4ubW9kZWxcIjtcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gXCIuLi8uLi9jb25maWdcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IENvaW5TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvaW4uc2VydmljZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwiYXBwLWRldGFpbC1tb2RhbFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL2RldGFpbC1tb2RhbC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFsnLi9kZXRhaWwtbW9kYWwuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIERldGFpbE1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29pbjogQ29pbjtcbiAgcHVibGljIGNvaW5JbWFnZSA9ICcnO1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXMsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY29pbiA9IHBhcmFtcy5jb250ZXh0IGFzIENvaW47XG4gICAgdGhpcy5jb2luSW1hZ2UgPSBDb25maWcuYXBpVXJsICsgXCIvY29pbi9cIiArIHRoaXMuY29pbi5jb2RlICsgXCIvcXI/c2l6ZT04XCJcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIC8vIEluaXQgeW91ciBjb21wb25lbnQgcHJvcGVydGllcyBoZXJlLlxuICB9XG5cbiAgcHVibGljIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjayh7XG4gICAgICBhY3Rpb246IFwiY2xvc2VcIixcbiAgICAgIHZhbHVlOiB0aGlzLmNvaW5cbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblNoYXJlVGFwKCk6IHZvaWQge1xuICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soe1xuICAgICAgYWN0aW9uOiBcInNoYXJlXCIsXG4gICAgICB2YWx1ZTogdGhpcy5jb2luLmNvZGVcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblNlbGxUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuICAgIHRoaXMuY29pblNlcnZpY2Uuc2VsbCh0aGlzLmNvaW4uaWQpLnN1YnNjcmliZShjb2luID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNvaW4gPSBjb2luO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uVW5saXN0VGFwKCk6IHZvaWQge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnVubGlzdCh0aGlzLmNvaW4uaWQpLnN1YnNjcmliZShjb2luID0+IHtcbiAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmNvaW4gPSBjb2luO1xuICAgIH0pO1xuICB9XG59XG4iXX0=