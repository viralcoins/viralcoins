import { Component, OnInit } from '@angular/core';
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import { CoinService } from '../../services/coin.service';
import { Page } from "ui/page";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ns-contests',
  templateUrl: './contests.component.html',
  styleUrls: ['./contests.component.css'],
  moduleId: module.id,
})
export class ContestsComponent extends ListViewComponent implements OnInit {

  constructor(
    private coinService: CoinService,
    private page: Page,
    public loadingService: LoadingService
  ) {    
    super(loadingService);
    page.actionBarHidden = true;
  }

  ngOnInit() {
    super.ngOnInit();
    this.load();
  }

  protected templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == "empty" ? "empty" : "standard";
  }    

  public getData(): Observable<any> {
    return this.coinService.getContests();
  }

  onContestTap(): void {
    
  }

}
