import { Component } from '@angular/core';
import { CredentialsDto, UserService } from '../user.service';
import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import ProjectDto from '../interface-models/ProjectDto';

interface ProjectRequestDto {
  credentials: CredentialsDto,
  name: string,
  description: string,
  active: boolean
}

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent {

  projectDescription: any = ""
  projectName: any = ""
  teamId: any = ""

  ngOnInit(): void {
    const selectedTeam = this.userData.team;
    if (selectedTeam) {
      // this.teamName = selectedTeam.name;
      this.teamId = selectedTeam.id;
    }
  }

  constructor(private userData: UserService, private projectData: ProjectService, 
              private http: HttpClient, private router: Router, 
              private dialogRef: MatDialogRef<ProjectCreateComponent>) { }

  onSubmit() {
    console.log("ON SUBMIT")
    
    this.postProject();

    this.closeDialog();
    this.router.navigate(['/projects'])
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  postProject() {

    const projectToPost: ProjectRequestDto = {
        credentials: this.userData.credentials,
        name: this.projectName,
        description: this.projectDescription,
        active: true
      };
  
      console.log("project to post", projectToPost);

      const teamId = this.teamId;
      this.http.post<ProjectDto>(`http://localhost:8080/projects/${teamId}`, projectToPost)
      .subscribe({
        next: (projectFromServer: ProjectDto) => {
          console.log("created project", projectFromServer)
          // this.userData.editFullUserProjects(projectFromServer)
          this.dialogRef.close(projectFromServer);
        },
        error: (error) => {
          console.error;
        }
      });
  }
}
