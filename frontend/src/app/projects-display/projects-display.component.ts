import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import Company from '../interface-models/CompanyDto';
import User from '../interface-models/FullUserDto';

@Component({
  selector: 'app-projects',
  templateUrl: './projects-display.component.html',
  styleUrls: ['./projects-display.component.css']
})
export class ProjectsDisplayComponent implements OnInit{
  teamName: string = '';
  projects: any[] = [];
  companyId: number | null = null;
  teamId: number | null = null;
  projectId: number | null = null;
  company: Company | null = null;
  user: User | undefined = undefined;
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
              private userService: UserService) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.teamId = Number(params['teamId']);
    });
    this.companyService.selectedCompany.subscribe((company) => {
      this.company = company;
      this.companyId = company?.id ?? null;
    });
    this.user = this.userService.getUser();
    
    const selectedTeam = this.company?.teams.find(
      (team) => team.id === this.teamId
    );
    if (selectedTeam) {
      this.teamName = selectedTeam.name;
    }
    this.getTeamProjects();
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
