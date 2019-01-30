import { Component, OnInit, Renderer, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') inputEl:ElementRef;

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus() );
  }

  username;
  password;
  returnUrl: string;
  errorMessage: string = "";
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router,
    private renderer: Renderer
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/wallet';
    const element = this.renderer.selectRootElement('#username');
    setTimeout(() => element.focus(), 1000);
  }

  doLogin(username, password) {
    this.clearMessage();
    this.loading = true;
    this.authService.login(username.value, password.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.loading = false;
        this.errorMessage = "Invalid username or password";
      });
  }

  clearMessage() {
    this.errorMessage = "";
  }

  doGoogleLogin() {
    window.location.href = '/api/auth/google';
  }
}
