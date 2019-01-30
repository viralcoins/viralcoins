import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { UserService } from '../../services/user.service';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.css'],
  moduleId: module.id,
})
export class SendMessageComponent implements OnInit {

  message = "";
  isSending: boolean = false;

  constructor(
	  private params: ModalDialogParams,
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.isSending = true;
    this.userService.sendMessage(this.message).subscribe(message => {
      dialogs.alert({
        title: "Success",
        message: "Your message was sent!",
        okButtonText: "OK"
      }).then(() => {
        this.onClose();
      });
    });
  }

  public onClose(): void {
    this.params.closeCallback();
  }

}
