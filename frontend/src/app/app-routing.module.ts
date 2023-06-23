import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { HomeAnnouncementsComponent } from './home-announcements/home-announcements.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';
import { UsersRegComponent } from './users-reg/users-reg.component';
import { AddUserComponent } from './users-reg/add-user/add-user.component';
import { CreateAnnouncementComponent } from './create-announcement/create-announcement.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectDetailComponent } from './projects-display/project-detail/project-detail.component';
import { AdminGuard } from './admin-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'select-company', component: SelectCompanyComponent, canActivate: [AdminGuard]  },
  { path: 'announcements', component: HomeAnnouncementsComponent },
  { path: 'nav', component: NavMenuComponent },
  { path: 'projects', component: ProjectsDisplayComponent },
  { path: 'projects/:itemId', component: ProjectDetailComponent },
  { path: 'user-registry', component: UsersRegComponent, canActivate: [AdminGuard]  },
  { path: 'create-announcement', component: CreateAnnouncementComponent, canActivate: [AdminGuard]  },
  { path: 'teams', component: TeamsComponent, canActivate: [AdminGuard] },


  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
