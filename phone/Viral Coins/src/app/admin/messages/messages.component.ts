import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CacheService } from '../../services/cache.service';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from 'tns-core-modules/ui/core/view';

@Component({
  selector: 'ns-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  moduleId: module.id,
})
export class MessagesComponent implements OnInit {

  @ViewChild('listView') listView;

  private _dataItems: ObservableArray<any>;
  private _templateSelector: (item: any, index: number, items: any) => string;  
  private rightThresholdPassed: boolean;  

  constructor(
    private userService: UserService,
    private cacheService: CacheService
    ) { }

  ngOnInit() {
    this._dataItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;    
    this.load();    
  }

  load() {
    this.userService.messages()
      .subscribe(messages => {
        this._dataItems.splice(0);
        if (messages.length > 0) {
          for (let message of messages) {
            this._dataItems.push(message);
          }
        } else {
          this._dataItems.push({content:null});
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
    return item.content != null ? 'message' : 'empty';
  }    

  public onPullToRefreshInitiated(args: ListViewEventData) {
    const _this = this;
    setTimeout(function () {
      _this.userService.reloadMessages = true;
      _this.load();
    }, 1000);
  }

  public onCellSwiping(args: ListViewEventData) {}

  public onSwipeCellStarted(args: ListViewEventData) {
    const swipeLimits = args.data.swipeLimits;
    const swipeView = args['object'];
    const rightItem = swipeView.getViewById<View>('delete-view');
    swipeLimits.left = 0;
    swipeLimits.right = rightItem.getMeasuredWidth();
    swipeLimits.threshold = rightItem.getMeasuredWidth() / 2;
  }

  public onSwipeCellFinished(args: ListViewEventData) {
  }

  public onRightSwipeClick(args) {
    const message = args.object.bindingContext;
    this.dataItems.splice(this.dataItems.indexOf(message), 1);
    if (this._dataItems.length == 0) {
      this._dataItems.push("empty");
      this.cacheService.store("messages", []);
    } else {
      this.cacheService.store("messages", this._dataItems.slice(0, this._dataItems.length));
    }
    this.userService.deleteMessage(message.id).subscribe();
  }  
}
