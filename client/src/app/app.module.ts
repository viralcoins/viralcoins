import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CoinComponent } from './coin/coin.component';
import { WalletComponent } from './wallet/wallet.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { FindComponent } from './find/find.component';
import { SignupComponent } from './signup/signup.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { HowComponent } from './how/how.component';
import { CoinEditComponent } from './coin-edit/coin-edit.component';
import { RedeemComponent } from './redeem/redeem.component';
import { AccountComponent } from './account/account.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'coin/:id', component: CoinComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'find', component: FindComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'privacy', component: PrivacyComponent},
  { path: 'how', component: HowComponent},
  { path: 'forgot', component: ForgotComponent},
  { path: 'user/password', component: ResetComponent},

  // Authenticated Pages
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'redeem', component: RedeemComponent, canActivate: [AuthGuard] },
  { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },

  // Admin Pages
  { path: 'coin/edit/:code', component: CoinEditComponent, canActivate: [AdminGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },

  // Default redirect
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CoinComponent,
    WalletComponent,
    HeaderComponent,
    AuthComponent,
    HomeComponent,
    FindComponent,
    SignupComponent,
    PrivacyComponent,
    HowComponent,
    CoinEditComponent,
    RedeemComponent,
    AccountComponent,
    ForgotComponent,
    ResetComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAfU36bbQuhQB5ruXL5DWFdXrGNZaeVm-Y'
    }),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
