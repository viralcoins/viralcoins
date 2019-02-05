import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: 'ns-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css'],
  moduleId: module.id,
})
export class SendNotificationComponent implements OnInit {

  type: string = "notification";
  title: string;
  text: string;
  actionText: string;
  data: string;

  isSending = false;

  constructor(
    private userService: UserService,
    private params: ModalDialogParams
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isSending = true;
    this.userService.addFeedItem({
      type: this.type,
      title: this.title,
      text: this.text,
      actionText: this.actionText
    }).subscribe(() => {
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
