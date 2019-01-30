import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HeaderComponent } from '../widgets/header/header.component';

@NgModule({
  declarations: [
  	HeaderComponent
  ],
  exports: [
  	HeaderComponent
  ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
