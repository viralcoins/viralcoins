"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var page_1 = require("ui/page");
var StatisticsComponent = /** @class */ (function () {
    function StatisticsComponent(page) {
        this.page = page;
        page.actionBarHidden = true;
    }
    Object.defineProperty(StatisticsComponent.prototype, "categoricalSource", {
        get: function () {
            return this._categoricalSource;
        },
        enumerable: true,
        configurable: true
    });
    StatisticsComponent.prototype.ngOnInit = function () {
        this._categoricalSource = new observable_array_1.ObservableArray([
            {
                "category": "Jan 26",
                "value": 10
            },
            {
                "category": "Jan 27",
                "value": 11
            },
            {
                "category": "Jan 28",
                "value": 15
            },
            {
                "category": "Jan 29",
                "value": 21
            },
            {
                "category": "Jan 30",
                "value": 25
            }
        ]);
    };
    StatisticsComponent = __decorate([
        core_1.Component({
            selector: 'ns-statistics',
            templateUrl: './statistics.component.html',
            styleUrls: ['./statistics.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], StatisticsComponent);
    return StatisticsComponent;
}());
exports.StatisticsComponent = StatisticsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGlzdGljcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzdGF0aXN0aWNzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFrRDtBQUNsRCwyRUFBeUU7QUFDekUsZ0NBQStCO0FBUS9CO0lBR0UsNkJBQ1UsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFFbEIsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDOUIsQ0FBQztJQUVELHNCQUFJLGtEQUFpQjthQUFyQjtZQUNFLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDO1FBQ2pDLENBQUM7OztPQUFBO0lBRUQsc0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLGtDQUFlLENBQUM7WUFDNUM7Z0JBQ0UsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE9BQU8sRUFBRSxFQUFFO2FBQ1o7WUFDRDtnQkFDRSxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsT0FBTyxFQUFFLEVBQUU7YUFDWjtZQUNEO2dCQUNFLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixPQUFPLEVBQUUsRUFBRTthQUNaO1lBQ0Q7Z0JBQ0UsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE9BQU8sRUFBRSxFQUFFO2FBQ1o7WUFDRDtnQkFDRSxVQUFVLEVBQUUsUUFBUTtnQkFDcEIsT0FBTyxFQUFFLEVBQUU7YUFDWjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFwQ1UsbUJBQW1CO1FBTi9CLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsZUFBZTtZQUN6QixXQUFXLEVBQUUsNkJBQTZCO1lBQzFDLFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO1lBQ3pDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQUtnQixXQUFJO09BSlQsbUJBQW1CLENBcUMvQjtJQUFELDBCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7QUFyQ1ksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGVBcnJheSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL2RhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25zLXN0YXRpc3RpY3MnLFxuICB0ZW1wbGF0ZVVybDogJy4vc3RhdGlzdGljcy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3N0YXRpc3RpY3MuY29tcG9uZW50LmNzcyddLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxufSlcbmV4cG9ydCBjbGFzcyBTdGF0aXN0aWNzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHJpdmF0ZSBfY2F0ZWdvcmljYWxTb3VyY2U6IE9ic2VydmFibGVBcnJheTxhbnk+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcGFnZTogUGFnZVxuICAgICkge1xuICAgIHBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIGdldCBjYXRlZ29yaWNhbFNvdXJjZSgpOiBPYnNlcnZhYmxlQXJyYXk8YW55PiB7XG4gICAgcmV0dXJuIHRoaXMuX2NhdGVnb3JpY2FsU291cmNlO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5fY2F0ZWdvcmljYWxTb3VyY2UgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KFtcbiAgICAgIHtcbiAgICAgICAgXCJjYXRlZ29yeVwiOiBcIkphbiAyNlwiLFxuICAgICAgICBcInZhbHVlXCI6IDEwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImNhdGVnb3J5XCI6IFwiSmFuIDI3XCIsXG4gICAgICAgIFwidmFsdWVcIjogMTFcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIFwiY2F0ZWdvcnlcIjogXCJKYW4gMjhcIixcbiAgICAgICAgXCJ2YWx1ZVwiOiAxNVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgXCJjYXRlZ29yeVwiOiBcIkphbiAyOVwiLFxuICAgICAgICBcInZhbHVlXCI6IDIxXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBcImNhdGVnb3J5XCI6IFwiSmFuIDMwXCIsXG4gICAgICAgIFwidmFsdWVcIjogMjVcbiAgICAgIH1cbiAgICBdKTtcbiAgfVxufSJdfQ==