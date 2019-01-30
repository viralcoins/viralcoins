import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { AuthService } from '../service/auth.service';
import { User } from '../shared/user';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  user: any;
  showSaved = false;
  userForm = this.formBuilder.group({
    first: [''],
    last: [''],
    email: ['']
  });

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.dataService.getUser().subscribe(user => {
      this.user = user;
      this.userForm.patchValue({
        first: user.profile.first,
        last: user.profile.last,
        email: user.email
      });
    });
  }

  onSubmit() {
    const _this = this;
    this.authService.updateUser(this.userForm.value).subscribe(user => {
      _this.showSaved = true;
      setTimeout(function() {
        _this.showSaved = false;
      }, 3000);
      console.log(user);
    });
    console.log(this.userForm.value);
  }

}
