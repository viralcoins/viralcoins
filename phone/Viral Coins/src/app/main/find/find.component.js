"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var nativescript_geolocation_1 = require("nativescript-geolocation");
var enums_1 = require("tns-core-modules/ui/enums");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_mapbox_1 = require("nativescript-mapbox");
var page_1 = require("ui/page");
var nativescript_directions_1 = require("nativescript-directions");
var config_1 = require("../../config");
element_registry_1.registerElement("Mapbox", function () { return nativescript_mapbox_1.MapboxView; });
var FindComponent = /** @class */ (function () {
    function FindComponent(coinService, page) {
        this.coinService = coinService;
        this.page = page;
        this.coinList = [];
        this.isLoading = false;
        this.listLoaded = false;
        this.mapLoaded = false;
        this.locationLoaded = false;
        this.zoomLevel = 10;
        this.page.actionBarHidden = true;
        nativescript_geolocation_1.enableLocationRequest(true);
    }
    FindComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.getLocationOnce();
    };
    Object.defineProperty(FindComponent.prototype, "accessToken", {
        get: function () {
            return config_1.Config.mapboxAccessToken;
        },
        enumerable: true,
        configurable: true
    });
    FindComponent.prototype.loadCoins = function () {
        var _this = this;
        this.coinService.find()
            .subscribe(function (loadedCoins) {
            _this.coinList = [];
            loadedCoins.forEach(function (coinObject) {
                _this.coinList.unshift(coinObject);
            });
            _this.isLoading = false;
            _this.listLoaded = true;
            _this.checkUpdate();
        });
    };
    FindComponent.prototype.isLocationEnabled = function () {
        nativescript_geolocation_1.isEnabled().then(function (isLocationEnabled) {
            var message = "Location services are not available";
            if (isLocationEnabled) {
                message = "Location services are available";
            }
            alert(message);
        }, function (e) {
            console.log("Location error received: " + (e.message || e));
        });
    };
    FindComponent.prototype.getLocationOnce = function () {
        var _this = this;
        nativescript_geolocation_1.getCurrentLocation({
            desiredAccuracy: enums_1.Accuracy.high,
            timeout: 5000
        })
            .then(function (location) {
            _this.longitude = location.longitude;
            _this.latitude = location.latitude;
            _this.locationLoaded = true;
            _this.checkUpdate();
        }).catch(function (error) {
            console.log("Location error received: " + error);
            alert("Location error received: " + error);
        });
    };
    FindComponent.prototype.onMapReady = function (args) {
        this.mapLoaded = true;
        this.loadCoins();
        this.checkUpdate();
    };
    FindComponent.prototype.checkUpdate = function () {
        console.log(this.mapLoaded + ":" + this.locationLoaded + ":" + this.listLoaded);
        if (this.mapLoaded && this.locationLoaded && this.listLoaded) {
            this.doUpdate();
        }
    };
    FindComponent.prototype.doUpdate = function () {
        this.mapbox.nativeElement.setCenter({
            lat: this.latitude,
            lng: this.longitude
        });
        for (var _i = 0, _a = this.coinList; _i < _a.length; _i++) {
            var coin = _a[_i];
            this.mapbox.nativeElement.addMarkers([
                {
                    lat: coin.coordinates.latitude,
                    lng: coin.coordinates.longitude,
                    title: coin.description,
                    subtitle: "Tap for directions",
                    onCalloutTap: function (marker) {
                        console.log(marker);
                        var directions = new nativescript_directions_1.Directions();
                        directions.available().then(function (avail) {
                            if (avail) {
                                directions.navigate({
                                    to: {
                                        lat: marker.lat,
                                        lng: marker.lng
                                    }
                                    // for iOS-specific options, see the TypeScript example below.
                                }).then(function () {
                                    console.log("Maps app launched.");
                                }, function (error) {
                                    console.log(error);
                                });
                            }
                        });
                    }
                }
            ]);
        }
    };
    FindComponent.prototype.onRefreshTap = function () {
        this.mapbox.nativeElement.removeMarkers();
        this.coinService.reloadCoins = true;
        this.loadCoins();
    };
    __decorate([
        core_1.ViewChild("map"),
        __metadata("design:type", core_1.ElementRef)
    ], FindComponent.prototype, "mapbox", void 0);
    FindComponent = __decorate([
        core_1.Component({
            selector: "find",
            moduleId: module.id,
            templateUrl: "./find.component.html"
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            page_1.Page])
    ], FindComponent);
    return FindComponent;
}());
exports.FindComponent = FindComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQscUVBQW9IO0FBQ3BILG1EQUFxRDtBQUNyRCwwRUFBd0U7QUFDeEUsMkRBQStEO0FBRS9ELGdDQUErQjtBQUMvQixtRUFBcUQ7QUFDckQsdUNBQXNDO0FBRXRDLGtDQUFlLENBQUMsUUFBUSxFQUFFLGNBQU0sT0FBQSxnQ0FBVSxFQUFWLENBQVUsQ0FBQyxDQUFDO0FBTzVDO0lBYUUsdUJBQ1UsV0FBd0IsRUFDeEIsSUFBVTtRQURWLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFNBQUksR0FBSixJQUFJLENBQU07UUFUcEIsYUFBUSxHQUFnQixFQUFFLENBQUM7UUFDM0IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFDdkIsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQU1iLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxnREFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRU0sZ0NBQVEsR0FBZjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVELHNCQUFXLHNDQUFXO2FBQXRCO1lBQ0UsT0FBTyxlQUFNLENBQUMsaUJBQWlCLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFFTSxpQ0FBUyxHQUFoQjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7YUFDcEIsU0FBUyxDQUFDLFVBQUEsV0FBVztZQUNwQixLQUFJ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QUNyQyxDQUFDO3lDQWV1QiwwQkFBVztZQUNsQixXQUFJO09BZlQsYUFBYSxDQWtJekI7SUFBRCxvQkFBQztDQUFBLEFBbElELElBa0lDO0FBbElZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvaW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvY29pbi5tb2RlbCc7XG5pbXBvcnQgeyBMb2NhdGlvbiwgZ2V0Q3VycmVudExvY2F0aW9uLCBpc0VuYWJsZWQsIGRpc3RhbmNlLCBlbmFibGVMb2NhdGlvblJlcXVlc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgTWFwYm94VmlldywgTWFwYm94TWFya2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi8uLi9jb25maWcnO1xuXG5yZWdpc3RlckVsZW1lbnQoXCJNYXBib3hcIiwgKCkgPT4gTWFwYm94Vmlldyk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJmaW5kXCIsXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gIHRlbXBsYXRlVXJsOiBcIi4vZmluZC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEZpbmRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBWaWV3Q2hpbGQoXCJtYXBcIikgcHVibGljIG1hcGJveDogRWxlbWVudFJlZjtcblxuICBsYXRpdHVkZTtcbiAgbG9uZ2l0dWRlO1xuICBjb2luTGlzdDogQXJyYXk8Q29pbj4gPSBbXTtcbiAgaXNMb2FkaW5nID0gZmFsc2U7XG4gIGxpc3RMb2FkZWQgPSBmYWxzZTtcbiAgbWFwTG9hZGVkID0gZmFsc2U7XG4gIGxvY2F0aW9uTG9hZGVkID0gZmFsc2U7XG4gIHpvb21MZXZlbCA9IDEwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29pblNlcnZpY2U6IENvaW5TZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICApIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICBlbmFibGVMb2NhdGlvblJlcXVlc3QodHJ1ZSk7ICAgIFxuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIHRoaXMuZ2V0TG9jYXRpb25PbmNlKCk7ICAgIFxuICB9XG5cbiAgcHVibGljIGdldCBhY2Nlc3NUb2tlbigpIHtcbiAgICByZXR1cm4gQ29uZmlnLm1hcGJveEFjY2Vzc1Rva2VuO1xuICB9XG5cbiAgcHVibGljIGxvYWRDb2lucygpIHtcbiAgICB0aGlzLmNvaW5TZXJ2aWNlLmZpbmQoKVxuICAgICAgLnN1YnNjcmliZShsb2FkZWRDb2lucyA9PiB7XG4gICAgICAgIHRoaXMuY29pbkxpc3QgPSBbXTtcbiAgICAgICAgbG9hZGVkQ29pbnMuZm9yRWFjaCgoY29pbk9iamVjdCkgPT4ge1xuICAgICAgICAgIHRoaXMuY29pbkxpc3QudW5zaGlmdChjb2luT2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMubGlzdExvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzTG9jYXRpb25FbmFibGVkKCkge1xuICAgIGlzRW5hYmxlZCgpLnRoZW4oZnVuY3Rpb24oaXNMb2NhdGlvbkVuYWJsZWQpIHtcbiAgICAgIGxldCBtZXNzYWdlID0gXCJMb2NhdGlvbiBzZXJ2aWNlcyBhcmUgbm90IGF2YWlsYWJsZVwiO1xuICAgICAgaWYgKGlzTG9jYXRpb25FbmFibGVkKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBcIkxvY2F0aW9uIHNlcnZpY2VzIGFyZSBhdmFpbGFibGVcIjtcbiAgICAgIH1cbiAgICAgIGFsZXJ0KG1lc3NhZ2UpO1xuICAgIH0sIGZ1bmN0aW9uKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgKGUubWVzc2FnZSB8fCBlKSk7XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0TG9jYXRpb25PbmNlKCkge1xuICAgIGdldEN1cnJlbnRMb2NhdGlvbih7XG4gICAgICBkZXNpcmVkQWNjdXJhY3k6IEFjY3VyYWN5LmhpZ2gsXG4gICAgICB0aW1lb3V0OiA1MDAwXG4gICAgfSlcbiAgICAgIC50aGVuKGxvY2F0aW9uID0+IHtcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGU7XG4gICAgICAgIHRoaXMubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZTtcbiAgICAgICAgdGhpcy5sb2NhdGlvbkxvYWRlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcbiAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyBlcnJvcik7XG4gICAgICAgIGFsZXJ0KFwiTG9jYXRpb24gZXJyb3IgcmVjZWl2ZWQ6IFwiICsgZXJyb3IpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgb25NYXBSZWFkeShhcmdzOiBhbnkpIHtcbiAgICB0aGlzLm1hcExvYWRlZCA9IHRydWU7XG4gICAgdGhpcy5sb2FkQ29pbnMoKTtcbiAgICB0aGlzLmNoZWNrVXBkYXRlKCk7XG4gIH1cblxuICBjaGVja1VwZGF0ZSgpIHtcbiAgICBjb25zb2xlLmxvZyh0aGlzLm1hcExvYWRlZCArIFwiOlwiICsgdGhpcy5sb2NhdGlvbkxvYWRlZCArIFwiOlwiICsgdGhpcy5saXN0TG9hZGVkKTtcbiAgICBpZiAodGhpcy5tYXBMb2FkZWQgJiYgdGhpcy5sb2NhdGlvbkxvYWRlZCAmJiB0aGlzLmxpc3RMb2FkZWQpIHtcbiAgICAgIHRoaXMuZG9VcGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBkb1VwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLm1hcGJveC5uYXRpdmVFbGVtZW50LnNldENlbnRlcih7XG4gICAgICBsYXQ6IHRoaXMubGF0aXR1ZGUsXG4gICAgICBsbmc6IHRoaXMubG9uZ2l0dWRlXG4gICAgfSlcbiAgICBmb3IgKGxldCBjb2luIG9mIHRoaXMuY29pbkxpc3QpIHtcbiAgICAgIHRoaXMubWFwYm94Lm5hdGl2ZUVsZW1lbnQuYWRkTWFya2VycyhbXG4gICAgICAgIHtcbiAgICAgICAgICBsYXQ6IGNvaW4uY29vcmRpbmF0ZXMubGF0aXR1ZGUsXG4gICAgICAgICAgbG5nOiBjb2luLmNvb3JkaW5hdGVzLmxvbmdpdHVkZSxcbiAgICAgICAgICB0aXRsZTogY29pbi5kZXNjcmlwdGlvbixcbiAgICAgICAgICBzdWJ0aXRsZTogXCJUYXAgZm9yIGRpcmVjdGlvbnNcIixcbiAgICAgICAgICBvbkNhbGxvdXRUYXA6IChtYXJrZXIpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG1hcmtlcik7XG4gICAgICAgICAgICBsZXQgZGlyZWN0aW9ucyA9IG5ldyBEaXJlY3Rpb25zKCk7XG5cbiAgICAgICAgICAgIGRpcmVjdGlvbnMuYXZhaWxhYmxlKCkudGhlbihhdmFpbCA9PiB7XG4gICAgICAgICAgICAgIGlmIChhdmFpbCkge1xuICAgICAgICAgICAgICAgIGRpcmVjdGlvbnMubmF2aWdhdGUoe1xuICAgICAgICAgICAgICAgICAgdG86IHsgLy8gZWl0aGVyIHBhc3MgaW4gYSBzaW5nbGUgb2JqZWN0IG9yIGFuIEFycmF5IChzZWUgdGhlIFR5cGVTY3JpcHQgZXhhbXBsZSBiZWxvdylcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBtYXJrZXIubGF0LFxuICAgICAgICAgICAgICAgICAgICBsbmc6IG1hcmtlci5sbmdcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIC8vIGZvciBpT1Mtc3BlY2lmaWMgb3B0aW9ucywgc2VlIHRoZSBUeXBlU2NyaXB0IGV4YW1wbGUgYmVsb3cuXG4gICAgICAgICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1hcHMgYXBwIGxhdW5jaGVkLlwiKTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgXSk7XG4gICAgfVxuICB9XG5cbiAgb25SZWZyZXNoVGFwKCk6IHZvaWQge1xuICAgIHRoaXMubWFwYm94Lm5hdGl2ZUVsZW1lbnQucmVtb3ZlTWFya2VycygpO1xuICAgIHRoaXMuY29pblNlcnZpY2UucmVsb2FkQ29pbnMgPSB0cnVlO1xuICAgIHRoaXMubG9hZENvaW5zKCk7XG4gIH1cblxufVxuIl19