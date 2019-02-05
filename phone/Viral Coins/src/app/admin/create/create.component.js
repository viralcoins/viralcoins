"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var enums_1 = require("tns-core-modules/ui/enums");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var coin_service_1 = require("../../services/coin.service");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var CreateComponent = /** @class */ (function () {
    function CreateComponent(coinService, params) {
        this.coinService = coinService;
        this.params = params;
        this.code = "";
        this.description = "";
        this.locationLoaded = false;
        this.requiresAddress = false;
        this.prizeName = "";
        this.price = 1999;
        this.code = params.context.code;
        nativescript_geolocation_1.enableLocationRequest(true);
    }
    CreateComponent.prototype.ngOnInit = function () {
        this.getLocationOnce();
    };
    CreateComponent.prototype.getLocationOnce = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: enums_1.Accuracy.high,
            timeout: 5000
        })
            .then(function (location) {
            _this.longitude = location.longitude;
            _this.latitude = location.latitude;
            _this.locationLoaded = true;
        }).catch(function (error) {
            console.log("Location error received: " + error);
            alert("Location error received: " + error);
        });
    };
    CreateComponent.prototype.onAddTap = function () {
        var _this = this;
        var prize = null;
        if (this.prizeName) {
            prize = {
                "name": this.prizeName,
                "addressRequired": true
            };
        }
        this.coinService.create(this.latitude, this.longitude, this.code, this.description, prize, this.price)
            .subscribe(function (coin) {
            _this.params.closeCallback();
        });
    };
    CreateComponent.prototype.onCancelTap = function () {
        this.params.closeCallback();
    };
    CreateComponent = __decorate([
        core_1.Component({
            selector: 'ns-create',
            templateUrl: './create.component.html',
            styleUrls: ['./create.component.css'],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            modal_dialog_1.ModalDialogParams])
    ], CreateComponent);
    return CreateComponent;
}());
exports.CreateComponent = CreateComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsbURBQXFEO0FBQ3JELHFFQUFxRjtBQUNyRiw0REFBMEQ7QUFDMUQsa0VBQXNFO0FBUXRFO0lBV0UseUJBQ1MsV0FBd0IsRUFDeEIsTUFBeUI7UUFEekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBbUI7UUFUbEMsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQUNWLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLGNBQVMsR0FBRyxFQUFFLENBQUM7UUFDZixVQUFLLEdBQUcsSUFBSSxDQUFDO1FBTVgsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNoQyxnREFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsa0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU0seUNBQWUsR0FBdEI7UUFBQSxpQkFhQztRQVpDLDZDQUFrQixDQUFDO1lBQ2pCLGVBQWUsRUFBRSxnQkFBUSxDQUFDLElBQUk7WUFDOUIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO2FBQ0MsSUFBSSxDQUFDLFVBQUEsUUFBUTtZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUNwQyxLQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7WUFDbEMsS0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSztZQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDakQsS0FBSyxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGtDQUFRLEdBQVI7UUFBQSxpQkFZQztRQVhDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDbEIsS0FBSyxHQUFHO2dCQUNOLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUztnQkFDdEIsaUJBQWlCLEVBQUUsSUFBSTthQUN4QixDQUFBO1NBQ0Y7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO2FBQ25HLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDYixLQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHFDQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUF0RFUsZUFBZTtRQU4zQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFdBQVc7WUFDckIsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxTQUFTLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztZQUNyQyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0Fhc0IsMEJBQVc7WUFDaEIsZ0NBQWlCO09BYnZCLGVBQWUsQ0F3RDNCO0lBQUQsc0JBQUM7Q0FBQSxBQXhERCxJQXdEQztBQXhEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyBnZXRDdXJyZW50TG9jYXRpb24sIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ2VvbG9jYXRpb25cIjtcbmltcG9ydCB7IENvaW5TZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2NvaW4uc2VydmljZVwiO1xuaW1wb3J0IHsgTW9kYWxEaWFsb2dQYXJhbXMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2cnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICducy1jcmVhdGUnLFxuICB0ZW1wbGF0ZVVybDogJy4vY3JlYXRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY3JlYXRlLmNvbXBvbmVudC5jc3MnXSxcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZFxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIGxhdGl0dWRlO1xuICBsb25naXR1ZGU7XG4gIGNvZGUgPSBcIlwiO1xuICBkZXNjcmlwdGlvbiA9IFwiXCI7XG4gIGxvY2F0aW9uTG9hZGVkID0gZmFsc2U7ICBcbiAgcmVxdWlyZXNBZGRyZXNzID0gZmFsc2U7XG4gIHByaXplTmFtZSA9IFwiXCI7XG4gIHByaWNlID0gMTk5OTtcblxuICBjb25zdHJ1Y3RvcihcbiAgXHRwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZSxcbiAgXHRwcml2YXRlIHBhcmFtczogTW9kYWxEaWFsb2dQYXJhbXNcbiAgKSB7XG4gICAgdGhpcy5jb2RlID0gcGFyYW1zLmNvbnRleHQuY29kZTtcbiAgICBlbmFibGVMb2NhdGlvblJlcXVlc3QodHJ1ZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdldExvY2F0aW9uT25jZSgpOyAgXG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYXRpb25PbmNlKCkge1xuICAgIGdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICB0aW1lb3V0OiA1MDAwXG4gICAgfSlcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbkxvYWRlZCA9IHRydWU7XG4gICAgICB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xuICAgICAgICBhbGVydChcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgb25BZGRUYXAoKTogdm9pZCB7XG4gICAgbGV0IHByaXplID0gbnVsbDtcbiAgICBpZiAodGhpcy5wcml6ZU5hbWUpIHtcbiAgICAgIHByaXplID0ge1xuICAgICAgICBcIm5hbWVcIjogdGhpcy5wcml6ZU5hbWUsXG4gICAgICAgIFwiYWRkcmVzc1JlcXVpcmVkXCI6IHRydWVcbiAgICAgIH0gICAgICBcbiAgICB9XG4gICAgdGhpcy5jb2luU2VydmljZS5jcmVhdGUodGhpcy5sYXRpdHVkZSwgdGhpcy5sb25naXR1ZGUsIHRoaXMuY29kZSwgdGhpcy5kZXNjcmlwdGlvbiwgcHJpemUsIHRoaXMucHJpY2UpXG4gICAgICAuc3Vic2NyaWJlKGNvaW4gPT4ge1xuICAgICAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gICAgICB9KTtcbiAgfSAgICBcblxuICBvbkNhbmNlbFRhcCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhcmFtcy5jbG9zZUNhbGxiYWNrKCk7XG4gIH1cblxufVxuIl19