import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";

@Component({
  selector: 'vc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  moduleId: module.id,
})
export class HeaderComponent implements OnInit {

  @Output('onMessage') onMessage = new EventEmitter();
  @Output('onClose') onClose = new EventEmitter();
  @Input('left') left: string;
  @Input('right') right: string;
  @Input('link') link: string;

  constructor(
  	private routerExtensions: RouterExtensions
  ) { }

  ngOnInit() {
  }

  onBackTap(): void {
    if (this.link) {
      this.routerExtensions.navigate([this.link],{
        transition: {
          name: "slideRight"
        }
      });
    } else {
      this.routerExtensions.back();      
    }
  }  

  onMessageTap(): void {
    this.onMessage.emit();
  }

  onCloseTap(): void {
    this.onClose.emit();
  }

}
