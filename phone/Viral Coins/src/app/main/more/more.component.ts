import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { UserService } from '../../services/user.service';
import { Page } from "ui/page";

@Component({
  selector: 'ns-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css'],
  moduleId: module.id,
})
export class MoreComponent implements OnInit {

  user;

  constructor(
  	private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page
  ) {
    page.actionBarHidden = true;
  }

  ngOnInit() {
    if (!this.userService.currentUserValue) {
      this.userService.getUser().subscribe(user => {
        this.user = user;
      });
    } else {
      this.user = this.userService.currentUserValue;
    }    
  }

  onNavigate(url: string) {
    this.routerExtensions.navigate([url], {
      transition: {
        name: "slideLeft"
      }
    });    
  }
}
