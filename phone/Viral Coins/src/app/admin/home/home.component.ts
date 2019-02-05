import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { CoinService } from "../../services/coin.service";
import { Coin } from '../../models/coin.model';
import { Page } from "ui/page";
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/directives/dialogs';
import { CreateComponent } from '../create/create.component';
import { CoinDetailComponent } from '../coin-detail/coin-detail.component';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { ObservableArray } from "tns-core-modules/data/observable-array";
import { ListViewEventData } from "nativescript-ui-listview";
import { ListViewComponent } from '../../components/list-view.component';
import { Observable } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: "admin-home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [BarcodeScanner]
})
export class HomeComponent extends ListViewComponent implements OnInit {
  code: string = "";

  constructor(
    private coinService: CoinService,
    private page: Page,
    private vcRef: ViewContainerRef,
    private modal: ModalDialogService,
    private barcodeScanner: BarcodeScanner,
    public loadingService: LoadingService
  ) {
    super(loadingService);
    this.page.actionBarHidden = true;
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.load();
  }  

  getData() {
    return this.coinService.all();
  }  

  doReload() {
    this.coinService.reloadAllCoins = true;    
  }

  public templateSelectorFunction = (item: any, index: number, items: any): string => {
    return item.type == null ? 'coin' : 'empty';
  }   

  onAddTap(): void {
    const _this = this;
    this.scanBarcode().then(code => {
      this.code = code;
      setTimeout(function() {
        _this.openCreate(_this.code);
      }, 1000);
    });
  }

  openCreate(code): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: {
        code: code
      },
      fullscreen: true
    };

    this.modal.showModal(CreateComponent, options)
      .then(() => {
        this.code = "";
        this.coinService.reloadAllCoins = true;
        this.load();
      });
  }

  openCoin(coin): void {
    const options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: coin,
      fullscreen: true
    };

    this.modal.showModal(CoinDetailComponent, options)
      .then(() => {
        this.coinService.reloadAllCoins = true;
        this.load();        
      });
  }

  scanBarcode(): Promise<string> {
    const _this = this;
    return new Promise((resolve, reject) => {
      this.barcodeScanner.scan({
        formats: "QR_CODE, EAN_13",
        // cancelLabel: "EXIT. Also, try the volume buttons!", // iOS only, default 'Close'
        cancelLabelBackgroundColor: "#333333", // iOS only, default '#000000' (black)
        message: "Use the volume buttons for extra light", // Android only, default is 'Place a barcode inside the viewfinder rectangle to scan it.'
        showFlipCameraButton: true,   // default false
        preferFrontCamera: false,     // default false
        showTorchButton: true,        // default false
        beepOnScan: true,             // Play or Suppress beep on scan (default true)
        torchOn: false,               // launch with the flashlight on (default false)
        closeCallback: () => {}, // invoked when the scanner was closed (success or abort)
        // resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
        // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
        openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
      }).then((result) => {
        console.log("Result Fired");
        resolve(this.handleCode(result.text));
      }, (errorMessage) => {
        console.log("No scan. " + errorMessage);
      });
    });
  }

  public handleCode(text) {
    let regex = new RegExp("[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}");
    if (regex.test(text)) {
      let match = text.match(regex);
      let code = "";
      if (match) {
        code = match[0];
      }
      return code;
    }
    return "";
  }  

  createCode(): string {
    var output = "";
    var valid = "0123456789ABCDEFGHIJKLMOPQRSTUVWXYZ";
    for ( var i = 0; i < 4; i++ ) {
      for ( var j = 0; j < 4; j++ ) {
        var index = Math.floor(Math.random() * valid.length);
        var character = valid.substr(index, 1);
        output += character;
      }
      if (i < 3) {
        output += "-";
      }
    }
    return output;
  }  

  onGenerateTap() {
    this.code = this.createCode();
  }

  onItemTap(coin) {
    this.openCoin(coin);
  }
}
