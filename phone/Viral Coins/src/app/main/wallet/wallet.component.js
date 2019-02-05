"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var coin_service_1 = require("../../services/coin.service");
var cache_service_1 = require("../../services/cache.service");
var page_1 = require("ui/page");
var help_component_1 = require("../../components/help/help.component");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var SocialShare = require("nativescript-social-share");
var image_source_1 = require("image-source");
var detail_modal_component_1 = require("../detail-modal/detail-modal.component");
var redeem_component_1 = require("../redeem/redeem.component");
var config_1 = require("../../config");
var router_1 = require("nativescript-angular/router");
var list_view_component_1 = require("../../components/list-view.component");
var operators_1 = require("rxjs/operators");
var loading_service_1 = require("../../services/loading.service");
var WalletComponent = /** @class */ (function (_super) {
    __extends(WalletComponent, _super);
    function WalletComponent(coinService, page, routerExtensions, modal, vcRef, cacheService, loadingService) {
        var _this = _super.call(this, loadingService) || this;
        _this.coinService = coinService;
        _this.page = page;
        _this.routerExtensions = routerExtensions;
        _this.modal = modal;
        _this.vcRef = vcRef;
        _this.cacheService = cacheService;
        _this.loadingService = loadingService;
        _this.totalValue = 0;
        _this.percentage = 0;
        _this.templateSelectorFunction = function (item, index, items) {
            return item.type == null ? 'coin' : 'empty';
        };
        _this.page.actionBarHidden = true;
        return _this;
    }
    WalletComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.page.actionBarHidden = true;
        this.load();
    };
    WalletComponent.prototype.getData = function () {
        var _this = this;
        return this.coinService.loadWallet().pipe(operators_1.map(function (wallet) {
            _this.wallet = wallet;
            return wallet.coins;
        }));
    };
    WalletComponent.prototype.onFindTap = function () {
        this.routerExtensions.navigate(['/main/find']);
    };
    WalletComponent.prototype.onBuyTap = function () {
        this.routerExtensions.navigate(['/trade'], {
            transition: {
                name: 'slideLeft'
            }
        });
    };
    WalletComponent.prototype.onHelpTap = function () {
        var helpText = "Your wallet displays which coins you own as well as the total value of those coins. Once a coin is found and claimed it will show up here.";
        var options = {
            viewContainerRef: this.vcRef,
            context: {
                header: "Wallet",
                content: helpText
            },
            fullscreen: true
        };
        this.modal.showModal(help_component_1.HelpComponent, options)
            .then(function () {
            console.log("");
        });
    };
    WalletComponent.prototype.onUpdated = function (coins) {
        this.wallet.coins = coins;
        this.cacheService.store("wallet", this.wallet);
    };
    WalletComponent.prototype.doReload = function () {
        this.coinService.reloadWallet = true;
    };
    WalletComponent.prototype.onItemTap = function (coin) {
        var _this = this;
        var options = {
            viewContainerRef: this.vcRef,
            context: coin,
            fullscreen: true
        };
        this.modal.showModal(detail_modal_component_1.DetailModalComponent, options)
            .then(function (result) {
            if (result) {
                switch (result.action) {
                    case "share":
                        image_source_1.fromUrl(config_1.Config.apiUrl + "/coin/" + result.value + "/qr?size=4").then(function (image) {
                            SocialShare.shareImage(image);
                        });
                        break;
                    case "close":
                        _this.updateCoin(result.value);
                        break;
                }
            }
        });
    };
    WalletComponent.prototype.onRedeemTap = function (coin) {
        var options = {
            viewContainerRef: this.vcRef,
            context: coin,
            fullscreen: true
        };
        this.modal.showModal(redeem_component_1.RedeemComponent, options)
            .then(function (result) { });
    };
    WalletComponent.prototype.updateCoin = function (coin) {
        for (var i = 0; i < this._dataItems.length; i++) {
            if (this._dataItems.getItem(i).id == coin.id) {
                this._dataItems.setItem(i, coin);
            }
        }
        this.onUpdated(this._dataItems.slice(0, this._dataItems.length));
    };
    WalletComponent = __decorate([
        core_1.Component({
            selector: "wallet",
            moduleId: module.id,
            templateUrl: "./wallet.component.html",
            styleUrls: ['./wallet.component.css']
        }),
        __metadata("design:paramtypes", [coin_service_1.CoinService,
            page_1.Page,
            router_1.RouterExtensions,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            cache_service_1.CacheService,
            loading_service_1.LoadingService])
    ], WalletComponent);
    return WalletComponent;
}(list_view_component_1.ListViewComponent));
exports.WalletComponent = WalletComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIndhbGxldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBK0U7QUFDL0UsNERBQTBEO0FBQzFELDhEQUE0RDtBQUU1RCxnQ0FBK0I7QUFDL0IsdUVBQXFFO0FBQ3JFLG1FQUFpRztBQUNqRyx1REFBeUQ7QUFDekQsNkNBQXVDO0FBQ3ZDLGlGQUE4RTtBQUM5RSwrREFBNkQ7QUFDN0QsdUNBQXNDO0FBQ3RDLHNEQUErRDtBQUsvRCw0RUFBeUU7QUFFekUsNENBQXNEO0FBQ3RELGtFQUFnRTtBQVFoRTtJQUFxQyxtQ0FBaUI7SUFLcEQseUJBQ1UsV0FBd0IsRUFDeEIsSUFBVSxFQUNWLGdCQUFrQyxFQUNsQyxLQUF5QixFQUN6QixLQUF1QixFQUN2QixZQUEwQixFQUMzQixjQUE4QjtRQVB2QyxZQVNFLGtCQUFNLGNBQWMsQ0FBQyxTQUV0QjtRQVZTLGlCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUksR0FBSixJQUFJLENBQU07UUFDVixzQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFdBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzNCLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQVZ2QyxnQkFBVSxHQUFHLENBQUMsQ0FBQztRQUNmLGdCQUFVLEdBQUcsQ0FBQyxDQUFDO1FBcUJSLDhCQUF3QixHQUFHLFVBQUMsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFVO1lBQ3JFLE9BQU8sSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQzlDLENBQUMsQ0FBQTtRQVhDLEtBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQzs7SUFDbkMsQ0FBQztJ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Q29tcG9uZW50LCBPbkluaXQsIFZpZXdDb250YWluZXJSZWYsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBDb2luU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jb2luLnNlcnZpY2VcIjtcbmltcG9ydCB7IENhY2hlU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlcy9jYWNoZS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBDb2luIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvaW4ubW9kZWwnO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBIZWxwQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9oZWxwL2hlbHAuY29tcG9uZW50JztcbmltcG9ydCB7IE1vZGFsRGlhbG9nU2VydmljZSwgTW9kYWxEaWFsb2dPcHRpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvZGlyZWN0aXZlcy9kaWFsb2dzJztcbmltcG9ydCAqIGFzIFNvY2lhbFNoYXJlIGZyb20gXCJuYXRpdmVzY3JpcHQtc29jaWFsLXNoYXJlXCI7XG5pbXBvcnQgeyBmcm9tVXJsIH0gZnJvbSBcImltYWdlLXNvdXJjZVwiO1xuaW1wb3J0IHsgRGV0YWlsTW9kYWxDb21wb25lbnQgfSBmcm9tIFwiLi4vZGV0YWlsLW1vZGFsL2RldGFpbC1tb2RhbC5jb21wb25lbnRcIjtcbmltcG9ydCB7IFJlZGVlbUNvbXBvbmVudCB9IGZyb20gXCIuLi9yZWRlZW0vcmVkZWVtLmNvbXBvbmVudFwiO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSBcIi4uLy4uL2NvbmZpZ1wiO1xuaW1wb3J0IHsgUm91dGVyRXh0ZW5zaW9ucyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTGlzdFZpZXdFdmVudERhdGEgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXVpLWxpc3R2aWV3XCI7XG5pbXBvcnQgeyBzZXRUaW1lb3V0IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdGltZXJcIjtcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgTGlzdFZpZXdDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2xpc3Qtdmlldy5jb21wb25lbnQnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY2F0Y2hFcnJvciwgbWFwLCB0YXAgfSBmcm9tIFwicnhqcy9vcGVyYXRvcnNcIjtcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiBcIndhbGxldFwiLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICB0ZW1wbGF0ZVVybDogXCIuL3dhbGxldC5jb21wb25lbnQuaHRtbFwiLFxuICBzdHlsZVVybHM6IFsnLi93YWxsZXQuY29tcG9uZW50LmNzcyddXG59KVxuZXhwb3J0IGNsYXNzIFdhbGxldENvbXBvbmVudCBleHRlbmRzIExpc3RWaWV3Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgd2FsbGV0OiBhbnk7XG4gIHRvdGFsVmFsdWUgPSAwO1xuICBwZXJjZW50YWdlID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGNvaW5TZXJ2aWNlOiBDb2luU2VydmljZSxcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2UsXG4gICAgcHJpdmF0ZSByb3V0ZXJFeHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgY2FjaGVTZXJ2aWNlOiBDYWNoZVNlcnZpY2UsXG4gICAgcHVibGljIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZVxuICApIHtcbiAgICBzdXBlcihsb2FkaW5nU2VydmljZSk7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHsgIFxuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5wYWdlLmFjdGlvbkJhckhpZGRlbiA9IHRydWU7ICBcbiAgICB0aGlzLmxvYWQoKTtcbiAgfVxuXG4gIHB1YmxpYyB0ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb24gPSAoaXRlbTogYW55LCBpbmRleDogbnVtYmVyLCBpdGVtczogYW55KTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gaXRlbS50eXBlID09IG51bGwgPyAnY29pbicgOiAnZW1wdHknO1xuICB9XG5cbiAgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gdGhpcy5jb2luU2VydmljZS5sb2FkV2FsbGV0KCkucGlwZShcbiAgICAgIG1hcCh3YWxsZXQgPT4ge1xuICAgICAgICB0aGlzLndhbGxldCA9IHdhbGxldDtcbiAgICAgICAgcmV0dXJuIHdhbGxldC5jb2lucztcbiAgICAgIH0pXG4gICAgKTtcbiAgfSBcblxuICBvbkZpbmRUYXAoKTogdm9pZCB7XG4gICAgdGhpcy5yb3V0ZXJFeHRlbnNpb25zLm5hdmlnYXRlKFsnL21haW4vZmluZCddKTtcbiAgfVxuXG4gIG9uQnV5VGFwKCk6IHZvaWQge1xuICAgIHRoaXMucm91dGVyRXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJy90cmFkZSddLCB7XG4gICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgIG5hbWU6ICdzbGlkZUxlZnQnXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBvbkhlbHBUYXAoKTogdm9pZCB7XG4gICAgY29uc3QgaGVscFRleHQgPSBcIllvdXIgd2FsbGV0IGRpc3BsYXlzIHdoaWNoIGNvaW5zIHlvdSBvd24gYXMgd2VsbCBhcyB0aGUgdG90YWwgdmFsdWUgb2YgdGhvc2UgY29pbnMuIE9uY2UgYSBjb2luIGlzIGZvdW5kIGFuZCBjbGFpbWVkIGl0IHdpbGwgc2hvdyB1cCBoZXJlLlwiO1xuXG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgIGNvbnRleHQ6IHtcbiAgICAgICAgaGVhZGVyOiBcIldhbGxldFwiLFxuICAgICAgICBjb250ZW50OiBoZWxwVGV4dFxuICAgICAgfSxcbiAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoSGVscENvbXBvbmVudCwgb3B0aW9ucylcbiAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJcIik7XG4gICAgICB9KTtcbiAgfVxuXG4gIG9uVXBkYXRlZChjb2lucyk6IHZvaWQge1xuICAgIHRoaXMud2FsbGV0LmNvaW5zID0gY29pbnM7XG4gICAgdGhpcy5jYWNoZVNlcnZpY2Uuc3RvcmUoXCJ3YWxsZXRcIiwgdGhpcy53YWxsZXQpO1xuICB9XG5cbiAgcHVibGljIGRvUmVsb2FkKCkge1xuICAgIHRoaXMuY29pblNlcnZpY2UucmVsb2FkV2FsbGV0ID0gdHJ1ZTsgICAgXG4gIH1cblxuICBwdWJsaWMgb25JdGVtVGFwKGNvaW4pIHtcbiAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgY29udGV4dDogY29pbixcbiAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoRGV0YWlsTW9kYWxDb21wb25lbnQsIG9wdGlvbnMpXG4gICAgICAudGhlbigocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHN3aXRjaCAocmVzdWx0LmFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcInNoYXJlXCI6XG4gICAgICAgICAgICAgIGZyb21VcmwoQ29uZmlnLmFwaVVybCArIFwiL2NvaW4vXCIgKyByZXN1bHQudmFsdWUgKyBcIi9xcj9zaXplPTRcIikudGhlbihpbWFnZSA9PiB7XG4gICAgICAgICAgICAgICAgU29jaWFsU2hhcmUuc2hhcmVJbWFnZShpbWFnZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJjbG9zZVwiOlxuICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNvaW4ocmVzdWx0LnZhbHVlKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcHVibGljIG9uUmVkZWVtVGFwKGNvaW4pOiB2b2lkIHtcbiAgICBjb25zdCBvcHRpb25zOiBNb2RhbERpYWxvZ09wdGlvbnMgPSB7XG4gICAgICB2aWV3Q29udGFpbmVyUmVmOiB0aGlzLnZjUmVmLFxuICAgICAgY29udGV4dDogY29pbixcbiAgICAgIGZ1bGxzY3JlZW46IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbC5zaG93TW9kYWwoUmVkZWVtQ29tcG9uZW50LCBvcHRpb25zKVxuICAgICAgLnRoZW4oKHJlc3VsdDogYW55KSA9PiB7fSk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlQ29pbihjb2luKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kYXRhSXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmICh0aGlzLl9kYXRhSXRlbXMuZ2V0SXRlbShpKS5pZCA9PSBjb2luLmlkKSB7XG4gICAgICAgIHRoaXMuX2RhdGFJdGVtcy5zZXRJdGVtKGksIGNvaW4pO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm9uVXBkYXRlZCh0aGlzLl9kYXRhSXRlbXMuc2xpY2UoMCwgdGhpcy5fZGF0YUl0ZW1zLmxlbmd0aCkpO1xuICB9ICBcbn1cbiJdfQ==