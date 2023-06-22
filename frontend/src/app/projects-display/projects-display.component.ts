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

    // this.user ?? this.router.navigateByUrl('/lemonade')

    if (!this.user?.admin) {    // user is a Worker
      this.projects = this.userData.getUserProjects();
    } else {
    
      this.company = this.userData.currentCompany;
      this.companyId = this.company?.id ?? null;

      const selectedTeam = this.company?.teams.find(
        (team) => team.id === this.teamId
      );
      if (selectedTeam) {
        this.teamName = selectedTeam.name;
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

  projectFormSubmit(): void {
    if (this.editProjectForm.valid) {
      const formData = {
        name: this.editProjectForm.get('name')?.value,
        description: this.editProjectForm.get('description')?.value,
        active:
          this.formMode === 'edit'
            ? this.editProjectForm.get('active')?.value
            : true,
      };
      console.log('FORM SUBMIT', formData);
      if (this.formMode === 'edit') {
        this.editProject(formData);
      }

      if (this.formMode === 'new') {
        this.createNewProject(formData);
      }
    }
  }

  createNewProject(project: any): void {
    const companyId = this.companyId;
    const teamId = this.teamId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects`;

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
    const companyId = this.companyId;
    const teamId = this.teamId;
    const projectId = this.projectId;

    const url = `http://localhost:8080/company/${companyId}/teams/${teamId}/projects/${projectId}`;

    this.http.patch(url, project).subscribe(
      (response) => {
        console.log('PATCH REQ');
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
