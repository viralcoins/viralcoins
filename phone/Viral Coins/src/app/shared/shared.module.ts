import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { HeaderComponent } from '../widgets/header/header.component';
import { LoadingComponent } from '../widgets/loading/loading.component';

@NgModule({
  declarations: [
  	HeaderComponent,
  	LoadingComponent
  ],
  exports: [
  	HeaderComponent,
    LoadingComponent
  ],
  imports: [
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class SharedModule { }
