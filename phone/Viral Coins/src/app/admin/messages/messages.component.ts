import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CacheService } from '../../services/cache.service';
import { ListViewEventData } from "nativescript-ui-listview";
import { View } from 'tns-core-modules/ui/core/view';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { MessageDetailComponent } from '../message-detail/message-detail.component';
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ns-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  moduleId: module.id,
})
export class MessagesComponent extends ListViewComponent implements OnInit {

  private rightThresholdPassed: boolean;  

  constructor(
    private userService: UserService,
    private cacheService: CacheService,
    private modal: ModalDialogService,
    private vcRef: ViewContainerRef,
    public loadingService: LoadingService
    ) {
    super(loadingService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.load();    
  }

  getData() {
    return this.userService.messages()
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == null ? 'message' : 'empty';
  }    

  doReload() {
    this.userService.reloadMessages = true;    
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
      this._dataItems.push({type: "empty"});
      this.cacheService.store("messages", []);
    } else {
      this.cacheService.store("messages", this._dataItems.slice(0, this._dataItems.length));
    }
    this.userService.deleteMessage(message.id).subscribe();
  }  

  public onItemTap(message) {
    console.log(message);
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: message,
      fullscreen: true
    };

    this.modal.showModal(MessageDetailComponent, options)
      .then(() => {
        console.log("");
      });    
  }
}
