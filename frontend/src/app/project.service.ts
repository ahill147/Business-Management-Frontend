import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import ProjectDto from './interface-models/ProjectDto';

@Injectable({
  providedIn: 'root',
})

export class ProjectService {
  private selectedProjectSource = new BehaviorSubject<ProjectDto | undefined>(undefined);
  selectedProject = this.selectedProjectSource.asObservable();

  updateSelectedProject(project: ProjectDto) {
    this.selectedProjectSource.next(project);
  }

  getSelectedProject(): ProjectDto | undefined {
    return this.selectedProjectSource.getValue();
  }
}