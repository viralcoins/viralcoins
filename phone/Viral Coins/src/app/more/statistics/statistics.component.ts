import { Component, OnInit } from '@angular/core';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { Page } from "ui/page";

@Component({
  selector: 'ns-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  moduleId: module.id,
})
export class StatisticsComponent implements OnInit {
  private _categoricalSource: ObservableArray<any>;

  constructor(
    private page: Page
    ) {
    page.actionBarHidden = true;
  }

  get categoricalSource(): ObservableArray<any> {
    return this._categoricalSource;
  }

  ngOnInit() {
    this._categoricalSource = new ObservableArray([
      {
        "category": "Jan 26",
        "value": 10
      },
      {
        "category": "Jan 27",
        "value": 11
      },
      {
        "category": "Jan 28",
        "value": 15
      },
      {
        "category": "Jan 29",
        "value": 21
      },
      {
        "category": "Jan 30",
        "value": 25
      }
    ]);
  }
}