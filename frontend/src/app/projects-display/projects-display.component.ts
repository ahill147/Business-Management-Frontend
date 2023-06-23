import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import CompanyDto from '../interface-models/CompanyDto';
import FullUserDto from '../interface-models/FullUserDto';
import ProjectDto from '../interface-models/ProjectDto';

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
              private userData: UserService) {}

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
      this.companyId = this.company?.id ?? null;

      const selectedTeam = this.userData.team;
      console.log('selectedTeam', selectedTeam)
      
      if (selectedTeam) {
        this.teamName = selectedTeam.name;
        this.teamId = selectedTeam.id;
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

  createNewProject(project: any): void {
    // const companyId = this.companyId;
    const teamId = this.teamId;

    const url = `http://localhost:8080/projects/${teamId}`;

    this.http.post(url, project).subscribe(
      (response) => {
        console.log('Project created successfully:', response);
        // hide();
        this.getTeamProjects();
      },
      (error) => {
        console.error('Error creating project:', error);
      }
    );
  }

  editProject(project: any): void {
    const projectId = this.projectId;

    const url = `http://localhost:8080/projects/${projectId}`;

    this.http.patch(url, project).subscribe(
      (response) => {
        console.log('patch request');
        console.log('Project updated successfully:', response);
        // hide();
        this.getTeamProjects();
      },
      (error) => {
        console.error('Error updating project:', error);
      }
    );
  }

}
