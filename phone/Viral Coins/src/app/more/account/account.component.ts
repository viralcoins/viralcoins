import { Component, OnInit } from "@angular/core";
import { Page } from "ui/page";
import { UserService } from "../../services/user.service";
import * as appSettings from "tns-core-modules/application-settings";
import { RouterExtensions } from "nativescript-angular/router";
import { User } from '../../models/user.model';
import { Config } from "../../config";

@Component({
  selector: "account",
  moduleId: module.id,
  templateUrl: "./account.component.html",
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  isLoading = true;
  user;

  constructor(
    private page: Page,
    private userService: UserService,
    private routerExtensions: RouterExtensions
  ) {
    this.page.actionBarHidden = true;
  }  

  ngOnInit(): void {
    this.page.actionBarHidden = true;
    if (!this.userService.currentUserValue) {
      this.userService.getUser().subscribe(user => {        
        this.user = user;
        this.isLoading = false;
      });
    } else {
      this.user = this.userService.currentUserValue;
      this.isLoading = false;
    }
  }

  onSaveTap() {
    this.userService.update({
      first: this.user.profile.first,
      last: this.user.profile.last,
      email: this.user.email
    }).subscribe(
      () => {
        alert("Your account was updated.");
      },
      (err) => alert("We were unable to update your account" + err)
    );
  }

  onLogOutTap() {
    const _this = this;
    this.userService.logout();
    setTimeout(function() {
      _this.routerExtensions.navigate(['/login'], {
        clearHistory: true
      });
    });
  }
}
