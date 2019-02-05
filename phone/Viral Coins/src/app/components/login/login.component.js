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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibG9naW4uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELHNEQUErQztBQUMvQyw0REFBMEQ7QUFDMUQsMENBQXlDO0FBQ3pDLGlEQUFnRDtBQUNoRCxxREFBdUQ7QUFTdkQ7SUFLRSx3QkFDVSxNQUFjLEVBQ2QsV0FBd0IsRUFDeEIsSUFBVTtRQUZWLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBTnBCLGdCQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ25CLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFPYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO0lBQ25DLENBQUM7SUFFRCxpQ0FBUSxHQUFSO0lBRUEsQ0FBQztJQUVELHNDQUFhLEdBQWI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN2QyxDQUFDO0lBRUQsK0JBQU0sR0FBTjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDZDthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2Y7SUFDSCxDQUFDO0lBRUQsOEJBQUssR0FBTDtRQUFBLG1CQWlCQztRQWhCQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQzlCLFNBQVMsQ0FDUjtZQUNFLE9BQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLE9BQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtRQUN0QyxDQUFDLEVBQ0QsVUFBQSxDQUFDO1lBQ0MsT0FBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUE7UUFDSixDQUFDLENBQ0YsQ0FBQztJQUNOLENBQUM7SUFFRCwrQkFBTSxHQUFOO1FBQUEsbUJBMkJDO1FBMUJDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQztnQkFDWixLQUFLLEVBQUUsUUFBUTtnQkFDZixPQUFPLEVBQUUsK0JBQStCO2dCQUN4QyxZQUFZLEVBQUUsSUFBSTthQUNuQixDQUFDLENBQUE7WUFDRixPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2pDLFNBQVMsQ0FDUjtZQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsT0FBTyxFQUFFLCtCQUErQjtnQkFDeEMsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFBO1lBQ0YsT0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ3ZCLENBQUMsRUFDRDtZQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ1osS0FBSyxFQUFFLHVCQUF1QjtnQkFDOUIsT0FBTyxFQUFFLGdFQUFnRTtnQkFDekUsWUFBWSxFQUFFLElBQUk7YUFDbkIsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUNGLENBQUM7SUFDTixDQUFDO0lBRUQsNENBQW1CLEdBQW5CO1FBQ0UsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDYixPQUFPLEVBQUUsa0NBQWtDO1lBQzNDLFlBQVksRUFBRSxJQUFJO1lBQ2xCLGdCQUFnQixFQUFFLFFBQVE7U0FDM0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLFFBQVE7WUFDeEIsS0FBSyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQztvQkFDWixLQUFLLEVBQUUsbUJBQW1CO29CQUMxQixPQUFPLEVBQUUsNkRBQTZELEdBQUcsUUFBUSxDQUFDLElBQUk7b0JBQ3RGLFlBQVksRUFBRSxJQUFJO2lCQUNuQixDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHlDQUFnQixHQUFoQjtJQUVBLENBQUM7SUFuR1UsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLENBQUMsMEJBQVcsQ0FBQztZQUN4QixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDLHVCQUF1QixDQUFDO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtTQUNwQixDQUFDO3lDQU9rQixlQUFNO1lBQ0QsMEJBQVc7WUFDbEIsV0FBSTtPQVJULGNBQWMsQ0FvRzFCO0lBQUQscUJBQUM7Q0FBQSxBQXBHRCxJQW9HQztBQXBHWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFVzZXIgfSBmcm9tIFwiLi4vLi4vbW9kZWxzL3VzZXIubW9kZWxcIjtcbmltcG9ydCB7IFVzZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL3VzZXIuc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL3BhZ2VcIjtcbmltcG9ydCAqIGFzIGRpYWxvZ3MgZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZGlhbG9nc1wiO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6IFwidmMtbG9naW5cIixcbiAgcHJvdmlkZXJzOiBbVXNlclNlcnZpY2VdLFxuICB0ZW1wbGF0ZVVybDogXCIuL2xvZ2luLmNvbXBvbmVudC5odG1sXCIsXG4gIHN0eWxlVXJsczogW1wiLi9sb2dpbi5jb21wb25lbnQuY3NzXCJdLFxuICBtb2R1bGVJZDogbW9kdWxlLmlkXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdXNlcjogVXNlcjtcbiAgaXNMb2dnaW5nSW4gPSB0cnVlO1xuICBpc0J1c3kgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgdXNlclNlcnZpY2U6IFVzZXJTZXJ2aWNlLFxuICAgIHByaXZhdGUgcGFnZTogUGFnZSxcbiAgKSB7XG4gICAgdGhpcy51c2VyID0gbmV3IFVzZXIoKTtcbiAgICB0aGlzLnVzZXIudXNlcm5hbWUgPSBcImJtb3JyaXNlXCI7XG4gICAgdGhpcy51c2VyLnBhc3N3b3JkID0gXCIxMjM0NXRcIjtcbiAgICB0aGlzLnBhZ2UuYWN0aW9uQmFySGlkZGVuID0gdHJ1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuXG4gIH1cblxuICB0b2dnbGVEaXNwbGF5KCkge1xuICAgIHRoaXMuaXNMb2dnaW5nSW4gPSAhdGhpcy5pc0xvZ2dpbmdJbjtcbiAgfVxuXG4gIHN1Ym1pdCgpIHtcbiAgICBpZiAodGhpcy5pc0xvZ2dpbmdJbikge1xuICAgICAgdGhpcy5sb2dpbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNpZ25VcCgpO1xuICAgIH1cbiAgfVxuXG4gIGxvZ2luKCkge1xuICAgIHRoaXMuaXNCdXN5ID0gdHJ1ZTtcbiAgICB0aGlzLnVzZXJTZXJ2aWNlLmxvZ2luKHRoaXMudXNlcilcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICB0aGlzLmlzQnVzeSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYWluL2hvbWVcIl0pXG4gICAgICAgIH0sXG4gICAgICAgIGUgPT4ge1xuICAgICAgICAgIHRoaXMuaXNCdXN5ID0gZmFsc2U7XG4gICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogXCJFcnJvciFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZC5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgfSkgICBcbiAgICAgICAgfSAgICAgICAgICAgICAgICAgXG4gICAgICApO1xuICB9XG5cbiAgc2lnblVwKCkge1xuICAgIGlmICh0aGlzLnVzZXIucGFzc3dvcmQgIT0gdGhpcy51c2VyLmNvbmZQYXNzd29yZCkge1xuICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgIHRpdGxlOiBcIkVycm9yIVwiLFxuICAgICAgICBtZXNzYWdlOiBcIkludmFsaWQgdXNlcm5hbWUgb3IgcGFzc3dvcmQuXCIsXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICB9KSBcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51c2VyU2VydmljZS5yZWdpc3Rlcih0aGlzLnVzZXIpXG4gICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICB0aXRsZTogXCJFcnJvciFcIixcbiAgICAgICAgICAgIG1lc3NhZ2U6IFwiSW52YWxpZCB1c2VybmFtZSBvciBwYXNzd29yZC5cIixcbiAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgICAgICAgfSkgXG4gICAgICAgICAgdGhpcy50b2dnbGVEaXNwbGF5KCk7XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgIHRpdGxlOiBcIkFuIGVycm9yIGhhcyBvY2N1cnJlZFwiLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJXZSB3ZXJlIHVuYWJsZSB0byBjcmVhdGUgeW91ciBhY2NvdW50LiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLlwiLFxuICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgICB9KSBcbiAgICAgICAgfVxuICAgICAgKTtcbiAgfVxuXG4gIG9uRm9yZ290UGFzc3dvcmRUYXAoKTogdm9pZCB7XG4gICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgIGRpYWxvZ3MucHJvbXB0KHtcbiAgICAgIG1lc3NhZ2U6IFwiRW50ZXIgeW91ciBhY2NvdW50IGVtYWlsIGFkZHJlc3NcIixcbiAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiLFxuICAgICAgY2FuY2VsQnV0dG9uVGV4dDogXCJDYW5jZWxcIlxuICAgIH0pLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICBfdGhpcy51c2VyU2VydmljZS5mb3Jnb3RQYXNzd29yZChyZXNwb25zZS50ZXh0KS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICB0aXRsZTogXCJSZXNldCBFbWFpbCBTZW50IVwiLFxuICAgICAgICAgIG1lc3NhZ2U6IFwiQW4gZW1haWwgd2l0aCBwYXNzd29yZCByZXNldCBpbnN0cnVjdGlvbnMgaGFzIGJlZW4gc2VudCB0byBcIiArIHJlc3BvbnNlLnRleHQsXG4gICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9LXCJcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuICAgIH0pOyAgICBcbiAgfVxuXG4gIHNpZ25JbldpdGhHb29nbGUoKSB7XG5cbiAgfVxufVxuIl19