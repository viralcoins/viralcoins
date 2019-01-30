import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css'],
  moduleId: module.id,
})
export class HelpComponent implements OnInit {

  header: string;
  content: string;
  src: string;

  constructor(
    private params: ModalDialogParams
  ) {
    this.header = params.context.header;
    this.content = params.context.content;
    this.src = params.context.src;
  }

  ngOnInit() {
  }

  public onClose(): void {
    this.params.closeCallback();
  }

}
