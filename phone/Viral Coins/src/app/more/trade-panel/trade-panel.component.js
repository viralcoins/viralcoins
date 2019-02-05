"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var coin_service_1 = require("../../services/coin.service");
var dialogs = require("tns-core-modules/ui/dialogs");
var TradePanelComponent = /** @class */ (function () {
    function TradePanelComponent(params, coinService) {
        this.params = params;
        this.coinService = coinService;
        this.coin = params.context;
    }
    TradePanelComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    TradePanelComponent.prototype.ngOnInit = function () {
    };
    TradePanelComponent.prototype.onHelpTap = function () {
        alert("Do help");
    };
    TradePanelComponent.prototype.onSubmitTap = function () {
        var _this = this;
        this.coinService.makeOffer(this.coin.id, this.offer).subscribe(function () {
            dialogs.alert({
                title: "Success!",
                message: "Your offer has been submitted.",
                okButtonText: "OK"
            }).then(function () {
                _this.onClose();
            });
        });
    };
    TradePanelComponent = __decorate([
        core_1.Component({
            selector: 'ns-trade-panel',
            templateUrl: './trade-panel.component.html',
            styleUrls: ['./trade-panel.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            coin_service_1.CoinService])
    ], TradePanelComponent);
    return TradePanelComponent;
}());
exports.TradePanelComponent = TradePanelComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhZGUtcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidHJhZGUtcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELGtFQUFzRTtBQUN0RSw0REFBMEQ7QUFDMUQscURBQXVEO0FBUXZEO0lBS0UsNkJBQ1UsTUFBeUIsRUFDekIsV0FBd0I7UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQzdCLENBQUM7SUFFTSxxQ0FBTyxHQUFkO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0NBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCx1Q0FBUyxHQUFUO1FBQ0UsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCx5Q0FBVyxHQUFYO1FBQUEsaUJBVUM7UUFUQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzdELE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLFVBQVU7Z0JBQ2pCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ04sS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBakNVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQzFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU9rQixnQ0FBaUI7WUFDWiwwQkFBVztPQVB2QixtQkFBbUIsQ0FtQy9CO0lBQUQsMEJBQUM7Q0FBQSxBQW5DRCxJQW1DQztBQW5DWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xuaW1wb3J0IHsgQ29pblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2UnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXRyYWRlLXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RyYWRlLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHJhZGUtcGFuZWwuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBUcmFkZVBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb2luOiBhbnk7XG4gIG9mZmVyOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBwYXJhbXM6IE1vZGFsRGlhbG9nUGFyYW1zLFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY29pbiA9IHBhcmFtcy5jb250ZXh0O1xuICB9XG5cbiAgcHVibGljIG9uQ2xvc2UoKTogdm9pZCB7XG4gICAgdGhpcy5wYXJhbXMuY2xvc2VDYWxsYmFjaygpO1xuICB9ICBcblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG9uSGVscFRhcCgpIHtcbiAgICBhbGVydChcIkRvIGhlbHBcIik7XG4gIH1cblxuICBvblN1Ym1pdFRhcCgpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLm1ha2VPZmZlcih0aGlzLmNvaW4uaWQsIHRoaXMub2ZmZXIpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgdGl0bGU6IFwiU3VjY2VzcyFcIixcbiAgICAgICAgbWVzc2FnZTogXCJZb3VyIG9mZmVyIGhhcyBiZWVuIHN1Ym1pdHRlZC5cIixcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==