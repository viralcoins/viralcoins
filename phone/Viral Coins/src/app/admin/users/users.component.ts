import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ListViewEventData } from "nativescript-ui-listview";
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'ns-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  moduleId: module.id,
})
export class UsersComponent extends ListViewComponent implements OnInit {

  constructor(
    private userService: UserService,
    public loadingService: LoadingService
    ) {
    super(loadingService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.load();    
  }

  getData() {
    return this.userService.getAllUsers()
  }    

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == null ? 'user' : 'empty';
  }    

  public doReload() {
    this.userService.reloadAllUsers = true;    
  }
}
