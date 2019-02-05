import { ViewChild, OnInit } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { of } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export class ListViewComponent implements OnInit {
  @ViewChild('componentListView') componentListView;

  constructor(public loadingService: LoadingService) {
    this._dataItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;
  }

  ngOnInit() {
    this.loadingService.setLoading(true);    
    this._dataItems = new ObservableArray();
    this._templateSelector = this.templateSelectorFunction;    
  }

  protected _dataItems: ObservableArray<any>;
  protected _templateSelector: (item: any, index: number, items: any) => string;

  get dataItems(): ObservableArray<any> {
    return this._dataItems;
  } 

  get templateSelector(): (item: any, index: number, items: any) => string {
    return this._templateSelector;
  }

  set templateSelector(value: (item: any, index: number, items: any) => string) {
    this._templateSelector = value;
  }

  protected templateSelectorFunction = (item: any, index: number, items: any): string => {
    return "";
  }  

  protected getData() {
    return of([]);
  }

  protected populateData(response) {
    this._dataItems.splice(0);
    if (response.length > 0) {
      for (let item of response) {
        this._dataItems.push(item);
      }              
    } else {
      this._dataItems.push({type: 'empty'});
    }
  }

  protected load() {
    const _this = this;
    this.getData().subscribe(response => {
      this.populateData(response);
      setTimeout(function() {
        _this.componentListView.listView.notifyPullToRefreshFinished();
      });
      this.loadingService.setLoading(false);
    });
  }

  protected doReload(): void {
    // example: this.service.reloadVariable = true;
  }

  public onPullToRefreshInitiated($event) {
    const _this = this;    
    setTimeout(function () {
      _this.doReload();
      _this.load();
    }, 1000);    
  }  
}
