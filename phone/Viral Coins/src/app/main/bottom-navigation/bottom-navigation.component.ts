import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { filter } from "rxjs/operators";
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { CoinService } from "../../services/coin.service";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { AnimationCurve } from "ui/enums";
import { screen } from "platform";

@Component({
	selector: "app-bottom-navigation",
	moduleId: module.id,
	templateUrl: "./bottom-navigation.component.html",
	styleUrls: ['./bottom-navigation.component.css'],
  providers: [BarcodeScanner]	
})
export class BottomNavigationComponent implements OnInit {

  @ViewChild('tabHighlight') tabHighlight: ElementRef;
  @Output('onStartScan') onStartScan = new EventEmitter<any>();
  @Output('onEndScan') onEndScan = new EventEmitter<any>();

  private selectedTab: number = 0;
	private _activatedUrl: string = '/main/home';
  public code: string = "";
  coin;

	constructor(
    private barcodeScanner: BarcodeScanner,
    private coinService: CoinService,
		private router: Router,
		private routerExtensions: RouterExtensions) {
	}

  selectTab(navItemRoute: string) {
    this.routerExtensions.navigate([navItemRoute], {
      transition: {
        name: "fade"
      },
      clearHistory: true
    });
  }  

  updateTab(url: string) {
    if (url.indexOf('main') != -1) {
      this._activatedUrl = url;
    }
  }

	ngOnInit(): void {
    const _this = this;
		this.router.events
			.pipe(filter((event: any) => event instanceof NavigationEnd))
			.subscribe((event: NavigationEnd) => {
        setTimeout(function() {
          _this.updateTab(event.urlAfterRedirects);
        }, 150);
      });
	}

	isComponentSelected(url: string): boolean {
		return this._activatedUrl === url;
	}

  onScanTap(): void {
    this.openBarcodeScanner();
  }

  openBarcodeScanner(): void {
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
      closeCallback: () => { console.log("Scanner closed") }, // invoked when the scanner was closed (success or abort)
      // resultDisplayDuration: 500,   // Android only, default 1500 (ms), set to 0 to disable echoing the scanned text
      // orientation: orientation,     // Android only, default undefined (sensor-driven orientation), other options: portrait|landscape
      openSettingsIfPermissionWasPreviouslyDenied: true // On iOS you can send the user to the settings app if access was previously denied
    }).then((result) => {
      console.log(result.text);
      this.handleCode(result.text);
    }, (errorMessage) => {
      console.log("No scan. " + errorMessage);
    });
  }

  private showDialog(title, message, buttonText) {
    return dialogs.alert({
      title: title,
      message: message,
      okButtonText: buttonText
    });
  }

  public handleCode(text) {
    let regex = new RegExp("[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}-[0-9A-Z]{4}");
    if (regex.test(text)) {
      this.onStartScan.emit();
      let match = text.match(regex);
      let code = "";
      if (match) {
        code = match[0];
      }
      this.code = code;
      this.coinService.load(code).subscribe(coin => {
        const claimed = coin.claimed;
        this.coinService.claim(code).subscribe(coin => {
          this.code = "";
          this.coinService.reloadCoins = true;          
          if (claimed) {
            this.showDialog("Success!", "You have promoted this coin.", "OK");
          } else {
            this.coinService.reloadWallet = true;
            this.showDialog("Success!", "The coin has been added to your wallet.", "OK").then(() => {
              if (coin.hasPrize) {
                this.showDialog("Congratulations!", "You have found a prize coin. Head over to your wallet to redeem your prize.", "OK");
              }
            });
          }
          this.coin = coin;
          this.onEndScan.emit();
        }, () => {
          this.handleError();
        });
      }, () => {
        this.handleError();
      });
    } else {
      this.handleError();
    }
  }    

  handleError(): void {
    this.showDialog("Error!", "Invalid QR Code", "OK");
    this.code = "";
    this.onEndScan.emit();
  }  
}

