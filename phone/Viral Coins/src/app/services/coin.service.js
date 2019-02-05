"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
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
        _this.isLoading = false;
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
    CoinService.prototype.getContests = function () {
        return rxjs_1.of([
            {
                id: "1",
                name: "Contest 1",
                objective: "This is the objective",
                created: new Date()
            },
        ]);
    };
    CoinService = __decorate([
        core_1.Injectable()
    ], CoinService);
    return CoinService;
}(base_service_1.BaseService));
exports.CoinService = CoinService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29pbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29pbi5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBQzNDLDRDQUFzRDtBQUN0RCw2QkFBc0M7QUFDdEMsb0NBQW1DO0FBRW5DLCtDQUE2QztBQUk3QztJQUFpQywrQkFBVztJQUQ1QztRQUFBLHFFQWlJQztRQS9IQyxhQUFPLEdBQVcsZUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQyxZQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ25CLFdBQUssR0FBTyxJQUFJLENBQUM7UUFDakIsaUJBQVcsR0FBWSxLQUFLLENBQUM7UUFDN0Isa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsb0JBQWMsR0FBWSxLQUFLLENBQUM7UUFDaEMscUJBQWUsR0FBWSxLQUFLLENBQUM7UUFDakMsa0JBQVksR0FBWSxLQUFLLENBQUM7UUFDOUIsZUFBUyxHQUFZLEtBQUssQ0FBQzs7SUF1SDdCLENBQUM7SUFySEMsMEJBQUksR0FBSixVQUFLLElBQUk7UUFDUCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDbEQsQ0FBQztJQUVELGdDQUFVLEdBQVY7UUFBQSxpQkFPQztRQU5DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQzthQUN6RSxJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsSUFBSTtZQUNOLEtBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzVCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUFBLGlCQU9DO1FBTkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDaEYsSUFBSSxDQUNILGVBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELDJCQUFLLEdBQUwsVUFBTSxJQUFJO1FBQ1IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELHlCQUFHLEdBQUg7UUFBQSxpQkFPQztRQU5DLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVksRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNoRixJQUFJLENBQ0gsZUFBRyxDQUFDLFVBQUEsSUFBSTtZQUNOLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDTixDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUFBLGlCQU9DO1FBTkMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDO2FBQ25GLElBQUksQ0FDSCxlQUFHLENBQUMsVUFBQSxJQUFJO1lBQ04sS0FBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNOLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLO1FBQy9DLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBRTtZQUN0QyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUs7U0FDdkYsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxFQUFFO1FBQ1QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxHQUFHLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRUQsMEJBQUksR0FBSixVQUFLLEVBQUU7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLEVBQUUsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLEVBQUU7UUFDUCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUUsRUFBQyxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBRUQsNEJBQU0sR0FBTixVQUFPLEVBQUU7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxPQUFPO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGVBQWUsRUFBRTtZQUMvQyxLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixPQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsOEJBQVEsR0FBUjtRQUNFLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsK0JBQVMsR0FBVCxVQUFVLE1BQU0sRUFBRSxLQUFLO1FBQ3JCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsRUFBRTtZQUM1QyxNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELDhCQUFRLEdBQVIsVUFBUyxPQUFPO1FBQ2QsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxHQUFHLE9BQU8sQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCwrQkFBUyxHQUFUO1FBQUEsaUJBT0M7UUFOQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDOUUsSUFBSSxDQUNILGVBQUcsQ0FBQyxVQUFBLElBQUk7WUFDTixLQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxPQUFPO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsR0FBRyxPQUFPLEVBQUUsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLE9BQU87UUFDakIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsY0FBYyxHQUFHLE9BQU8sRUFBRSxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO0lBQ2xGLENBQUM7SUFFRCxpQ0FBVyxHQUFYO1FBQ0UsT0FBTyxTQUFFLENBQUM7WUFDVjtnQkFDRSxFQUFFLEVBQUUsR0FBRztnQkFDUCxJQUFJLEVBQUUsV0FBVztnQkFDakIsU0FBUyxFQUFFLHVCQUF1QjtnQkFDbEMsT0FBTyxFQUFFLElBQUksSUFBSSxFQUFFO2FBQ3BCO1NBQ0EsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQS9IVSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7T0FDQSxXQUFXLENBZ0l2QjtJQUFELGtCQUFDO0NBQUEsQUFoSUQsQ0FBaUMsMEJBQVcsR0FnSTNDO0FBaElZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBjYXRjaEVycm9yLCBtYXAsIHRhcCB9IGZyb20gXCJyeGpzL29wZXJhdG9yc1wiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgKiBhcyBhcHBTZXR0aW5ncyBmcm9tICd0bnMtY29yZS1tb2R1bGVzL2FwcGxpY2F0aW9uLXNldHRpbmdzJztcbmltcG9ydCB7IEJhc2VTZXJ2aWNlIH0gZnJvbSAnLi9iYXNlLnNlcnZpY2UnO1xuaW1wb3J0IHsgSHR0cCwgSGVhZGVycywgUmVzcG9uc2UgfSBmcm9tIFwiQGFuZ3VsYXIvaHR0cFwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQ29pblNlcnZpY2UgZXh0ZW5kcyBCYXNlU2VydmljZSB7XG4gIGJhc2VVcmw6IHN0cmluZyA9IENvbmZpZy5hcGlVcmw7XG4gIHdhbGxldDogYW55ID0gbnVsbDtcbiAgY29pbnM6IFtdID0gbnVsbDtcbiAgcmVsb2FkQ29pbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcmVsb2FkV2FsbGV0OiBib29sZWFuID0gZmFsc2U7XG4gIHJlbG9hZEFsbENvaW5zOiBib29sZWFuID0gZmFsc2U7XG4gIHJlbG9hZFNhbGVDb2luczogYm9vbGVhbiA9IGZhbHNlO1xuICByZWxvYWRPZmZlcnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XG5cbiAgbG9hZChjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMuYmFzZVVybCArIFwiL2NvaW4vXCIgKyBjb2RlKTtcbiAgfVxuXG4gIGxvYWRXYWxsZXQoKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQodGhpcy5iYXNlVXJsICsgXCIvd2FsbGV0XCIsIFwid2FsbGV0XCIsIHRoaXMucmVsb2FkV2FsbGV0KVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnJlbG9hZFdhbGxldCA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGZpbmQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKHRoaXMuYmFzZVVybCArIFwiL2NvaW5zL2F2YWlsYWJsZVwiLCBcImNvaW5zXCIsIHRoaXMucmVsb2FkQ29pbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucmVsb2FkQ29pbnMgPSBmYWxzZTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cblxuICBjbGFpbShjb2RlKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCh0aGlzLmJhc2VVcmwgKyBcIi9jb2luL2NsYWltXCIsIHsgY29kZTogY29kZSB9KTtcbiAgfVxuXG4gIGFsbCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRDYWNoZWQodGhpcy5iYXNlVXJsICsgXCIvY29pbnMvYWxsXCIsIFwiYWxsY29pbnNcIiwgdGhpcy5yZWxvYWRBbGxDb2lucylcbiAgICAgIC5waXBlKFxuICAgICAgICB0YXAoZGF0YSA9PiB7XG4gICAgICAgICAgdGhpcy5yZWxvYWRBbGxDb2lucyA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIHNhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKHRoaXMuYmFzZVVybCArIFwiL2NvaW5zL3NhbGVcIiwgXCJzYWxlY29pbnNcIiwgdGhpcy5yZWxvYWRTYWxlQ29pbnMpXG4gICAgICAucGlwZShcbiAgICAgICAgdGFwKGRhdGEgPT4ge1xuICAgICAgICAgIHRoaXMucmVsb2FkU2FsZUNvaW5zID0gZmFsc2U7XG4gICAgICAgIH0pXG4gICAgICApO1xuICB9ICBcblxuICBjcmVhdGUobGF0LCBsb25nLCBjb2RlLCBkZXNjcmlwdGlvbiwgcHJpemUsIHByaWNlKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KHRoaXMuYmFzZVVybCArIFwiL2NvaW5cIiwge1xuICAgICAgbGF0OiBsYXQsIGxvbmc6IGxvbmcsIGNvZGU6IGNvZGUsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbiwgcHJpemU6IHByaXplLCBwcmljZTogcHJpY2VcbiAgICB9KTtcbiAgfVxuXG4gIGFjdGl2YXRlKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KHRoaXMuYmFzZVVybCArIFwiL2NvaW4vXCIgKyBpZCArIFwiL2FjdGl2YXRlXCIpO1xuICB9XG5cbiAgc2VsbChpZCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QodGhpcy5iYXNlVXJsICsgXCIvY29pbi9zZWxsXCIsIHtpZDogaWR9KTtcbiAgfVxuXG4gIHVubGlzdChpZCkge1xuICAgIHJldHVybiB0aGlzLnBvc3QodGhpcy5iYXNlVXJsICsgXCIvY29pbi91bmxpc3RcIiwge2lkOiBpZH0pO1xuICB9ICBcblxuICByZW1vdmUoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxldGUodGhpcy5iYXNlVXJsICsgXCIvY29pbi9cIiArIGlkKTtcbiAgfVxuXG4gIHJlZGVlbVByaXplKGNvaW5JZCwgZmlyc3QsIGxhc3QsIGFkZHJlc3MpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KHRoaXMuYmFzZVVybCArIFwiL3ByaXplL3JlZGVlbVwiLCB7XG4gICAgICBmaXJzdDogZmlyc3QsXG4gICAgICBsYXN0OiBsYXN0LFxuICAgICAgY29pbjogY29pbklkLFxuICAgICAgYWRkcmVzczogYWRkcmVzc1xuICAgIH0pO1xuICB9XG5cbiAgY29pbkRyb3AoKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCh0aGlzLmJhc2VVcmwgKyBcIi9jb2lucy9kcm9wXCIsIHt9KTtcbiAgfVxuXG4gIG1ha2VPZmZlcihjb2luSWQsIG9mZmVyKSB7XG4gICAgcmV0dXJuIHRoaXMucHV0KHRoaXMuYmFzZVVybCArIFwiL2NvaW4vb2ZmZXJcIiwge1xuICAgICAgY29pbklkOiBjb2luSWQsXG4gICAgICB2YWx1ZTogb2ZmZXJcbiAgICB9KTtcbiAgfVxuXG4gIGdldE9mZmVyKG9mZmVySWQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXQodGhpcy5iYXNlVXJsICsgXCIvY29pbi9vZmZlci9cIiArIG9mZmVySWQpO1xuICB9ICBcblxuICBnZXRPZmZlcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0Q2FjaGVkKHRoaXMuYmFzZVVybCArIFwiL2NvaW4vb2ZmZXJzXCIsIFwib2ZmZXJzXCIsIHRoaXMucmVsb2FkT2ZmZXJzKVxuICAgICAgLnBpcGUoXG4gICAgICAgIHRhcChkYXRhID0+IHtcbiAgICAgICAgICB0aGlzLnJlbG9hZE9mZmVycyA9IGZhbHNlO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgfVxuXG4gIGFjY2VwdE9mZmVyKG9mZmVySWQpIHtcbiAgICByZXR1cm4gdGhpcy5wb3N0KHRoaXMuYmFzZVVybCArIFwiL2NvaW4vb2ZmZXIvXCIgKyBvZmZlcklkLCB7c3RhdHVzOiBcImFjY2VwdGVkXCJ9KTsgICAgXG4gIH1cblxuICByZWplY3RPZmZlcihvZmZlcklkKSB7XG4gICAgcmV0dXJuIHRoaXMucG9zdCh0aGlzLmJhc2VVcmwgKyBcIi9jb2luL29mZmVyL1wiICsgb2ZmZXJJZCwge3N0YXR1czogXCJyZWplY3RlZFwifSk7XG4gIH1cblxuICBnZXRDb250ZXN0cygpIHtcbiAgICByZXR1cm4gb2YoW1xuICAgIHtcbiAgICAgIGlkOiBcIjFcIixcbiAgICAgIG5hbWU6IFwiQ29udGVzdCAxXCIsXG4gICAgICBvYmplY3RpdmU6IFwiVGhpcyBpcyB0aGUgb2JqZWN0aXZlXCIsXG4gICAgICBjcmVhdGVkOiBuZXcgRGF0ZSgpXG4gICAgfSxcbiAgICBdKVxuICB9XG59XG4iXX0=