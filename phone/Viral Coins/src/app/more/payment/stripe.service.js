"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var httpModule = require("http");
var standard_1 = require("nativescript-stripe/standard");
var config_1 = require("../../config");
// 1) To get started with this demo, first head to https://dashboard.stripe.com/account/apikeys
// and copy your "Test Publishable Key" (it looks like pk_test_abcdef) into the line below.
var publishableKey = "pk_test_c0uWeezufA7GtMmSBaGZb6Md";
// 2) Next, optionally, to have this demo save your user's payment details, head to
// https://github.com/stripe/example-ios-backend , click "Deploy to Heroku", and follow
// the instructions (don't worry, it's free). Paste your Heroku URL below
// (it looks like https://blazing-sunrise-1234.herokuapp.com ).
var backendBaseURL = config_1.Config.apiUrl;
// 3) Optionally, to enable Apple Pay, follow the instructions at https://stripe.com/docs/mobile/apple-pay
// to create an Apple Merchant ID. Paste it below (it looks like merchant.com.yourappname).
var appleMerchantID = "";
var StripeService = /** @class */ (function () {
    function StripeService() {
        standard_1.StripeConfig.shared().backendAPI = this;
        standard_1.StripeConfig.shared().publishableKey = publishableKey;
        standard_1.StripeConfig.shared().appleMerchantID = appleMerchantID;
        standard_1.StripeConfig.shared().companyName = "viralcoins.co";
        standard_1.StripeConfig.shared().requiredShippingAddressFields = [
            "address" /* PostalAddress */
        ];
        this.customerSession = new standard_1.StripeCustomerSession();
    }
    StripeService.prototype.backendURL = function (pathComponent) {
        if (!backendBaseURL)
            throw new Error("backendBaseURL must be set");
        if (!backendBaseURL.endsWith("/")) {
            return backendBaseURL + "/" + pathComponent;
        }
        else {
            return backendBaseURL + pathComponent;
        }
    };
    StripeService.prototype.createCustomerKey = function (apiVersion) {
        var url = this.backendURL("ephemeral_keys");
        return httpModule.request({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                "Authorization": "Bearer " + config_1.Config.token
            },
            content: "api_version=" + apiVersion
        }).then(function (response) {
            if (response.statusCode < 200 || response.statusCode >= 300) {
                throw new Error(response.content.toString());
            }
            return response.content.toJSON();
        });
    };
    StripeService.prototype.completeCharge = function (stripeID, amount, shippingMethod, shippingAddress) {
        var url = this.backendURL("charge");
        return httpModule.request({
            url: url,
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
                "Authorization": "Bearer " + config_1.Config.token
            },
            content: "source=" + stripeID +
                "&amount=" + amount +
                "&" + this.encodeShipping(shippingMethod, shippingAddress) +
                "&coinId=" + this.coinId
        }).then(function (response) {
            if (response.statusCode < 200 || response.statusCode >= 300) {
                throw new Error(response.content.toString());
            }
        });
    };
    StripeService.prototype.encodeShipping = function (method, address) {
        function entry(label, value) {
            return value ? encodeURI(label) + "=" + encodeURI(value) : "";
        }
        return entry("shipping[carrier]", method.label) +
            entry("&shipping[name]", address.name) +
            entry("&shipping[address][line1]", address.line1) +
            entry("&shipping[address][line2]", address.line2) +
            entry("&shipping[address][city]", address.city) +
            entry("&shipping[address][state]", address.state) +
            entry("&shipping[address][country]", address.country) +
            entry("&shipping[address][postal_code]", address.postalCode) +
            entry("&phone", address.phone) +
            entry("&email", address.email);
    };
    StripeService.prototype.createPaymentSession = function (page, price, listener) {
        return new standard_1.StripePaymentSession(page, this.customerSession, price, "usd", listener);
    };
    StripeService.prototype.setCoinId = function (coinId) {
        this.coinId = coinId;
    };
    StripeService.prototype.showPaymentMethods = function (paymentSession) {
        paymentSession.presentPaymentMethods();
    };
    StripeService.prototype.showShipping = function (paymentSession) {
        paymentSession.presentShipping();
    };
    StripeService.prototype.requestPayment = function (paymentSession) {
        paymentSession.requestPayment();
    };
    StripeService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], StripeService);
    return StripeService;
}());
exports.StripeService = StripeService;
