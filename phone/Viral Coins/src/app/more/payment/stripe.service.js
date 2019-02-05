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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaXBlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdHJpcGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUEyQztBQUMzQyxpQ0FBbUM7QUFDbkMseURBQW1OO0FBRW5OLHVDQUFzQztBQUV0QywrRkFBK0Y7QUFDL0YsMkZBQTJGO0FBQzNGLElBQU0sY0FBYyxHQUFHLGtDQUFrQyxDQUFDO0FBRTFELG1GQUFtRjtBQUNuRix1RkFBdUY7QUFDdkYseUVBQXlFO0FBQ3pFLCtEQUErRDtBQUMvRCxJQUFNLGNBQWMsR0FBVyxlQUFNLENBQUMsTUFBTSxDQUFDO0FBRTdDLDBHQUEwRztBQUMxRywyRkFBMkY7QUFDM0YsSUFBTSxlQUFlLEdBQUcsRUFBRSxDQUFDO0FBRzNCO0lBSUU7UUFDRSx1QkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDeEMsdUJBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3RELHVCQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztRQUN4RCx1QkFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7UUFDcEQsdUJBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyw2QkFBNkIsR0FBRzs7U0FFckQsQ0FBQztRQUVGLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxnQ0FBcUIsRUFBRSxDQUFDO0lBQ3JELENBQUM7SUFFTyxrQ0FBVSxHQUFsQixVQUFtQixhQUFxQjtRQUN0QyxJQUFJLENBQUMsY0FBYztZQUFFLE1BQU0sSUFBSSxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNuRSxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxPQUFPLGNBQWMsR0FBRyxHQUFHLEdBQUcsYUFBYSxDQUFDO1NBQzdDO2FBQU07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QyxRQUFRLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUM5QixLQUFLLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsNENBQW9CLEdBQXBCLFVBQXFCLElBQVUsRUFBRSxLQUFhLEVBQUUsUUFBZ0M7UUFDOUUsT0FBTyxJQUFJLCtCQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEYsQ0FBQztJQUVELGlDQUFTLEdBQVQsVUFBVSxNQUFjO1FBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwwQ0FBa0IsR0FBbEIsVUFBbUIsY0FBb0M7UUFDckQsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVELG9DQUFZLEdBQVosVUFBYSxjQUFvQztRQUMvQyxjQUFjLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUVELHNDQUFjLEdBQWQsVUFBZSxjQUFvQztRQUNqRCxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQWxHVSxhQUFhO1FBRHpCLGlCQUFVLEVBQUU7O09BQ0EsYUFBYSxDQW1HekI7SUFBRCxvQkFBQztDQUFBLEFBbkdELElBbUdDO0FBbkdZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgKiBhcyBodHRwTW9kdWxlIGZyb20gXCJodHRwXCI7XG5pbXBvcnQgeyBTdHJpcGVBZGRyZXNzLCBTdHJpcGVCYWNrZW5kQVBJLCBTdHJpcGVDb25maWcsIFN0cmlwZUN1c3RvbWVyU2Vzc2lvbiwgU3RyaXBlUGF5bWVudExpc3RlbmVyLCBTdHJpcGVQYXltZW50U2Vzc2lvbiwgU3RyaXBlU2hpcHBpbmdBZGRyZXNzRmllbGQsIFN0cmlwZVNoaXBwaW5nTWV0aG9kIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zdHJpcGUvc3RhbmRhcmRcIjtcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vLi4vY29uZmlnJztcblxuLy8gMSkgVG8gZ2V0IHN0YXJ0ZWQgd2l0aCB0aGlzIGRlbW8sIGZpcnN0IGhlYWQgdG8gaHR0cHM6Ly9kYXNoYm9hcmQuc3RyaXBlLmNvbS9hY2NvdW50L2FwaWtleXNcbi8vIGFuZCBjb3B5IHlvdXIgXCJUZXN0IFB1Ymxpc2hhYmxlIEtleVwiIChpdCBsb29rcyBsaWtlIHBrX3Rlc3RfYWJjZGVmKSBpbnRvIHRoZSBsaW5lIGJlbG93LlxuY29uc3QgcHVibGlzaGFibGVLZXkgPSBcInBrX3Rlc3RfYzB1V2VlenVmQTdHdE1tU0JhR1piNk1kXCI7XG5cbi8vIDIpIE5leHQsIG9wdGlvbmFsbHksIHRvIGhhdmUgdGhpcyBkZW1vIHNhdmUgeW91ciB1c2VyJ3MgcGF5bWVudCBkZXRhaWxzLCBoZWFkIHRvXG4vLyBodHRwczovL2dpdGh1Yi5jb20vc3RyaXBlL2V4YW1wbGUtaW9zLWJhY2tlbmQgLCBjbGljayBcIkRlcGxveSB0byBIZXJva3VcIiwgYW5kIGZvbGxvd1xuLy8gdGhlIGluc3RydWN0aW9ucyAoZG9uJ3Qgd29ycnksIGl0J3MgZnJlZSkuIFBhc3RlIHlvdXIgSGVyb2t1IFVSTCBiZWxvd1xuLy8gKGl0IGxvb2tzIGxpa2UgaHR0cHM6Ly9ibGF6aW5nLXN1bnJpc2UtMTIzNC5oZXJva3VhcHAuY29tICkuXG5jb25zdCBiYWNrZW5kQmFzZVVSTDogc3RyaW5nID0gQ29uZmlnLmFwaVVybDtcblxuLy8gMykgT3B0aW9uYWxseSwgdG8gZW5hYmxlIEFwcGxlIFBheSwgZm9sbG93IHRoZSBpbnN0cnVjdGlvbnMgYXQgaHR0cHM6Ly9zdHJpcGUuY29tL2RvY3MvbW9iaWxlL2FwcGxlLXBheVxuLy8gdG8gY3JlYXRlIGFuIEFwcGxlIE1lcmNoYW50IElELiBQYXN0ZSBpdCBiZWxvdyAoaXQgbG9va3MgbGlrZSBtZXJjaGFudC5jb20ueW91cmFwcG5hbWUpLlxuY29uc3QgYXBwbGVNZXJjaGFudElEID0gXCJcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFN0cmlwZVNlcnZpY2UgaW1wbGVtZW50cyBTdHJpcGVCYWNrZW5kQVBJIHtcbiAgcHJpdmF0ZSBjdXN0b21lclNlc3Npb246IFN0cmlwZUN1c3RvbWVyU2Vzc2lvbjtcbiAgcHJpdmF0ZSBjb2luSWQ6IHN0cmluZztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBTdHJpcGVDb25maWcuc2hhcmVkKCkuYmFja2VuZEFQSSA9IHRoaXM7XG4gICAgU3RyaXBlQ29uZmlnLnNoYXJlZCgpLnB1Ymxpc2hhYmxlS2V5ID0gcHVibGlzaGFibGVLZXk7XG4gICAgU3RyaXBlQ29uZmlnLnNoYXJlZCgpLmFwcGxlTWVyY2hhbnRJRCA9IGFwcGxlTWVyY2hhbnRJRDtcbiAgICBTdHJpcGVDb25maWcuc2hhcmVkKCkuY29tcGFueU5hbWUgPSBcInZpcmFsY29pbnMuY29cIjtcbiAgICBTdHJpcGVDb25maWcuc2hhcmVkKCkucmVxdWlyZWRTaGlwcGluZ0FkZHJlc3NGaWVsZHMgPSBbXG4gICAgICBTdHJpcGVTaGlwcGluZ0FkZHJlc3NGaWVsZC5Qb3N0YWxBZGRyZXNzXG4gICAgXTtcblxuICAgIHRoaXMuY3VzdG9tZXJTZXNzaW9uID0gbmV3IFN0cmlwZUN1c3RvbWVyU2Vzc2lvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBiYWNrZW5kVVJMKHBhdGhDb21wb25lbnQ6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgaWYgKCFiYWNrZW5kQmFzZVVSTCkgdGhyb3cgbmV3IEVycm9yKFwiYmFja2VuZEJhc2VVUkwgbXVzdCBiZSBzZXRcIik7XG4gICAgaWYgKCFiYWNrZW5kQmFzZVVSTC5lbmRzV2l0aChcIi9cIikpIHtcbiAgICAgIHJldHVybiBiYWNrZW5kQmFzZVVSTCArIFwiL1wiICsgcGF0aENvbXBvbmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJhY2tlbmRCYXNlVVJMICsgcGF0aENvbXBvbmVudDtcbiAgICB9XG4gIH1cblxuICBjcmVhdGVDdXN0b21lcktleShhcGlWZXJzaW9uOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xuICAgIGxldCB1cmwgPSB0aGlzLmJhY2tlbmRVUkwoXCJlcGhlbWVyYWxfa2V5c1wiKTtcbiAgICByZXR1cm4gaHR0cE1vZHVsZS5yZXF1ZXN0KHtcbiAgICAgIHVybDogdXJsLFxuICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLThcIixcbiAgICAgICAgXCJBdXRob3JpemF0aW9uXCI6IFwiQmVhcmVyIFwiICsgQ29uZmlnLnRva2VuXG4gICAgICB9LFxuICAgICAgY29udGVudDogXCJhcGlfdmVyc2lvbj1cIiArIGFwaVZlcnNpb25cbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlc3BvbnNlLnN0YXR1c0NvZGUgPj0gMzAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5jb250ZW50LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3BvbnNlLmNvbnRlbnQudG9KU09OKCk7XG4gICAgfSk7XG4gIH1cblxuICBjb21wbGV0ZUNoYXJnZShzdHJpcGVJRDogc3RyaW5nLCBhbW91bnQ6IG51bWJlciwgc2hpcHBpbmdNZXRob2Q6IFN0cmlwZVNoaXBwaW5nTWV0aG9kLCBzaGlwcGluZ0FkZHJlc3M6IFN0cmlwZUFkZHJlc3MpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgdXJsID0gdGhpcy5iYWNrZW5kVVJMKFwiY2hhcmdlXCIpO1xuICAgIHJldHVybiBodHRwTW9kdWxlLnJlcXVlc3Qoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOFwiLFxuICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogXCJCZWFyZXIgXCIgKyBDb25maWcudG9rZW5cbiAgICAgIH0sXG4gICAgICBjb250ZW50OlxuICAgICAgICBcInNvdXJjZT1cIiArIHN0cmlwZUlEICtcbiAgICAgICAgXCImYW1vdW50PVwiICsgYW1vdW50ICtcbiAgICAgICAgXCImXCIgKyB0aGlzLmVuY29kZVNoaXBwaW5nKHNoaXBwaW5nTWV0aG9kLCBzaGlwcGluZ0FkZHJlc3MpICtcbiAgICAgICAgXCImY29pbklkPVwiICsgdGhpcy5jb2luSWRcbiAgICB9KS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXNDb2RlIDwgMjAwIHx8IHJlc3BvbnNlLnN0YXR1c0NvZGUgPj0gMzAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5jb250ZW50LnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBlbmNvZGVTaGlwcGluZyhtZXRob2Q6IFN0cmlwZVNoaXBwaW5nTWV0aG9kLCBhZGRyZXNzOiBTdHJpcGVBZGRyZXNzKTogc3RyaW5nIHtcbiAgICBmdW5jdGlvbiBlbnRyeShsYWJlbDogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgIHJldHVybiB2YWx1ZSA/IGVuY29kZVVSSShsYWJlbCkgKyBcIj1cIiArIGVuY29kZVVSSSh2YWx1ZSkgOiBcIlwiO1xuICAgIH1cbiAgICByZXR1cm4gZW50cnkoXCJzaGlwcGluZ1tjYXJyaWVyXVwiLCBtZXRob2QubGFiZWwpICtcbiAgICAgIGVudHJ5KFwiJnNoaXBwaW5nW25hbWVdXCIsIGFkZHJlc3MubmFtZSkgK1xuICAgICAgZW50cnkoXCImc2hpcHBpbmdbYWRkcmVzc11bbGluZTFdXCIsIGFkZHJlc3MubGluZTEpICtcbiAgICAgIGVudHJ5KFwiJnNoaXBwaW5nW2FkZHJlc3NdW2xpbmUyXVwiLCBhZGRyZXNzLmxpbmUyKSArXG4gICAgICBlbnRyeShcIiZzaGlwcGluZ1thZGRyZXNzXVtjaXR5XVwiLCBhZGRyZXNzLmNpdHkpICtcbiAgICAgIGVudHJ5KFwiJnNoaXBwaW5nW2FkZHJlc3NdW3N0YXRlXVwiLCBhZGRyZXNzLnN0YXRlKSArXG4gICAgICBlbnRyeShcIiZzaGlwcGluZ1thZGRyZXNzXVtjb3VudHJ5XVwiLCBhZGRyZXNzLmNvdW50cnkpICtcbiAgICAgIGVudHJ5KFwiJnNoaXBwaW5nW2FkZHJlc3NdW3Bvc3RhbF9jb2RlXVwiLCBhZGRyZXNzLnBvc3RhbENvZGUpICtcbiAgICAgIGVudHJ5KFwiJnBob25lXCIsIGFkZHJlc3MucGhvbmUpICtcbiAgICAgIGVudHJ5KFwiJmVtYWlsXCIsIGFkZHJlc3MuZW1haWwpO1xuICB9XG5cbiAgY3JlYXRlUGF5bWVudFNlc3Npb24ocGFnZTogUGFnZSwgcHJpY2U6IG51bWJlciwgbGlzdGVuZXI/OiBTdHJpcGVQYXltZW50TGlzdGVuZXIpOiBTdHJpcGVQYXltZW50U2Vzc2lvbiB7XG4gICAgcmV0dXJuIG5ldyBTdHJpcGVQYXltZW50U2Vzc2lvbihwYWdlLCB0aGlzLmN1c3RvbWVyU2Vzc2lvbiwgcHJpY2UsIFwidXNkXCIsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHNldENvaW5JZChjb2luSWQ6IHN0cmluZykge1xuICAgIHRoaXMuY29pbklkID0gY29pbklkO1xuICB9XG5cbiAgc2hvd1BheW1lbnRNZXRob2RzKHBheW1lbnRTZXNzaW9uOiBTdHJpcGVQYXltZW50U2Vzc2lvbikge1xuICAgIHBheW1lbnRTZXNzaW9uLnByZXNlbnRQYXltZW50TWV0aG9kcygpO1xuICB9XG5cbiAgc2hvd1NoaXBwaW5nKHBheW1lbnRTZXNzaW9uOiBTdHJpcGVQYXltZW50U2Vzc2lvbikge1xuICAgIHBheW1lbnRTZXNzaW9uLnByZXNlbnRTaGlwcGluZygpO1xuICB9XG5cbiAgcmVxdWVzdFBheW1lbnQocGF5bWVudFNlc3Npb246IFN0cmlwZVBheW1lbnRTZXNzaW9uKSB7XG4gICAgcGF5bWVudFNlc3Npb24ucmVxdWVzdFBheW1lbnQoKTtcbiAgfVxufSJdfQ==