import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-message-detail',
  templateUrl: './message-detail.component.html',
  styleUrls: ['./message-detail.component.css'],
  moduleId: module.id,
})
export class MessageDetailComponent implements OnInit {

  message;

  constructor(
    private params: ModalDialogParams
  ) {
    this.message = params.context;
  }

  ngOnInit() {
  }

  public onClose(): void {
    this.params.closeCallback();
  }  

}
