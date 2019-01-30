"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_model_1 = require("../../models/user.model");
var user_service_1 = require("../../services/user.service");
var router_1 = require("@angular/router");
var page_1 = require("tns-core-modules/ui/page");
var dialogs = require("tns-core-modules/ui/dialogs");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, userService, page) {
        this.router = router;
        this.userService = userService;
        this.page = page;
        this.isLoggingIn = true;
        this.isBusy = false;
        this.user = new user_model_1.User();
        this.user.username = "bmorrise";
        this.user.password = "12345t";
        this.page.actionBarHidden = true;
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent.prototype.toggleDisplay = function () {
        this.isLoggingIn = !this.isLoggingIn;
    };
    LoginComponent.prototype.submit = function () {
        if (this.isLoggingIn) {
            this.login();
        }
        else {
            this.signUp();
        }
    };
    LoginComponent.prototype.login = function () {
        var _this_1 = this;
        this.isBusy = true;
        this.userService.login(this.user)
            .subscribe(function () {
            _this_1.isBusy = false;
            _this_1.router.navigate(["/main/home"]);
        }, function (e) {
            _this_1.isBusy = false;
            dialogs.alert({
                title: "Error!",
                message: "Invalid username or password.",
                okButtonText: "OK"
            });
        });
    };
    LoginComponent.prototype.signUp = function () {
        var _this_1 = this;
        if (this.user.password != this.user.confPassword) {
            dialogs.alert({
                title: "Error!",
                message: "Invalid username or password.",
                okButtonText: "OK"
            });
            return;
        }
        this.userService.register(this.user)
            .subscribe(function () {
            dialogs.alert({
                title: "Error!",
                message: "Invalid username or password.",
                okButtonText: "OK"
            });
            _this_1.toggleDisplay();
        }, function () {
            dialogs.alert({
                title: "An error has occurred",
                message: "We were unable to create your account. Please try again later.",
                okButtonText: "OK"
            });
        });
    };
    LoginComponent.prototype.onForgotPasswordTap = function () {
        var _this = this;
        dialogs.prompt({
            message: "Enter your account email address",
            okButtonText: "OK",
            cancelButtonText: "Cancel"
        }).then(function (response) {
            _this.userService.forgotPassword(response.text).subscribe(function () {
                dialogs.alert({
                    title: "Reset Email Sent!",
                    message: "An email with password reset instructions has been sent to " + response.text,
                    okButtonText: "OK"
                });
            });
        });
    };
    LoginComponent.prototype.signInWithGoogle = function () {
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: "vc-login",
            providers: [user_service_1.UserService],
            templateUrl: "./login.component.html",
            styleUrls: ["./login.component.css"],
            moduleId: module.id
        }),
        __metadata("design:paramtypes", [router_1.Router,
            user_service_1.UserService,
            page_1.Page])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
