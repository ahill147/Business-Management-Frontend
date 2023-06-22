import { Component, Input } from '@angular/core';
import { Router } from '@angular/router'
import ProjectDto from 'src/app/interface-models/ProjectDto';

@Component({
  selector: 'app-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.css']
})
export class ProjectListItemComponent {
  @Input() project: any;
  @Input() itemId: any;

  constructor(private router: Router) { }

  navigateToProject(itemId: string) {
    
    this.router.navigateByUrl(`/projects/${itemId}`);    
  }
}
