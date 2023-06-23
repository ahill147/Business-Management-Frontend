import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import ProjectDto from 'src/app/interface-models/ProjectDto';
import { ProjectEditComponent } from 'src/app/project-edit/project-edit.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent {
  @Input() project: any;
  @Input() itemId: any;

  constructor(private router: Router, private projectData: ProjectService, private dialog: MatDialog) { }

  navigateToProject(itemId: string) {
    
    this.router.navigateByUrl(`/projects/${itemId}`);
  }


  //change all this for editing a project
  openEditProjectDialog(): void {
    this.projectData.updateSelectedProject(this.project);

    const dialogRef = this.dialog.open(ProjectEditComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any result or action after the dialog is closed
      if (result) {
        console.log("RESULT FROM DIALOG Project)" + result)
        // this.allAnnouncements.unshift(result); // Add the new announcement at the beginning
        // console.log("ALL ANNOUNCEMENTS AFTER NEW" + this.allAnnouncements)
      }
    });
  }
}
