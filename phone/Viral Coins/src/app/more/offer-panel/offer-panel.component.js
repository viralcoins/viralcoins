"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var dialogs = require("tns-core-modules/ui/dialogs");
var OfferPanelComponent = /** @class */ (function () {
    function OfferPanelComponent(params, coinService) {
        this.params = params;
        this.coinService = coinService;
        this.offerId = params.context.id;
    }
    OfferPanelComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.coinService.getOffer(this.offerId).subscribe(function (offer) {
            _this.offer = offer;
        });
    };
    OfferPanelComponent.prototype.onClose = function () {
        this.params.closeCallback();
    };
    OfferPanelComponent.prototype.onAcceptTap = function () {
        var _this = this;
        this.coinService.acceptOffer(this.offerId).subscribe(function (offer) {
            dialogs.alert({
                title: "Success!",
                message: "You have accepted their offer. The user will be notified and when payment is received, the coin will be transfered to your wallet.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback({
                    action: "accepted",
                    value: offer
                });
            });
        });
    };
    OfferPanelComponent.prototype.onRejectTap = function () {
        var _this = this;
        this.coinService.rejectOffer(this.offerId).subscribe(function (offer) {
            dialogs.alert({
                title: "Success!",
                message: "You have rejected their offer. They can make additional offers while your coins is listed for sale.",
                okButtonText: "OK"
            }).then(function () {
                _this.params.closeCallback({
                    action: "rejected",
                    value: offer
                });
            });
        });
    };
    OfferPanelComponent = __decorate([
        core_1.Component({
            selector: 'ns-offer-panel',
            templateUrl: './offer-panel.component.html',
            styleUrls: ['./offer-panel.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [modal_dialog_1.ModalDialogParams,
            coin_service_1.CoinService])
    ], OfferPanelComponent);
    return OfferPanelComponent;
}());
exports.OfferPanelComponent = OfferPanelComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmZXItcGFuZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsib2ZmZXItcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDREQUEwRDtBQUMxRCxrRUFBc0U7QUFDdEUscURBQXVEO0FBUXZEO0lBS0UsNkJBQ1MsTUFBeUIsRUFDekIsV0FBd0I7UUFEeEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFDekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFFaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDckQsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0scUNBQU8sR0FBZDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVNLHlDQUFXLEdBQWxCO1FBQUEsaUJBYUM7UUFaQyxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSztZQUN4RCxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNaLEtBQUssRUFBRSxVQUFVO2dCQUNqQixPQUFPLEVBQUUsb0lBQW9JO2dCQUM3SSxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNOLEtBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDO29CQUN4QixNQUFNLEVBQUUsVUFBVTtvQkFDbEIsS0FBSyxFQUFFLEtBQUs7aUJBQ2IsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTSx5Q0FBVyxHQUFsQjtRQUFBLGlCQWFDO1FBWkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsVUFBVTtnQkFDakIsT0FBTyxFQUFFLHFHQUFxRztnQkFDOUcsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDTixLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQztvQkFDeEIsTUFBTSxFQUFFLFVBQVU7b0JBQ2xCLEtBQUssRUFBRSxLQUFLO2lCQUNiLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBbERVLG1CQUFtQjtRQU4vQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGdCQUFnQjtZQUMxQixXQUFXLEVBQUUsOEJBQThCO1lBQzNDLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixDQUFDO1lBQzFDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU9pQixnQ0FBaUI7WUFDWiwwQkFBVztPQVB0QixtQkFBbUIsQ0FvRC9CO0lBQUQsMEJBQUM7Q0FBQSxBQXBERCxJQW9EQztBQXBEWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29pblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2UnO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLW9mZmVyLXBhbmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL29mZmVyLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vb2ZmZXItcGFuZWwuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBPZmZlclBhbmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwcml2YXRlIG9mZmVySWQ7XG4gIG9mZmVyO1xuXG4gIGNvbnN0cnVjdG9yKFxuICBcdHByaXZhdGUgcGFyYW1zOiBNb2RhbERpYWxvZ1BhcmFtcyxcbiAgXHRwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZVxuICBcdCkge1xuICBcdHRoaXMub2ZmZXJJZCA9IHBhcmFtcy5jb250ZXh0LmlkO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb2luU2VydmljZS5nZXRPZmZlcih0aGlzLm9mZmVySWQpLnN1YnNjcmliZShvZmZlciA9PiB7XG4gICAgICB0aGlzLm9mZmVyID0gb2ZmZXI7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25DbG9zZSgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gIH0gIFxuXG4gIHB1YmxpYyBvbkFjY2VwdFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLmFjY2VwdE9mZmVyKHRoaXMub2ZmZXJJZCkuc3Vic2NyaWJlKG9mZmVyID0+IHsgICAgICBcbiAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICB0aXRsZTogXCJTdWNjZXNzIVwiLFxuICAgICAgICBtZXNzYWdlOiBcIllvdSBoYXZlIGFjY2VwdGVkIHRoZWlyIG9mZmVyLiBUaGUgdXNlciB3aWxsIGJlIG5vdGlmaWVkIGFuZCB3aGVuIHBheW1lbnQgaXMgcmVjZWl2ZWQsIHRoZSBjb2luIHdpbGwgYmUgdHJhbnNmZXJlZCB0byB5b3VyIHdhbGxldC5cIixcbiAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKHtcbiAgICAgICAgICBhY3Rpb246IFwiYWNjZXB0ZWRcIixcbiAgICAgICAgICB2YWx1ZTogb2ZmZXJcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvblJlamVjdFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLnJlamVjdE9mZmVyKHRoaXMub2ZmZXJJZCkuc3Vic2NyaWJlKG9mZmVyID0+IHtcbiAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICB0aXRsZTogXCJTdWNjZXNzIVwiLFxuICAgICAgICBtZXNzYWdlOiBcIllvdSBoYXZlIHJlamVjdGVkIHRoZWlyIG9mZmVyLiBUaGV5IGNhbiBtYWtlIGFkZGl0aW9uYWwgb2ZmZXJzIHdoaWxlIHlvdXIgY29pbnMgaXMgbGlzdGVkIGZvciBzYWxlLlwiLFxuICAgICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgIHRoaXMucGFyYW1zLmNsb3NlQ2FsbGJhY2soe1xuICAgICAgICAgIGFjdGlvbjogXCJyZWplY3RlZFwiLFxuICAgICAgICAgIHZhbHVlOiBvZmZlclxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9IFxuXG59XG4iXX0=