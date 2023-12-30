import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SideBarComponent,
    SignupPageComponent,
    Page404Component,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
