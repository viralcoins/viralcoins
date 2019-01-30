import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { StripeAddress, StripePaymentData, StripePaymentListener, StripePaymentMethod, StripePaymentSession, StripeShippingMethod, StripeShippingMethods } from "nativescript-stripe/standard";
import { Page } from "ui/page";
import { Item } from "./item";
import { StripeService } from "./stripe.service";
import { CoinService } from '../../services/coin.service';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import * as dialogs from "tns-core-modules/ui/dialogs";

@Component({
  selector: "stp-details",
  moduleId: module.id,
  templateUrl: "./payment.component.html",
})
export class PaymentComponent implements OnInit {
  item: Item;
  price: number;
  errorMessage: string;
  successMessage: string;
  private paymentSession: StripePaymentSession;
  paymentMethod: StripePaymentMethod;
  shippingInfo: StripeShippingMethod;

  constructor(
    private page: Page,
    private stripeService: StripeService,
    public changeDetectionRef: ChangeDetectorRef,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private coinService: CoinService
  ) {
    this.route.queryParams.subscribe(params => {
      this.stripeService.setCoinId(params.coinId);
      this.price = params.price
    });
    page.actionBarHidden = true;
  }

  ngOnInit(): void {
    this.item = {
      id: 0,
      name: "1 Viral Coin",
      price: this.price
    };
    console.log("2");
    this.paymentSession = this.stripeService.createPaymentSession(
      this.page, this.item.price, new Listener(this));
  }

  get isLoading(): boolean {
    return this.paymentSession ? this.paymentSession.loading : true;
  }

  get paymentInProgress(): boolean {
    return this.paymentSession ? this.paymentSession.paymentInProgress : false;
  }

  get canBuy(): boolean {
    return this.paymentSession ?
      this.paymentSession.isPaymentReady && !this.paymentSession.paymentInProgress :
      false;
  }

  get total(): number {
    return this.paymentSession ? this.paymentSession.amount : this.item.price;
  }

  get paymentType(): string {
    return this.paymentMethod ? this.paymentMethod.label : "Select Payment";
  }

  get paymentImage(): any {
    return this.paymentMethod ? this.paymentMethod.image : null;
  }

  get shippingType(): string {
    return this.shippingInfo ?
      `${this.shippingInfo.label} ($${this.shippingInfo.amount / 100})` :
      "Enter Shipping Info";
  }

  showPaymentMethods() {
    this.stripeService.showPaymentMethods(this.paymentSession);
  }

  showShipping() {
    this.stripeService.showShipping(this.paymentSession);
  }

  buy() {
    this.stripeService.requestPayment(this.paymentSession);
  }

  back() {
    const _this = this;
    dialogs.alert({
      title: "Success!",
      message: "Your coin has been added to your wallet. You will receive a confirmation email now and another when it is shipped. Thank you!",
      okButtonText: "OK"
    }).then(function (response) {
      _this.coinService.reloadWallet = true;
      _this.coinService.reloadSaleCoins = true;
      _this.routerExtensions.back();
    }); 
  }
}

class Listener implements StripePaymentListener {
  constructor(private component: PaymentComponent) {
  }

  onCommunicatingStateChanged(_isCommunicating: boolean): void {
    this.component.changeDetectionRef.detectChanges();
  }

  onPaymentDataChanged(data: StripePaymentData) {
    this.component.paymentMethod = data.paymentMethod;
    this.component.shippingInfo = data.shippingInfo;
    this.component.changeDetectionRef.detectChanges();
  }

  onPaymentSuccess(): void {
    // this.component.successMessage =
    //   `Congratulations! You bought a "${this.component.item.name}" for $${this.component.item.price / 100}.`;
    this.component.changeDetectionRef.detectChanges();
    this.component.back();
  }

  onUserCancelled(): void {
    this.component.changeDetectionRef.detectChanges();
  }

  onError(_errorCode: number, message: string) {
    this.component.errorMessage = message;
    this.component.changeDetectionRef.detectChanges();
  }

  provideShippingMethods(address: StripeAddress): StripeShippingMethods {
    let usps: StripeShippingMethod = {
      amount: 0,
      label: "USPS",
      detail: "Arrives in 3-5 days",
      identifier: "usps"
    };

    let methods = <StripeShippingMethods>{};
    if (!address.country || address.country === "US") {
      methods.isValid = true;
      methods.validationError = undefined;
      methods.shippingMethods = [usps];
      methods.selectedShippingMethod = usps;
    } else {
      methods.isValid = false;
      methods.validationError = "We can't ship to this country.";
    }
    return methods;
  }
}