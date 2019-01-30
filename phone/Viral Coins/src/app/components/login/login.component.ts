import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user.model";
import { UserService } from "../../services/user.service";
import { Router } from "@angular/router";
import { Page } from "tns-core-modules/ui/page";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: "vc-login",
  providers: [UserService],
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  moduleId: module.id
})
export class LoginComponent implements OnInit {
  user: User;
  isLoggingIn = true;
  isBusy = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private page: Page,
  ) {
    this.user = new User();
    this.user.username = "bmorrise";
    this.user.password = "12345t";
    this.page.actionBarHidden = true;
  }

  ngOnInit() {

  }

  toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  submit() {
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  login() {
    this.isBusy = true;
    this.userService.login(this.user)
      .subscribe(
        () => {
          this.isBusy = false;
          this.router.navigate(["/main/home"])
        },
        e => {
          this.isBusy = false;
          dialogs.alert({
            title: "Error!",
            message: "Invalid username or password.",
            okButtonText: "OK"
          })   
        }                 
      );
  }

  signUp() {
    if (this.user.password != this.user.confPassword) {
      dialogs.alert({
        title: "Error!",
        message: "Invalid username or password.",
        okButtonText: "OK"
      }) 
      return;
    }
    this.userService.register(this.user)
      .subscribe(
        () => {
          dialogs.alert({
            title: "Error!",
            message: "Invalid username or password.",
            okButtonText: "OK"
          }) 
          this.toggleDisplay();
        },
        () => {
          dialogs.alert({
            title: "An error has occurred",
            message: "We were unable to create your account. Please try again later.",
            okButtonText: "OK"
          }) 
        }
      );
  }

  onForgotPasswordTap(): void {
    const _this = this;
    dialogs.prompt({
      message: "Enter your account email address",
      okButtonText: "OK",
      cancelButtonText: "Cancel"
    }).then(function (response) {
      _this.userService.forgotPassword(response.text).subscribe(() => {
        dialogs.alert({
          title: "Reset Email Sent!",
          message: "An email with password reset instructions has been sent to " + response.text,
          okButtonText: "OK"
        })
      });
    });    
  }

  signInWithGoogle() {

  }
}
