import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User;
  currentUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
