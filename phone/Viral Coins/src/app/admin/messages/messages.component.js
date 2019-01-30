"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var cache_service_1 = require("../../services/cache.service");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var MessagesComponent = /** @class */ (function () {
    function MessagesComponent(userService, cacheService) {
        this.userService = userService;
        this.cacheService = cacheService;
        this.templateSelectorFunction = function (item, index, items) {
            return item.content != null ? 'message' : 'empty';
        };
    }
    MessagesComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.load();
    };
    MessagesComponent.prototype.load = function () {
        var _this_1 = this;
        this.userService.messages()
            .subscribe(function (messages) {
            _this_1._dataItems.splice(0);
            if (messages.length > 0) {
                for (var _i = 0, messages_1 = messages; _i < messages_1.length; _i++) {
                    var message = messages_1[_i];
                    _this_1._dataItems.push(message);
                }
            }
            else {
                _this_1._dataItems.push({ content: null });
            }
            _this_1.listView.nativeElement.notifyPullToRefreshFinished();
        });
    };
    Object.defineProperty(MessagesComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MessagesComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    MessagesComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.userService.reloadMessages = true;
            _this.load();
        }, 1000);
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
            this._dataItems.push("empty");
            this.cacheService.store("messages", []);
        }
        else {
            this.cacheService.store("messages", this._dataItems.slice(0, this._dataItems.length));
        }
        this.userService.deleteMessage(message.id).subscribe();
    };
    __decorate([
        core_1.ViewChild('listView'),
        __metadata("design:type", Object)
    ], MessagesComponent.prototype, "listView", void 0);
    MessagesComponent = __decorate([
        core_1.Component({
            selector: 'ns-messages',
            templateUrl: './messages.component.html',
            styleUrls: ['./messages.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [user_service_1.UserService,
            cache_service_1.CacheService])
    ], MessagesComponent);
    return MessagesComponent;
}());
exports.MessagesComponent = MessagesComponent;
