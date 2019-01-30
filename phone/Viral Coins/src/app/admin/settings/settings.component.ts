import { Component, OnInit } from '@angular/core';
import { Switch } from "tns-core-modules/ui/switch";
import { Config } from '../../config';
import * as appSettings from "tns-core-modules/application-settings";

@Component({
  selector: 'ns-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  moduleId: module.id,
})
export class SettingsComponent implements OnInit {

  public url: string = 'https://viralcoins.co';

  constructor() { }

  ngOnInit() {
    this.url = Config.apiUrl;
  }

  public onUpdateTap() {
    Config.apiUrl = this.url;
    appSettings.setString("apiUrl", this.url);
    console.log(Config);
  }
}
