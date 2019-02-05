import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { filter } from "rxjs/operators";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
	selector: "bottom-navigation-admin",
	moduleId: module.id,
	templateUrl: "./bottom-navigation.component.html",
	styleUrls: ['./bottom-navigation.component.css']
})
export class BottomNavigationComponent implements OnInit {
	private _activatedUrl: string;

	constructor(
		private router: Router,
		private routerExtensions: RouterExtensions) {
	}

  selectTab(navItemRoute: string) {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      },
      clearHistory: true
    });
  }  

	ngOnInit(): void {
		this._activatedUrl = "/admin/home";
    const _this = this;
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
        setTimeout(function() {
          _this._activatedUrl = event.urlAfterRedirects
        }, 150);
      });
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}
}

