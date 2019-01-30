import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {

  isLoading = false;

  constructor() { }

  ngOnInit() {
  }

  onStartScan(): void {
    this.isLoading = true;
  }

  onEndScan(): void {
    this.isLoading = false;
  }

}
