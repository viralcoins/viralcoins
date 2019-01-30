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
