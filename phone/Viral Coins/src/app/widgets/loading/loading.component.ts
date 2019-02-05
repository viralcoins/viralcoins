import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'vc-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  moduleId: module.id,
})
export class LoadingComponent implements OnInit {

  @Input('isLoading') isLoading = false;

  constructor() { }

  ngOnInit() {
  }

}
