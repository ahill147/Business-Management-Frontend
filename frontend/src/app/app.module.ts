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
import { HttpClientModule } from '@angular/common/http';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';
import { ProjectListItemComponent } from './projects-display/project-list-item/project-list-item.component';

import { MatIconModule } from '@angular/material/icon';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { FormsModule } from '@angular/forms';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { AnnouncementService } from './announcement.service';
import { ModalService } from './modal.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SelectCompanyComponent,
    NavMenuComponent,
    HomeAnnouncementsComponent,
    UsersRegComponent,
    AddUserComponent,
    ProjectsDisplayComponent,
    CreateAnnouncementComponent,
    ProjectListItemComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    FormsModule,
    SelectDropDownModule,
    OverlayModule,
    MatDialogModule,
  ],
  providers: [UserService, AnnouncementService, ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
