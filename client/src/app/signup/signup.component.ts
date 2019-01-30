import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, FormControl, ValidationErrors, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadService } from '../service/load.service';
import { AuthService } from '../service/auth.service';

export function passwordStrengthValidator(password: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const isValid = password.test(control.value);
    return isValid ? null : { 'validPassword': false };
  };
}

export const passwordMatcherValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  const password = control.get('password');
  const confPassword = control.get('confPassword');
  return password.value == confPassword.value ? null : { 'confMatch': false };
};

export const usernameIsAvailableValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
  return control.get('isAvailable').value ? null : { 'isAvailable': false };
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  @ViewChild('username') inputEl:ElementRef;

  ngAfterViewInit() {
    const error = this.route.snapshot.queryParams['error'];
    if (!error) {
      setTimeout(() => this.inputEl.nativeElement.focus());
    }
  }

  alert: string;
  returnUrl: string;
  loadAPI: Promise<any>;
  loading = false;
  checkTimer;
  usernameAvailability = "";

  signupForm = this.fb.group({
    username: [''],
    email: [''],
    password: ['', passwordStrengthValidator(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))],
    confPassword: [''],
    isAvailable: [false]
  }, { validator: [passwordMatcherValidator, usernameIsAvailableValidator] } );

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private loadService: LoadService
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/wallet';
    this.loadAPI = new Promise((resolve) => {
      this.loadService.loadScript('https://www.google.com/recaptcha/api.js?render=6Lcw2YMUAAAAAOrlPBCnFXo-awDwcOWwJEGHBXef');
      resolve(true);
    });
    const error = this.route.snapshot.queryParams['error'];
    if (error == "duplicate") {
      this.alert = "An account associated with the Google username already exists.";
    }
  }

  onUsernameKeyUp(event) {
    if (this.checkTimer) {
      clearTimeout(this.checkTimer);
    }
    const _this = this;
    const username = event.target.value;
    this.checkTimer = setTimeout(function() {
      console.log(username);
      _this.authService.usernameIsAvailable(username).subscribe(isAvailable => {
        _this.signupForm.patchValue({isAvailable: isAvailable});
        _this.usernameAvailability = isAvailable ? username + " is available" : username + " is not available";
      });
    }, 1000);
  }

  get username() {
    return this.signupForm.get("username") as FormControl
  }

  get email() {
    return this.signupForm.get("email") as FormControl
  }

  get password() {
    return this.signupForm.get("password") as FormControl
  }

  onSubmit() {
    this.loading = true;
    const _this = this;
    this.loadService.handleRecaptcha('signup').subscribe(token => {
      _this.authService.signup(this.username.value, this.email.value, this.password.value, token).subscribe(user => {
        _this.router.navigate(['/login']);
      }, err => {
        this.loading = false;
        switch (err.status) {
          case 409:
            _this.alert = this.username.value + " has already been taken.";
            break;
        }
      });
    });
  }

  clearMessage() {
    this.alert = "";
  }

  doGoogleLogin() {
    window.location.href = '/api/auth/google';
  }
}
