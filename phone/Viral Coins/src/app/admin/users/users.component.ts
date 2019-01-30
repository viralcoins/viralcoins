import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";

@Component({
  selector: 'ns-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  moduleId: module.id,
})
export class UsersComponent implements OnInit {

  private _dataItems: ObservableArray<any>;
  private _templateSelector: (item: any, index: number, items: any) => string;  
  @ViewChild('listView') listView;

  constructor(
    private userService: UserService
    ) { }

  ngOnInit() {
    this._dataItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;    
    this.load();    
  }

  load() {
    this.userService.getAllUsers()
      .subscribe(users => {
        this._dataItems.splice(0);
        if (users.length > 0) {
          for (let user of users) {
            this._dataItems.push(user);
          }
        } else {
          this._dataItems.push({username:null});
        }
        this.listView.nativeElement.notifyPullToRefreshFinished();
      });
  }    

  get dataItems(): ObservableArray<any> {
    return this._dataItems;
  }

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.username != null ? 'user' : 'empty';
  }    

  public onPullToRefreshInitiated(args: ListViewEventData) {
    const _this = this;
    setTimeout(function () {
      _this.userService.reloadAllUsers = true;
      _this.load();
    }, 1000);
  }
}
