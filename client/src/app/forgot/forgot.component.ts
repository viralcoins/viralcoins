import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  @ViewChild('username') inputEl:ElementRef;

  infoMessage = "";
  errorMessage = "";
  loading = false;

  constructor(
    private dataService: DataService
  ) { }

  ngAfterViewInit() {
    setTimeout(() => this.inputEl.nativeElement.focus());
  }

  ngOnInit() {
  }

  forgotPassword(email) {
    this.loading = true;
    this.infoMessage = "";
    this.errorMessage = "";
    this.dataService.forgot(email.value).subscribe(() => {
      this.infoMessage = "An email as been sent to " + email.value;
      this.loading = false;
    }, err => {
      this.errorMessage = "The user " + email.value + " cannot be found";
      this.loading = false;
    });
  }

  clearMessage() {
    this.infoMessage = "";
    this.errorMessage = "";
  }
}
