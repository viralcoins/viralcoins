"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var cache_service_1 = require("../../services/cache.service");
var dialogs_1 = require("nativescript-angular/directives/dialogs");
var message_detail_component_1 = require("../message-detail/message-detail.component");
var list_view_component_1 = require("../../components/list-view.component");
var loading_service_1 = require("../../services/loading.service");
var MessagesComponent = /** @class */ (function (_super) {
    __extends(MessagesComponent, _super);
    function MessagesComponent(userService, cacheService, modal, vcRef, loadingService) {
        var _this = _super.call(this, loadingService) || this;
        _this.userService = userService;
        _this.cacheService = cacheService;
        _this.modal = modal;
        _this.vcRef = vcRef;
        _this.loadingService = loadingService;
        _this.templateSelectorFunction = function (item, index, items) {
            return item.type == null ? 'message' : 'empty';
        };
        return _this;
    }
    MessagesComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.load();
    };
    MessagesComponent.prototype.getData = function () {
        return this.userService.messages();
    };
    MessagesComponent.prototype.doReload = function () {
        this.userService.reloadMessages = true;
    };
    MessagesComponent.prototype.onCellSwiping = function (args) { };
    MessagesComponent.prototype.onSwipeCellStarted = function (args) {
        var swipeLimits = args.data.swipeLimits;
        var swipeView = args['object'];
        var rightItem = swipeView.getViewById('delete-view');
        swipeLimits.left = 0;
        swipeLimits.right = rightItem.getMeasuredWidth();
        swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
    };
    MessagesComponent.prototype.onSwipeCellFinished = function (args) {
    };
    MessagesComponent.prototype.onRightSwipeClick = function (args) {
        var message = args.object.bindingContext;
        this.dataItems.splice(this.dataItems.indexOf(message), 1);
        if (this._dataItems.length == 0) {
            this._dataItems.push({ type: "empty" });
            this.cacheService.store("messages", []);
        }
        else {
            this.cacheService.store("messages", this._dataItems.slice(0, this._dataItems.length));
        }
        this.userService.deleteMessage(message.id).subscribe();
    };
    MessagesComponent.prototype.onItemTap = function (message) {
        console.log(message);
        var options = {
            viewContainerRef: this.vcRef,
            context: message,
            fullscreen: true
        };
        this.modal.showModal(message_detail_component_1.MessageDetailComponent, options)
            .then(function () {
            console.log("");
        });
    };
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'ns-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            cache_service_1.CacheService,
            dialogs_1.ModalDialogService,
            core_1.ViewContainerRef,
            loading_service_1.LoadingService])
    ], MessagesComponent);
    return MessagesComponent;
}(list_view_component_1.ListViewComponent));
exports.MessagesComponent = MessagesComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVzc2FnZXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBQ3BFLDREQUEwRDtBQUMxRCw4REFBNEQ7QUFHNUQsbUVBQWlHO0FBQ2pHLHVGQUFvRjtBQUNwRiw0RUFBeUU7QUFFekUsa0VBQWdFO0FBUWhFO0lBQXVDLHFDQUFpQjtJQUl0RCwyQkFDVSxXQUF3QixFQUN4QixZQUEwQixFQUMxQixLQUF5QixFQUN6QixLQUF1QixFQUN4QixjQUE4QjtRQUx2QyxZQU9FLGtCQUFNLGNBQWMsQ0FBQyxTQUN0QjtRQVBTLGlCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGtCQUFZLEdBQVosWUFBWSxDQUFjO1FBQzFCLFdBQUssR0FBTCxLQUFLLENBQW9CO1FBQ3pCLFdBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3hCLG9CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQWNoQyw4QkFBd0IsR0FBRyxVQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsS0FBVTtZQUNyRSxPQUFPLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNqRCxDQUFDLENBQUE7O0lBYkQsQ0FBQztJQUVELG9DQUFRLEdBQVI7UUFDRSxpQkFBTSxRQUFRLFdBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsbUNBQU8sR0FBUDtRQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUNwQyxDQUFDO0lBTUQsb0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztJQUN6QyxDQUFDO0lBRU0seUNBQWEsR0FBcEIsVUFBcUIsSUFBdUIsSUFBRyxDQUFDO0lBRXpDLDhDQUFrQixHQUF6QixVQUEwQixJQUF1QjtRQUMvQyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakMsSUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBTyxhQUFhLENBQUMsQ0FBQztRQUM3RCxXQUFXLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNyQixXQUFXLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pELFdBQVcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFTSwrQ0FBbUIsR0FBMUIsVUFBMkIsSUFBdUI7SUFDbEQsQ0FBQztJQUVNLDZDQUFpQixHQUF4QixVQUF5QixJQUFJO1FBQzNCLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDO1FBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzFELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUN2RjtRQUNELElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUN6RCxDQUFDO0lBRU0scUNBQVMsR0FBaEIsVUFBaUIsT0FBTztRQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JCLElBQU0sT0FBTyxHQUF1QjtZQUNsQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsT0FBTztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsaURBQXNCLEVBQUUsT0FBTyxDQUFDO2FBQ2xELElBQUksQ0FBQztZQUNKLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBckVVLGlCQUFpQjtRQU43QixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGFBQWE7WUFDdkIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUN2QyxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7U0FDcEIsQ0FBQzt5Q0FNdUIsMEJBQVc7WUFDViw0QkFBWTtZQUNuQiw0QkFBa0I7WUFDbEIsdUJBQWdCO1lBQ1IsZ0NBQWM7T0FUNUIsaUJBQWlCLENBc0U3QjtJQUFELHdCQUFDO0NBQUEsQUF0RUQsQ0FBdUMsdUNBQWlCLEdBc0V2RDtBQXRFWSw4Q0FBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXNlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy91c2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgQ2FjaGVTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FjaGUuc2VydmljZSc7XG5pbXBvcnQgeyBMaXN0Vmlld0V2ZW50RGF0YSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktbGlzdHZpZXdcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tICd0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlldyc7XG5pbXBvcnQgeyBNb2RhbERpYWxvZ1NlcnZpY2UsIE1vZGFsRGlhbG9nT3B0aW9ucyB9IGZyb20gJ25hdGl2ZXNjcmlwdC1hbmd1bGFyL2RpcmVjdGl2ZXMvZGlhbG9ncyc7XG5pbXBvcnQgeyBNZXNzYWdlRGV0YWlsQ29tcG9uZW50IH0gZnJvbSAnLi4vbWVzc2FnZS1kZXRhaWwvbWVzc2FnZS1kZXRhaWwuY29tcG9uZW50JztcbmltcG9ydCB7IExpc3RWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9saXN0LXZpZXcuY29tcG9uZW50JztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IExvYWRpbmdTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvbG9hZGluZy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbnMtbWVzc2FnZXMnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZXMuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZXNzYWdlcy5jb21wb25lbnQuY3NzJ10sXG4gIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzQ29tcG9uZW50IGV4dGVuZHMgTGlzdFZpZXdDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHByaXZhdGUgcmlnaHRUaHJlc2hvbGRQYXNzZWQ6IGJvb2xlYW47ICBcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHVzZXJTZXJ2aWNlOiBVc2VyU2VydmljZSxcbiAgICBwcml2YXRlIGNhY2hlU2VydmljZTogQ2FjaGVTZXJ2aWNlLFxuICAgIHByaXZhdGUgbW9kYWw6IE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHB1YmxpYyBsb2FkaW5nU2VydmljZTogTG9hZGluZ1NlcnZpY2VcbiAgICApIHtcbiAgICBzdXBlcihsb2FkaW5nU2VydmljZSk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICAgIHRoaXMubG9hZCgpOyAgICBcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMudXNlclNlcnZpY2UubWVzc2FnZXMoKVxuICB9XG5cbiAgcHVibGljIHRlbXBsYXRlU2VsZWN0b3JGdW5jdGlvbiA9IChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIsIGl0ZW1zOiBhbnkpOiBzdHJpbmcgPT4ge1xuICAgIHJldHVybiBpdGVtLnR5cGUgPT0gbnVsbCA/ICdtZXNzYWdlJyA6ICdlbXB0eSc7XG4gIH0gICAgXG5cbiAgZG9SZWxvYWQoKSB7XG4gICAgdGhpcy51c2VyU2VydmljZS5yZWxvYWRNZXNzYWdlcyA9IHRydWU7ICAgIFxuICB9XG5cbiAgcHVibGljIG9uQ2VsbFN3aXBpbmcoYXJnczogTGlzdFZpZXdFdmVudERhdGEpIHt9XG5cbiAgcHVibGljIG9uU3dpcGVDZWxsU3RhcnRlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICAgIGNvbnN0IHN3aXBlTGltaXRzID0gYXJncy5kYXRhLnN3aXBlTGltaXRzO1xuICAgIGNvbnN0IHN3aXBlVmlldyA9IGFyZ3NbJ29iamVjdCddO1xuICAgIGNvbnN0IHJpZ2h0SXRlbSA9IHN3aXBlVmlldy5nZXRWaWV3QnlJZDxWaWV3PignZGVsZXRlLXZpZXcnKTtcbiAgICBzd2lwZUxpbWl0cy5sZWZ0ID0gMDtcbiAgICBzd2lwZUxpbWl0cy5yaWdodCA9IHJpZ2h0SXRlbS5nZXRNZWFzdXJlZFdpZHRoKCk7XG4gICAgc3dpcGVMaW1pdHMudGhyZXNob2xkID0gcmlnaHRJdGVtLmdldE1lYXN1cmVkV2lkdGgoKSAvIDI7XG4gIH1cblxuICBwdWJsaWMgb25Td2lwZUNlbGxGaW5pc2hlZChhcmdzOiBMaXN0Vmlld0V2ZW50RGF0YSkge1xuICB9XG5cbiAgcHVibGljIG9uUmlnaHRTd2lwZUNsaWNrKGFyZ3MpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gYXJncy5vYmplY3QuYmluZGluZ0NvbnRleHQ7XG4gICAgdGhpcy5kYXRhSXRlbXMuc3BsaWNlKHRoaXMuZGF0YUl0ZW1zLmluZGV4T2YobWVzc2FnZSksIDEpO1xuICAgIGlmICh0aGlzLl9kYXRhSXRlbXMubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMuX2RhdGFJdGVtcy5wdXNoKHt0eXBlOiBcImVtcHR5XCJ9KTtcbiAgICAgIHRoaXMuY2FjaGVTZXJ2aWNlLnN0b3JlKFwibWVzc2FnZXNcIiwgW10pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNhY2hlU2VydmljZS5zdG9yZShcIm1lc3NhZ2VzXCIsIHRoaXMuX2RhdGFJdGVtcy5zbGljZSgwLCB0aGlzLl9kYXRhSXRlbXMubGVuZ3RoKSk7XG4gICAgfVxuICAgIHRoaXMudXNlclNlcnZpY2UuZGVsZXRlTWVzc2FnZShtZXNzYWdlLmlkKS5zdWJzY3JpYmUoKTtcbiAgfSAgXG5cbiAgcHVibGljIG9uSXRlbVRhcChtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgY29uc3Qgb3B0aW9uczogTW9kYWxEaWFsb2dPcHRpb25zID0ge1xuICAgICAgdmlld0NvbnRhaW5lclJlZjogdGhpcy52Y1JlZixcbiAgICAgIGNvbnRleHQ6IG1lc3NhZ2UsXG4gICAgICBmdWxsc2NyZWVuOiB0cnVlXG4gICAgfTtcblxuICAgIHRoaXMubW9kYWwuc2hvd01vZGFsKE1lc3NhZ2VEZXRhaWxDb21wb25lbnQsIG9wdGlvbnMpXG4gICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiXCIpO1xuICAgICAgfSk7ICAgIFxuICB9XG59XG4iXX0=