import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

@Injectable()
export class LoadingService {

  public isLoadingSubject: BehaviorSubject<any>;
  public isLoading: Observable<any>;

  constructor() {
    this.isLoadingSubject = new BehaviorSubject<any>(false);
    this.isLoading = this.isLoadingSubject.asObservable();    
  }

  public setLoading(loading: any) {
    this.isLoadingSubject.next(loading);
  }

}