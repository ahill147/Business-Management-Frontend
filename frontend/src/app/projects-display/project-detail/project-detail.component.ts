import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectData: ProjectService
  ) {}

  ngOnInit(): void {
    this.project = this.projectData.getSelectedProject();
  }

} 
