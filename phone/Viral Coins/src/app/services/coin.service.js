"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var config_1 = require("../config");
var base_service_1 = require("./base.service");
var CoinService = /** @class */ (function (_super) {
    __extends(CoinService, _super);
    function CoinService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.baseUrl = config_1.Config.apiUrl;
        _this.wallet = null;
        _this.coins = null;
        _this.reloadCoins = false;
        _this.reloadWallet = false;
        _this.reloadAllCoins = false;
        _this.reloadSaleCoins = false;
        _this.reloadOffers = false;
        return _this;
    }
    CoinService.prototype.load = function (code) {
        return this.get(this.baseUrl + "/coin/" + code);
    };
    CoinService.prototype.loadWallet = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/wallet", "wallet", this.reloadWallet)
            .pipe(operators_1.tap(function (data) {
            _this.reloadWallet = false;
        }));
    };
    CoinService.prototype.find = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/coins/available", "coins", this.reloadCoins)
            .pipe(operators_1.tap(function (data) {
            _this.reloadCoins = false;
        }));
    };
    CoinService.prototype.claim = function (code) {
        return this.post(this.baseUrl + "/coin/claim", { code: code });
    };
    CoinService.prototype.all = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/coins/all", "allcoins", this.reloadAllCoins)
            .pipe(operators_1.tap(function (data) {
            _this.reloadAllCoins = false;
        }));
    };
    CoinService.prototype.sale = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/coins/sale", "salecoins", this.reloadSaleCoins)
            .pipe(operators_1.tap(function (data) {
            _this.reloadSaleCoins = false;
        }));
    };
    CoinService.prototype.create = function (lat, long, code, description, prize, price) {
        return this.put(this.baseUrl + "/coin", {
            lat: lat, long: long, code: code, description: description, prize: prize, price: price
        });
    };
    CoinService.prototype.activate = function (id) {
        return this.get(this.baseUrl + "/coin/" + id + "/activate");
    };
    CoinService.prototype.sell = function (id) {
        return this.post(this.baseUrl + "/coin/sell", { id: id });
    };
    CoinService.prototype.unlist = function (id) {
        return this.post(this.baseUrl + "/coin/unlist", { id: id });
    };
    CoinService.prototype.remove = function (id) {
        return this.delete(this.baseUrl + "/coin/" + id);
    };
    CoinService.prototype.redeemPrize = function (coinId, first, last, address) {
        return this.post(this.baseUrl + "/prize/redeem", {
            first: first,
            last: last,
            coin: coinId,
            address: address
        });
    };
    CoinService.prototype.coinDrop = function () {
        return this.post(this.baseUrl + "/coins/drop", {});
    };
    CoinService.prototype.makeOffer = function (coinId, offer) {
        return this.put(this.baseUrl + "/coin/offer", {
            coinId: coinId,
            value: offer
        });
    };
    CoinService.prototype.getOffer = function (offerId) {
        return this.get(this.baseUrl + "/coin/offer/" + offerId);
    };
    CoinService.prototype.getOffers = function () {
        var _this = this;
        return this.getCached(this.baseUrl + "/coin/offers", "offers", this.reloadOffers)
            .pipe(operators_1.tap(function (data) {
            _this.reloadOffers = false;
        }));
    };
    CoinService.prototype.acceptOffer = function (offerId) {
        return this.post(this.baseUrl + "/coin/offer/" + offerId, { status: "accepted" });
    };
    CoinService.prototype.rejectOffer = function (offerId) {
        return this.post(this.baseUrl + "/coin/offer/" + offerId, { status: "rejected" });
    };
    CoinService = __decorate([
        core_1.Injectable()
    ], CoinService);
    return CoinService;
}(base_service_1.BaseService));
exports.CoinService = CoinService;
