import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeAnnouncementsComponent } from './home-announcements/home-announcements.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './user.service';
import { UsersRegComponent } from './users-reg/users-reg.component';
import { AddUserComponent } from './users-reg/add-user/add-user.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectCompanyComponent,
    NavMenuComponent,
    HomeAnnouncementsComponent,
    UsersRegComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
