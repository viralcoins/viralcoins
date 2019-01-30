import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    localStorage.setItem('token', token);
    const returnUrl = localStorage.getItem('returnUrl') || 'wallet';
    this.authService.getUser()
      .pipe(first())
      .subscribe(
        data => {
            this.router.navigate([returnUrl]);
        },
        error => {
            console.log(error);
        });
  }
}
