"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var stripe_service_1 = require("./stripe.service");
var coin_service_1 = require("../../services/coin.service");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var dialogs = require("tns-core-modules/ui/dialogs");
var PaymentComponent = /** @class */ (function () {
    function PaymentComponent(page, stripeService, changeDetectionRef, route, routerExtensions, coinService) {
        var _this_1 = this;
        this.page = page;
        this.stripeService = stripeService;
        this.changeDetectionRef = changeDetectionRef;
        this.route = route;
        this.routerExtensions = routerExtensions;
        this.coinService = coinService;
        this.route.queryParams.subscribe(function (params) {
            _this_1.stripeService.setCoinId(params.coinId);
            _this_1.price = params.price;
        });
        page.actionBarHidden = true;
    }
    PaymentComponent.prototype.ngOnInit = function () {
        this.page.actionBarHidden = true;
        this.item = {
            id: 0,
            name: "1 Viral Coin",
            price: this.price
        };
        console.log("2");
        this.paymentSession = this.stripeService.createPaymentSession(this.page, this.item.price, new Listener(this));
    };
    Object.defineProperty(PaymentComponent.prototype, "isLoading", {
        get: function () {
            return this.paymentSession ? this.paymentSession.loading : true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "paymentInProgress", {
        get: function () {
            return this.paymentSession ? this.paymentSession.paymentInProgress : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "canBuy", {
        get: function () {
            return this.paymentSession ?
                this.paymentSession.isPaymentReady && !this.paymentSession.paymentInProgress :
                false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "total", {
        get: function () {
            return this.paymentSession ? this.paymentSession.amount : this.item.price;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "paymentType", {
        get: function () {
            return this.paymentMethod ? this.paymentMethod.label : "Select Payment";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "paymentImage", {
        get: function () {
            return this.paymentMethod ? this.paymentMethod.image : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaymentComponent.prototype, "shippingType", {
        get: function () {
            return this.shippingInfo ?
                this.shippingInfo.label + " ($" + this.shippingInfo.amount / 100 + ")" :
                "Enter Shipping Info";
        },
        enumerable: true,
        configurable: true
    });
    PaymentComponent.prototype.showPaymentMethods = function () {
        this.stripeService.showPaymentMethods(this.paymentSession);
    };
    PaymentComponent.prototype.showShipping = function () {
        this.stripeService.showShipping(this.paymentSession);
    };
    PaymentComponent.prototype.buy = function () {
        this.stripeService.requestPayment(this.paymentSession);
    };
    PaymentComponent.prototype.back = function () {
        var _this = this;
        dialogs.alert({
            title: "Success!",
            message: "Your coin has been added to your wallet. You will receive a confirmation email now and another when it is shipped. Thank you!",
            okButtonText: "OK"
        }).then(function (response) {
            _this.coinService.reloadWallet = true;
            _this.coinService.reloadSaleCoins = true;
            _this.routerExtensions.back();
        });
    };
    PaymentComponent = __decorate([
        core_1.Component({
            selector: "stp-details",
            moduleId: module.id,
            templateUrl: "./payment.component.html",
        }),
        __metadata("design:paramtypes", [page_1.Page,
            stripe_service_1.StripeService,
            core_1.ChangeDetectorRef,
            router_1.ActivatedRoute,
            router_2.RouterExtensions,
            coin_service_1.CoinService])
    ], PaymentComponent);
    return PaymentComponent;
}());
exports.PaymentComponent = PaymentComponent;
var Listener = /** @class */ (function () {
    function Listener(component) {
        this.component = component;
    }
    Listener.prototype.onCommunicatingStateChanged = function (_isCommunicating) {
        this.component.changeDetectionRef.detectChanges();
    };
    Listener.prototype.onPaymentDataChanged = function (data) {
        this.component.paymentMethod = data.paymentMethod;
        this.component.shippingInfo = data.shippingInfo;
        this.component.changeDetectionRef.detectChanges();
    };
    Listener.prototype.onPaymentSuccess = function () {
        // this.component.successMessage =
        //   `Congratulations! You bought a "${this.component.item.name}" for $${this.component.item.price / 100}.`;
        this.component.changeDetectionRef.detectChanges();
        this.component.back();
    };
    Listener.prototype.onUserCancelled = function () {
        this.component.changeDetectionRef.detectChanges();
    };
    Listener.prototype.onError = function (_errorCode, message) {
        this.component.errorMessage = message;
        this.component.changeDetectionRef.detectChanges();
    };
    Listener.prototype.provideShippingMethods = function (address) {
        var usps = {
            amount: 0,
            label: "USPS",
            detail: "Arrives in 3-5 days",
            identifier: "usps"
        };
        var methods = {};
        if (!address.country || address.country === "US") {
            methods.isValid = true;
            methods.validationError = undefined;
            methods.shippingMethods = [usps];
            methods.selectedShippingMethod = usps;
        }
        else {
            methods.isValid = false;
            methods.validationError = "We can't ship to this country.";
        }
        return methods;
    };
    return Listener;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXltZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFxRTtBQUVyRSxnQ0FBK0I7QUFFL0IsbURBQWlEO0FBQ2pELDREQUEwRDtBQUMxRCwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELHFEQUF1RDtBQU92RDtJQVNFLDBCQUNVLElBQVUsRUFDVixhQUE0QixFQUM3QixrQkFBcUMsRUFDcEMsS0FBcUIsRUFDckIsZ0JBQWtDLEVBQ2xDLFdBQXdCO1FBTmxDLG1CQWFDO1FBWlMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLGtCQUFhLEdBQWIsYUFBYSxDQUFlO1FBQzdCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDcEMsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUVoQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBQSxNQUFNO1lBQ3JDLE9BQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxPQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztJQUM5QixDQUFDO0lBRUQsbUNBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHO1lBQ1YsRUFBRSxFQUFFLENBQUM7WUFDTCxJQUFJLEVBQUUsY0FBYztZQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FB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WUFBWSxHQUFHLE9BQU8sQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGFBQWEsRUFBRSxDQUFDO0lBQ3BELENBQUM7SUFFRCx5Q0FBc0IsR0FBdEIsVUFBdUIsT0FBc0I7UUFDM0MsSUFBSSxJQUFJLEdBQXlCO1lBQy9CLE1BQU0sRUFBRSxDQUFDO1lBQ1QsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUscUJBQXFCO1lBQzdCLFVBQVUsRUFBRSxNQUFNO1NBQ25CLENBQUM7UUFFRixJQUFJLE9BQU8sR0FBMEIsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyxlQUFlLEdBQUcsU0FBUyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxlQUFlLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxPQUFPLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDO1NBQ3ZDO2FBQU07WUFDTCxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUN4QixPQUFPLENBQUMsZUFBZSxHQUFHLGdDQUFnQyxDQUFDO1NBQzVEO1FBQ0QsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUNILGVBQUM7QUFBRCxDQUFDLEFBbERELElBa0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFN0cmlwZUFkZHJlc3MsIFN0cmlwZVBheW1lbnREYXRhLCBTdHJpcGVQYXltZW50TGlzdGVuZXIsIFN0cmlwZVBheW1lbnRNZXRob2QsIFN0cmlwZVBheW1lbnRTZXNzaW9uLCBTdHJpcGVTaGlwcGluZ01ldGhvZCwgU3RyaXBlU2hpcHBpbmdNZXRob2RzIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zdHJpcGUvc3RhbmRhcmRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuL2l0ZW1cIjtcbmltcG9ydCB7IFN0cmlwZVNlcnZpY2UgfSBmcm9tIFwiLi9zdHJpcGUuc2VydmljZVwiO1xuaW1wb3J0IHsgQ29pblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9kaWFsb2dzXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogXCJzdHAtZGV0YWlsc1wiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL3BheW1lbnQuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgUGF5bWVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGl0ZW06IEl0ZW07XG4gIHByaWNlOiBudW1iZXI7XG4gIGVycm9yTWVzc2FnZTogc3RyaW5nO1xuICBzdWNjZXNzTWVzc2FnZTogc3RyaW5nO1xuICBwcml2YXRlIHBheW1lbnRTZXNzaW9uOiBTdHJpcGVQYXltZW50U2Vzc2lvbjtcbiAgcGF5bWVudE1ldGhvZDogU3RyaXBlUGF5bWVudE1ldGhvZDtcbiAgc2hpcHBpbmdJbmZvOiBTdHJpcGVTaGlwcGluZ01ldGhvZDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSBzdHJpcGVTZXJ2aWNlOiBTdHJpcGVTZXJ2aWNlLFxuICAgIHB1YmxpYyBjaGFuZ2VEZXRlY3Rpb25SZWY6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgIHByaXZhdGUgcm91dGVyRXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICBwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZVxuICApIHtcbiAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xuICAgICAgdGhpcy5zdHJpcGVTZXJ2aWNlLnNldENvaW5JZChwYXJhbXMuY29pbklkKTtcbiAgICAgIHRoaXMucHJpY2UgPSBwYXJhbXMucHJpY2VcbiAgICB9KTtcbiAgICBwYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgICB0aGlzLml0ZW0gPSB7XG4gICAgICBpZDogMCxcbiAgICAgIG5hbWU6IFwiMSBWaXJhbCBDb2luXCIsXG4gICAgICBwcmljZTogdGhpcy5wcmljZVxuICAgIH07XG4gICAgY29uc29sZS5sb2coXCIyXCIpO1xuICAgIHRoaXMucGF5bWVudFNlc3Npb24gPSB0aGlzLnN0cmlwZVNlcnZpY2UuY3JlYXRlUGF5bWVudFNlc3Npb24oXG4gICAgICB0aGlzLnBhZ2UsIHRoaXMuaXRlbS5wcmljZSwgbmV3IExpc3RlbmVyKHRoaXMpKTtcbiAgfVxuXG4gIGdldCBpc0xvYWRpbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMucGF5bWVudFNlc3Npb24gPyB0aGlzLnBheW1lbnRTZXNzaW9uLmxvYWRpbmcgOiB0cnVlO1xuICB9XG5cbiAgZ2V0IHBheW1lbnRJblByb2dyZXNzKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnBheW1lbnRTZXNzaW9uID8gdGhpcy5wYXltZW50U2Vzc2lvbi5wYXltZW50SW5Qcm9ncmVzcyA6IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGNhbkJ1eSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5wYXltZW50U2Vzc2lvbiA/XG4gICAgICB0aGlzLnBheW1lbnRTZXNzaW9uLmlzUGF5bWVudFJlYWR5ICYmICF0aGlzLnBheW1lbnRTZXNzaW9uLnBheW1lbnRJblByb2dyZXNzIDpcbiAgICAgIGZhbHNlO1xuICB9XG5cbiAgZ2V0IHRvdGFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMucGF5bWVudFNlc3Npb24gPyB0aGlzLnBheW1lbnRTZXNzaW9uLmFtb3VudCA6IHRoaXMuaXRlbS5wcmljZTtcbiAgfVxuXG4gIGdldCBwYXltZW50VHlwZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnBheW1lbnRNZXRob2QgPyB0aGlzLnBheW1lbnRNZXRob2QubGFiZWwgOiBcIlNlbGVjdCBQYXltZW50XCI7XG4gIH1cblxuICBnZXQgcGF5bWVudEltYWdlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMucGF5bWVudE1ldGhvZCA/IHRoaXMucGF5bWVudE1ldGhvZC5pbWFnZSA6IG51bGw7XG4gIH1cblxuICBnZXQgc2hpcHBpbmdUeXBlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHBpbmdJbmZvID9cbiAgICAgIGAke3RoaXMuc2hpcHBpbmdJbmZvLmxhYmVsfSAoJCR7dGhpcy5zaGlwcGluZ0luZm8uYW1vdW50IC8gMTAwfSlgIDpcbiAgICAgIFwiRW50ZXIgU2hpcHBpbmcgSW5mb1wiO1xuICB9XG5cbiAgc2hvd1BheW1lbnRNZXRob2RzKCkge1xuICAgIHRoaXMuc3RyaXBlU2VydmljZS5zaG93UGF5bWVudE1ldGhvZHModGhpcy5wYXltZW50U2Vzc2lvbik7XG4gIH1cblxuICBzaG93U2hpcHBpbmcoKSB7XG4gICAgdGhpcy5zdHJpcGVTZXJ2aWNlLnNob3dTaGlwcGluZyh0aGlzLnBheW1lbnRTZXNzaW9uKTtcbiAgfVxuXG4gIGJ1eSgpIHtcbiAgICB0aGlzLnN0cmlwZVNlcnZpY2UucmVxdWVzdFBheW1lbnQodGhpcy5wYXltZW50U2Vzc2lvbik7XG4gIH1cblxuICBiYWNrKCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpcztcbiAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgIHRpdGxlOiBcIlN1Y2Nlc3MhXCIsXG4gICAgICBtZXNzYWdlOiBcIllvdXIgY29pbiBoYXMgYmVlbiBhZGRlZCB0byB5b3VyIHdhbGxldC4gWW91IHdpbGwgcmVjZWl2ZSBhIGNvbmZpcm1hdGlvbiBlbWFpbCBub3cgYW5kIGFub3RoZXIgd2hlbiBpdCBpcyBzaGlwcGVkLiBUaGFuayB5b3UhXCIsXG4gICAgICBva0J1dHRvblRleHQ6IFwiT0tcIlxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBfdGhpcy5jb2luU2VydmljZS5yZWxvYWRXYWxsZXQgPSB0cnVlO1xuICAgICAgX3RoaXMuY29pblNlcnZpY2UucmVsb2FkU2FsZUNvaW5zID0gdHJ1ZTtcbiAgICAgIF90aGlzLnJvdXRlckV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH0pOyBcbiAgfVxufVxuXG5jbGFzcyBMaXN0ZW5lciBpbXBsZW1lbnRzIFN0cmlwZVBheW1lbnRMaXN0ZW5lciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50OiBQYXltZW50Q29tcG9uZW50KSB7XG4gIH1cblxuICBvbkNvbW11bmljYXRpbmdTdGF0ZUNoYW5nZWQoX2lzQ29tbXVuaWNhdGluZzogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuY29tcG9uZW50LmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBvblBheW1lbnREYXRhQ2hhbmdlZChkYXRhOiBTdHJpcGVQYXltZW50RGF0YSkge1xuICAgIHRoaXMuY29tcG9uZW50LnBheW1lbnRNZXRob2QgPSBkYXRhLnBheW1lbnRNZXRob2Q7XG4gICAgdGhpcy5jb21wb25lbnQuc2hpcHBpbmdJbmZvID0gZGF0YS5zaGlwcGluZ0luZm87XG4gICAgdGhpcy5jb21wb25lbnQuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG9uUGF5bWVudFN1Y2Nlc3MoKTogdm9pZCB7XG4gICAgLy8gdGhpcy5jb21wb25lbnQuc3VjY2Vzc01lc3NhZ2UgPVxuICAgIC8vICAgYENvbmdyYXR1bGF0aW9ucyEgWW91IGJvdWdodCBhIFwiJHt0aGlzLmNvbXBvbmVudC5pdGVtLm5hbWV9XCIgZm9yICQke3RoaXMuY29tcG9uZW50Lml0ZW0ucHJpY2UgLyAxMDB9LmA7XG4gICAgdGhpcy5jb21wb25lbnQuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB0aGlzLmNvbXBvbmVudC5iYWNrKCk7XG4gIH1cblxuICBvblVzZXJDYW5jZWxsZWQoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb25lbnQuY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgfVxuXG4gIG9uRXJyb3IoX2Vycm9yQ29kZTogbnVtYmVyLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmNvbXBvbmVudC5lcnJvck1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMuY29tcG9uZW50LmNoYW5nZURldGVjdGlvblJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gIH1cblxuICBwcm92aWRlU2hpcHBpbmdNZXRob2RzKGFkZHJlc3M6IFN0cmlwZUFkZHJlc3MpOiBTdHJpcGVTaGlwcGluZ01ldGhvZHMge1xuICAgIGxldCB1c3BzOiBTdHJpcGVTaGlwcGluZ01ldGhvZCA9IHtcbiAgICAgIGFtb3VudDogMCxcbiAgICAgIGxhYmVsOiBcIlVTUFNcIixcbiAgICAgIGRldGFpbDogXCJBcnJpdmVzIGluIDMtNSBkYXlzXCIsXG4gICAgICBpZGVudGlmaWVyOiBcInVzcHNcIlxuICAgIH07XG5cbiAgICBsZXQgbWV0aG9kcyA9IDxTdHJpcGVTaGlwcGluZ01ldGhvZHM+e307XG4gICAgaWYgKCFhZGRyZXNzLmNvdW50cnkgfHwgYWRkcmVzcy5jb3VudHJ5ID09PSBcIlVTXCIpIHtcbiAgICAgIG1ldGhvZHMuaXNWYWxpZCA9IHRydWU7XG4gICAgICBtZXRob2RzLnZhbGlkYXRpb25FcnJvciA9IHVuZGVmaW5lZDtcbiAgICAgIG1ldGhvZHMuc2hpcHBpbmdNZXRob2RzID0gW3VzcHNdO1xuICAgICAgbWV0aG9kcy5zZWxlY3RlZFNoaXBwaW5nTWV0aG9kID0gdXNwcztcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0aG9kcy5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICBtZXRob2RzLnZhbGlkYXRpb25FcnJvciA9IFwiV2UgY2FuJ3Qgc2hpcCB0byB0aGlzIGNvdW50cnkuXCI7XG4gICAgfVxuICAgIHJldHVybiBtZXRob2RzO1xuICB9XG59Il19