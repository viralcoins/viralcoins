import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Config } from '../../config';
import * as appSettings from "tns-core-modules/application-settings";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { SendNotificationComponent } from '../send-notification/send-notification.component';

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  moduleId: module.id,
})
export class SettingsComponent implements OnInit {

  public url: string = 'https://viralcoins.co';

  constructor(
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService
    ) { }

  ngOnInit() {
    this.url = Config.apiUrl;
  }

  public onUpdateTap() {
    Config.apiUrl = this.url;
    appSettings.setString("apiUrl", this.url);
    console.log(Config);
  }

  public onSendNotificationTap() {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {},
      fullscreen: true
    };

    this.modal.showModal(SendNotificationComponent, options)
      .then(() => {
        console.log("");
      });    
  }
}
