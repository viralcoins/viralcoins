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
        this.getLocationOnce();
    };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5RTtBQUN6RSw0REFBMEQ7QUFFMUQscUVBQW9IO0FBQ3BILG1EQUFxRDtBQUNyRCwwRUFBd0U7QUFDeEUsMkRBQStEO0FBRS9ELGdDQUErQjtBQUMvQixtRUFBcUQ7QUFFckQsa0NBQWUsQ0FBQyxRQUFRLEVBQUUsY0FBTSxPQUFBLGdDQUFVLEVBQVYsQ0FBVSxDQUFDLENBQUM7QUFPNUM7SUFhRSx1QkFDVSxXQUF3QixFQUN4QixJQUFVO1FBRFYsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsU0FBSSxHQUFKLElBQUksQ0FBTTtRQVRwQixhQUFRLEdBQWdCLEVBQUUsQ0FBQztRQUMzQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFDbkIsY0FBUyxHQUFHLEtBQUssQ0FBQztRQUNsQixtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBTWIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLGdEQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTSxnQ0FBUSxHQUFmO1FBQ0UsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTSxpQ0FBUyxHQUFoQjtRQUFBLGlCQVdDO1FBVkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7YUFDcEIsU0FBUyxDQUFDLFVBQUEsV0FBVztZQUNwQixLQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNuQixXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtnQkFDN0IsS0FBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENB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bkluaXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvaW4gfSBmcm9tICcuLi8uLi9tb2RlbHMvY29pbi5tb2RlbCc7XG5pbXBvcnQgeyBMb2NhdGlvbiwgZ2V0Q3VycmVudExvY2F0aW9uLCBpc0VuYWJsZWQsIGRpc3RhbmNlLCBlbmFibGVMb2NhdGlvblJlcXVlc3QgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQgeyBBY2N1cmFjeSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2VudW1zXCI7XG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgTWFwYm94VmlldywgTWFwYm94TWFya2VyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCAqIGFzIHV0aWxzIGZyb20gXCJ1dGlscy91dGlsc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBEaXJlY3Rpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kaXJlY3Rpb25zXCI7XG5cbnJlZ2lzdGVyRWxlbWVudChcIk1hcGJveFwiLCAoKSA9PiBNYXBib3hWaWV3KTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcImZpbmRcIixcbiAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgdGVtcGxhdGVVcmw6IFwiLi9maW5kLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgRmluZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQFZpZXdDaGlsZChcIm1hcFwiKSBwdWJsaWMgbWFwYm94OiBFbGVtZW50UmVmO1xuXG4gIGxhdGl0dWRlO1xuICBsb25naXR1ZGU7XG4gIGNvaW5MaXN0OiBBcnJheTxDb2luPiA9IFtdO1xuICBpc0xvYWRpbmcgPSBmYWxzZTtcbiAgbGlzdExvYWRlZCA9IGZhbHNlO1xuICBtYXBMb2FkZWQgPSBmYWxzZTtcbiAgbG9jYXRpb25Mb2FkZWQgPSBmYWxzZTtcbiAgem9vbUxldmVsID0gMTA7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBjb2luU2VydmljZTogQ29pblNlcnZpY2UsXG4gICAgcHJpdmF0ZSBwYWdlOiBQYWdlXG4gICkge1xuICAgIHRoaXMucGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuICAgIGVuYWJsZUxvY2F0aW9uUmVxdWVzdCh0cnVlKTsgICAgXG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5nZXRMb2NhdGlvbk9uY2UoKTsgICAgXG4gIH1cblxuICBwdWJsaWMgbG9hZENvaW5zKCkge1xuICAgIHRoaXMuY29pblNlcnZpY2UuZmluZCgpXG4gICAgICAuc3Vic2NyaWJlKGxvYWRlZENvaW5zID0+IHtcbiAgICAgICAgdGhpcy5jb2luTGlzdCA9IFtdO1xuICAgICAgICBsb2FkZWRDb2lucy5mb3JFYWNoKChjb2luT2JqZWN0KSA9PiB7XG4gICAgICAgICAgdGhpcy5jb2luTGlzdC51bnNoaWZ0KGNvaW5PYmplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5saXN0TG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwdWJsaWMgaXNMb2NhdGlvbkVuYWJsZWQoKSB7XG4gICAgaXNFbmFibGVkKCkudGhlbihmdW5jdGlvbihpc0xvY2F0aW9uRW5hYmxlZCkge1xuICAgICAgbGV0IG1lc3NhZ2UgPSBcIkxvY2F0aW9uIHNlcnZpY2VzIGFyZSBub3QgYXZhaWxhYmxlXCI7XG4gICAgICBpZiAoaXNMb2NhdGlvbkVuYWJsZWQpIHtcbiAgICAgICAgbWVzc2FnZSA9IFwiTG9jYXRpb24gc2VydmljZXMgYXJlIGF2YWlsYWJsZVwiO1xuICAgICAgfVxuICAgICAgYWxlcnQobWVzc2FnZSk7XG4gICAgfSwgZnVuY3Rpb24oZSkge1xuICAgICAgY29uc29sZS5sb2coXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyAoZS5tZXNzYWdlIHx8IGUpKTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRMb2NhdGlvbk9uY2UoKSB7XG4gICAgZ2V0Q3VycmVudExvY2F0aW9uKHtcbiAgICAgIGRlc2lyZWRBY2N1cmFjeTogQWNjdXJhY3kuaGlnaCxcbiAgICAgIHRpbWVvdXQ6IDUwMDBcbiAgICB9KVxuICAgICAgLnRoZW4obG9jYXRpb24gPT4ge1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZTtcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlO1xuICAgICAgICB0aGlzLmxvY2F0aW9uTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5jaGVja1VwZGF0ZSgpO1xuICAgICAgfSkuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvY2F0aW9uIGVycm9yIHJlY2VpdmVkOiBcIiArIGVycm9yKTtcbiAgICAgICAgYWxlcnQoXCJMb2NhdGlvbiBlcnJvciByZWNlaXZlZDogXCIgKyBlcnJvcik7XG4gICAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBvbk1hcFJlYWR5KGFyZ3M6IGFueSkge1xuICAgIHRoaXMubWFwTG9hZGVkID0gdHJ1ZTtcbiAgICB0aGlzLmxvYWRDb2lucygpO1xuICAgIHRoaXMuY2hlY2tVcGRhdGUoKTtcbiAgfVxuXG4gIGNoZWNrVXBkYXRlKCkge1xuICAgIGNvbnNvbGUubG9nKHRoaXMubWFwTG9hZGVkICsgXCI6XCIgKyB0aGlzLmxvY2F0aW9uTG9hZGVkICsgXCI6XCIgKyB0aGlzLmxpc3RMb2FkZWQpO1xuICAgIGlmICh0aGlzLm1hcExvYWRlZCAmJiB0aGlzLmxvY2F0aW9uTG9hZGVkICYmIHRoaXMubGlzdExvYWRlZCkge1xuICAgICAgdGhpcy5kb1VwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGRvVXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMubWFwYm94Lm5hdGl2ZUVsZW1lbnQuc2V0Q2VudGVyKHtcbiAgICAgIGxhdDogdGhpcy5sYXRpdHVkZSxcbiAgICAgIGxuZzogdGhpcy5sb25naXR1ZGVcbiAgICB9KVxuICAgIGZvciAobGV0IGNvaW4gb2YgdGhpcy5jb2luTGlzdCkge1xuICAgICAgdGhpcy5tYXBib3gubmF0aXZlRWxlbWVudC5hZGRNYXJrZXJzKFtcbiAgICAgICAge1xuICAgICAgICAgIGxhdDogY29pbi5jb29yZGluYXRlcy5sYXRpdHVkZSxcbiAgICAgICAgICBsbmc6IGNvaW4uY29vcmRpbmF0ZXMubG9uZ2l0dWRlLFxuICAgICAgICAgIHRpdGxlOiBjb2luLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIHN1YnRpdGxlOiBcIlRhcCBmb3IgZGlyZWN0aW9uc1wiLFxuICAgICAgICAgIG9uQ2FsbG91dFRhcDogKG1hcmtlcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2cobWFya2VyKTtcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gbmV3IERpcmVjdGlvbnMoKTtcblxuICAgICAgICAgICAgZGlyZWN0aW9ucy5hdmFpbGFibGUoKS50aGVuKGF2YWlsID0+IHtcbiAgICAgICAgICAgICAgaWYgKGF2YWlsKSB7XG4gICAgICAgICAgICAgICAgZGlyZWN0aW9ucy5uYXZpZ2F0ZSh7XG4gICAgICAgICAgICAgICAgICB0bzogeyAvLyBlaXRoZXIgcGFzcyBpbiBhIHNpbmdsZSBvYmplY3Qgb3IgYW4gQXJyYXkgKHNlZSB0aGUgVHlwZVNjcmlwdCBleGFtcGxlIGJlbG93KVxuICAgICAgICAgICAgICAgICAgICBsYXQ6IG1hcmtlci5sYXQsXG4gICAgICAgICAgICAgICAgICAgIGxuZzogbWFya2VyLmxuZ1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy8gZm9yIGlPUy1zcGVjaWZpYyBvcHRpb25zLCBzZWUgdGhlIFR5cGVTY3JpcHQgZXhhbXBsZSBiZWxvdy5cbiAgICAgICAgICAgICAgICB9KS50aGVuKFxuICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWFwcyBhcHAgbGF1bmNoZWQuXCIpO1xuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBdKTtcbiAgICB9XG4gIH1cblxuICBvblJlZnJlc2hUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5tYXBib3gubmF0aXZlRWxlbWVudC5yZW1vdmVNYXJrZXJzKCk7XG4gICAgdGhpcy5jb2luU2VydmljZS5yZWxvYWRDb2lucyA9IHRydWU7XG4gICAgdGhpcy5sb2FkQ29pbnMoKTtcbiAgfVxuXG59XG4iXX0=