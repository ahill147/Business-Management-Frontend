import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import CompanyDto from '../interface-models/CompanyDto';
import FullUserDto from '../interface-models/FullUserDto';
import ProjectDto from '../interface-models/ProjectDto';
import { MatDialog } from '@angular/material/dialog';
import { ProjectCreateComponent } from '../project-create/project-create.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css']
})
export class ProjectsDisplayComponent implements OnInit{
  teamName: string = '';
  projects: ProjectDto[] | undefined = [];
  companyId: number | null = null;
  teamId: number | null = null;
  projectId: number | null = null;
  company: CompanyDto | undefined = undefined;
  user: FullUserDto | undefined = undefined;
  formMode: string = '';

  editProjectForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1),
    ]),
    description: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    active: new FormControl<boolean>(true),
  });

  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,
              private userData: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.teamId = Number(params['teamId']);
    });
    
    this.user = this.userData.getUser();

    // this.user ?? this.router.navigateByUrl('/')

    if (!this.user?.admin) {    // user is a Worker
      this.projects = this.userData.getUserProjects();

      console.log("reset userData projects:", this.projects)
    } else {
    
      this.company = this.userData.currentCompany;
      console.log("currentCompany:", this.company)
      this.companyId = this.company?.id ?? null;

      const selectedTeam = this.userData.team;
      console.log('selectedTeam', selectedTeam)
      
      if (selectedTeam) {
        this.teamName = selectedTeam.name;
        this.teamId = selectedTeam.id;
        // this.teamId = selectedTeam.id - 10;

      }
      this.getTeamProjects();
    }
  }

  getTeamProjects(): void {
    const teamId = this.teamId;
    const companyId = this.companyId;
    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;
    this.http.get<any[]>(url).subscribe(
      (response) => {
        this.projects = response;
        console.log(this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  openCreateProjectDialog(): void {
    // this.projectData.updateSelectedProject(this.project);

    const dialogRef = this.dialog.open(ProjectCreateComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any result or action after the dialog is closed
      if (result) {
        console.log("RESULT FROM DIALOG Project)" + result)
        // this.allAnnouncements.unshift(result); // Add the new announcement at the beginning
        // console.log("ALL ANNOUNCEMENTS AFTER NEW" + this.allAnnouncements)
      }
      this.getTeamProjects()
    });
  }


}
