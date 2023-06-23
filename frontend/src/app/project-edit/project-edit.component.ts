import { Component } from '@angular/core';

import { ProjectService } from '../project.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import { CredentialsDto } from '../interface-models/CredentialsDto';
import { UserService } from '../user.service';
import ProjectDto from '../interface-models/ProjectDto';
import BasicUserDto from '../interface-models/BasicUserDto';


interface ProjectRequestDto {
  credentials: CredentialsDto,
  name: string,
  description: string,
  active: boolean
}

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent {

  project: ProjectDto | undefined = this.projectData.getSelectedProject();
  projectDescription: any = ""
  projectName: any = ""

  ngOnInit(): void {
    // console.log("project in dialogue", this.project)
    this.projectDescription = this.project?.description
    this.projectName = this.project?.name
  }

  constructor(private userData: UserService, private projectData: ProjectService, 
              private http: HttpClient, private router: Router, 
              private dialogRef: MatDialogRef<ProjectEditComponent>) { }

  onSubmit() {
    //this will return an announcementDTO that we will store in the service, but may not need to
    //should just update the data base with new announcement which will load on init
    console.log("ON SUBMIT")
    
    this.patchProject();

    this.closeDialog();
    this.router.navigate(['/projects'])
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  patchProject() {

    const projectToPatch: ProjectRequestDto = {
        credentials: this.userData.credentials,
        name: this.projectName,
        description: this.projectDescription,
        active: true
      };
  
      console.log("project to patch", projectToPatch);

      const projectId = this.project?.id;
      this.http.patch<ProjectDto>(`http://localhost:8080/projects/${projectId}`, projectToPatch)
      .subscribe({
        next: (projectFromServer: ProjectDto) => {
          console.log("updated project", projectFromServer)
          this.userData.editFullUserProjects(projectFromServer)
          this.dialogRef.close(projectFromServer); //pass the announcement argument as our result
        },
        error: (error) => {
          console.error;
        }
      });
    }
}
