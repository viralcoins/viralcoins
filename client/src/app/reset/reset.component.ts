import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, FormGroup, ValidationErrors, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../service/data.service';

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

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  @ViewChild('password') inputEl:ElementRef;

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  resetForm = this.fb.group({
    password: ['', passwordStrengthValidator(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"))],
    confPassword: ['']
  }, { validator: passwordMatcherValidator } );

  alert: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {

  }

  get password() {
    return this.resetForm.get("password") as FormControl
  }

  onSubmit() {
    this.alert = "";
    this.loading = true;
    const code = this.route.snapshot.queryParams['resetToken'];
    this.dataService.resetPassword(code, this.password.value).subscribe(() => {
      this.router.navigate(['/login']);
    }, err => {
      this.loading = false;
      this.alert = "An error has occurred. Please try again.";
    });
  }

  clearMessage() {
    this.alert = "";
  }

  doGoogleLogin() {
    window.location.href = '/api/auth/google';
  }
}
