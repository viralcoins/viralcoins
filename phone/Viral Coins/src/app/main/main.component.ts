import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ns-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  moduleId: module.id,
})
export class MainComponent implements OnInit {
  isLoading = false;

  constructor(
    private loadingService: LoadingService
    ) {
  }

  ngOnInit() {

  }

  onStartScan(): void {
    this.loadingService.setLoading(true);
  }

  onEndScan(): void {
    this.loadingService.setLoading(false);
  }

}
