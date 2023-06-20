import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsDisplayComponent {


  constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

}
