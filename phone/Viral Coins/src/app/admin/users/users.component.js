"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_service_1 = require("../../services/user.service");
var observable_array_1 = require("tns-core-modules/data/observable-array");
var UsersComponent = /** @class */ (function () {
    function UsersComponent(userService) {
        this.userService = userService;
        this.templateSelectorFunction = function (item, index, items) {
            return item.username != null ? 'user' : 'empty';
        };
    }
    UsersComponent.prototype.ngOnInit = function () {
        this._dataItems = new observable_array_1.ObservableArray();
        this._templateSelector = this.templateSelectorFunction;
        this.load();
    };
    UsersComponent.prototype.load = function () {
        var _this_1 = this;
        this.userService.getAllUsers()
            .subscribe(function (users) {
            _this_1._dataItems.splice(0);
            if (users.length > 0) {
                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                    var user = users_1[_i];
                    _this_1._dataItems.push(user);
                }
            }
            else {
                _this_1._dataItems.push({ username: null });
            }
            _this_1.listView.nativeElement.notifyPullToRefreshFinished();
        });
    };
    Object.defineProperty(UsersComponent.prototype, "dataItems", {
        get: function () {
            return this._dataItems;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UsersComponent.prototype, "templateSelector", {
        get: function () {
            return this._templateSelector;
        },
        set: function (value) {
            this._templateSelector = value;
        },
        enumerable: true,
        configurable: true
    });
    UsersComponent.prototype.onPullToRefreshInitiated = function (args) {
        var _this = this;
        setTimeout(function () {
            _this.userService.reloadAllUsers = true;
            _this.load();
        }, 1000);
    };
    __decorate([
        core_1.ViewChild('listView'),
        __metadata("design:type", Object)
    ], UsersComponent.prototype, "listView", void 0);
    UsersComponent = __decorate([
        core_1.Component({
            selector: 'ns-users',
            templateUrl: './users.component.html',
            styleUrls: ['./users.component.css'],
            moduleId: module.id,
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], UsersComponent);
    return UsersComponent;
}());
exports.UsersComponent = UsersComponent;
