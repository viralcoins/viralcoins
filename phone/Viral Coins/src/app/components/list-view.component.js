"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var rxjs_1 = require("rxjs");
var ListViewComponent = /** @class */ (function () {
    function ListViewComponent(loadingService) {
        this.loadingService = loadingService;
        this.templateSelectorFunction = function (item, index, items) {
            return "";
        };
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
    }
    ListViewComponent.prototype.ngOnInit = function () {
        this.loadingService.setLoading(true);
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
    };
    Object.defineProperty(ListViewComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListViewComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    ListViewComponent.prototype.getData = function () {
        return rxjs_1.of([]);
    };
    ListViewComponent.prototype.populateData = function (response) {
        this._dataItems.splice(0);
        if (response.length > 0) {
            for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                var item = response_1[_i];
                this._dataItems.push(item);
            }
        }
        else {
            this._dataItems.push({ type: 'empty' });
        }
    };
    ListViewComponent.prototype.load = function () {
        var _this_1 = this;
        var _this = this;
        this.getData().subscribe(function (response) {
            _this_1.populateData(response);
            setTimeout(function () {
                _this.componentListView.listView.notifyPullToRefreshFinished();
            });
            _this_1.loadingService.setLoading(false);
        });
    };
    ListViewComponent.prototype.doReload = function () {
        // example: this.service.reloadVariable = true;
    };
    ListViewComponent.prototype.onPullToRefreshInitiated = function ($event) {
        var _this = this;
        setTimeout(function () {
            _this.doReload();
            _this.load();
        }, 1000);
    };
    __decorate([
        core_1.ViewChild('componentListView'),
        __metadata("design:type", Object)
    ], ListViewComponent.prototype, "componentListView", void 0);
    return ListViewComponent;
}());
exports.ListViewComponent = ListViewComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxpc3Qtdmlldy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBa0Q7QUFDbEQsMkVBQXlFO0FBQ3pFLDZCQUEwQjtBQUcxQjtJQUdFLDJCQUFtQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUEwQnZDLDZCQUF3QixHQUFHLFVBQUMsSUFBUyxFQUFFLEtBQWEsRUFBRSxLQUFVO1lBQ3hFLE9BQU8sRUFBRSxDQUFDO1FBQ1osQ0FBQyxDQUFBO1FBM0JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN6RCxDQUFDO0lBRUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyx3QkFBd0IsQ0FBQztJQUN6RCxDQUFDO0lBS0Qsc0JBQUksd0NBQVM7YUFBYjtZQUNFLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFnQjthQUFwQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFxQixLQUF1RDtZQUMxRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxDQUFDO1FBQ2pDLENBQUM7OztPQUpBO0lBVVMsbUNBQU8sR0FBakI7UUFDRSxPQUFPLFNBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRVMsd0NBQVksR0FBdEIsVUFBdUIsUUFBUTtRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZCLEtBQWlCLFVBQVEsRUFBUixxQkFBUSxFQUFSLHNCQUFRLEVBQVIsSUFBUSxFQUFFO2dCQUF0QixJQUFJLElBQUksaUJBQUE7Z0JBQ1gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7U0FDRjthQUFNO1lBQ0wsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztTQUN2QztJQUNILENBQUM7SUFFUyxnQ0FBSSxHQUFkO1FBQUEsbUJBU0M7UUFSQyxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLFFBQVE7WUFDL0IsT0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QixVQUFVLENBQUM7Z0JBQ1QsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ2pFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBSSxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRVMsb0NBQVEsR0FBbEI7UUFDRSwrQ0FBK0M7SUFDakQsQ0FBQztJQUVNLG9EQUF3QixHQUEvQixVQUFnQyxNQUFNO1FBQ3BDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixVQUFVLENBQUM7WUFDVCxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2YsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQXBFK0I7UUFBL0IsZ0JBQVMsQ0FBQyxtQkFBbUIsQ0FBQzs7Z0VBQW1CO0lBcUVwRCx3QkFBQztDQUFBLEFBdEVELElBc0VDO0FBdEVZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFZpZXdDaGlsZCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlQXJyYXkgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBMb2FkaW5nU2VydmljZSB9IGZyb20gJy4uL3NlcnZpY2VzL2xvYWRpbmcuc2VydmljZSc7XG5cbmV4cG9ydCBjbGFzcyBMaXN0Vmlld0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBWaWV3Q2hpbGQoJ2NvbXBvbmVudExpc3RWaWV3JykgY29tcG9uZW50TGlzdFZpZXc7XG5cbiAgY29uc3RydWN0b3IocHVibGljIGxvYWRpbmdTZXJ2aWNlOiBMb2FkaW5nU2VydmljZSkge1xuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLl90ZW1wbGF0ZVNlbGVjdG9yID0gdGhpcy50ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb247XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNldExvYWRpbmcodHJ1ZSk7ICAgIFxuICAgIHRoaXMuX2RhdGFJdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoKTtcbiAgICB0aGlzLl90ZW1wbGF0ZVNlbGVjdG9yID0gdGhpcy50ZW1wbGF0ZVNlbGVjdG9yRnVuY3Rpb247ICAgIFxuICB9XG5cbiAgcHJvdGVjdGVkIF9kYXRhSXRlbXM6IE9ic2VydmFibGVBcnJheTxhbnk+O1xuICBwcm90ZWN0ZWQgX3RlbXBsYXRlU2VsZWN0b3I6IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IHN0cmluZztcblxuICBnZXQgZGF0YUl0ZW1zKCk6IE9ic2VydmFibGVBcnJheTxhbnk+IHtcbiAgICByZXR1cm4gdGhpcy5fZGF0YUl0ZW1zO1xuICB9IFxuXG4gIGdldCB0ZW1wbGF0ZVNlbGVjdG9yKCk6IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpID0+IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3RlbXBsYXRlU2VsZWN0b3I7XG4gIH1cblxuICBzZXQgdGVtcGxhdGVTZWxlY3Rvcih2YWx1ZTogKGl0ZW06IGFueSwgaW5kZXg6IG51bWJlciwgaXRlbXM6IGFueSkgPT4gc3RyaW5nKSB7XG4gICAgdGhpcy5fdGVtcGxhdGVTZWxlY3RvciA9IHZhbHVlO1xuICB9XG5cbiAgcHJvdGVjdGVkIHRlbXBsYXRlU2VsZWN0b3JGdW5jdGlvbiA9IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBcIlwiO1xuICB9ICBcblxuICBwcm90ZWN0ZWQgZ2V0RGF0YSgpIHtcbiAgICByZXR1cm4gb2YoW10pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHBvcHVsYXRlRGF0YShyZXNwb25zZSkge1xuICAgIHRoaXMuX2RhdGFJdGVtcy5zcGxpY2UoMCk7XG4gICAgaWYgKHJlc3BvbnNlLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGl0ZW0gb2YgcmVzcG9uc2UpIHtcbiAgICAgICAgdGhpcy5fZGF0YUl0ZW1zLnB1c2goaXRlbSk7XG4gICAgICB9ICAgICAgICAgICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZGF0YUl0ZW1zLnB1c2goe3R5cGU6ICdlbXB0eSd9KTtcbiAgICB9XG4gIH1cblxuICBwcm90ZWN0ZWQgbG9hZCgpIHtcbiAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgdGhpcy5nZXREYXRhKCkuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHtcbiAgICAgIHRoaXMucG9wdWxhdGVEYXRhKHJlc3BvbnNlKTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIF90aGlzLmNvbXBvbmVudExpc3RWaWV3Lmxpc3RWaWV3Lm5vdGlmeVB1bGxUb1JlZnJlc2hGaW5pc2hlZCgpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLmxvYWRpbmdTZXJ2aWNlLnNldExvYWRpbmcoZmFsc2UpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIGRvUmVsb2FkKCk6IHZvaWQge1xuICAgIC8vIGV4YW1wbGU6IHRoaXMuc2VydmljZS5yZWxvYWRWYXJpYWJsZSA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgb25QdWxsVG9SZWZyZXNoSW5pdGlhdGVkKCRldmVudCkge1xuICAgIGNvbnN0IF90aGlzID0gdGhpczsgICAgXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBfdGhpcy5kb1JlbG9hZCgpO1xuICAgICAgX3RoaXMubG9hZCgpO1xuICAgIH0sIDEwMDApOyAgICBcbiAgfSAgXG59XG4iXX0=