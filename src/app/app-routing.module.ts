import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  {
    path: "", pathMatch: "full", component : LoginPageComponent
  },
  {
    path: "signup", component : SignupPageComponent
  },
  {
    path: "profile", component : ProfilePageComponent
  },
  {
    path: "**", component : Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
