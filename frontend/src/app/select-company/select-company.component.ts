import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import BasicUserDto from '../interface-models/BasicUserDto';


@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit{

  selectCompanyForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private userService: UserService, private router: Router){
    this.selectCompanyForm = new FormGroup({
      selectCompany: new FormControl('') //initialize the default value with an empty string
    });
  }

  onSubmit() {
    const selectedCompanyName = this.selectCompanyForm.get('selectCompany')?.value;
    //users have an array of CompanyDtos that they are assigned
    //i want to find the one that matches their selection
    const selectedCompany = this.userService.fullUser?.companies.find(
      (company) => company.name === selectedCompanyName
    ); 
    
    if (selectedCompany) {
      this.userService.currentCompany = selectedCompany;
    }
    //now our user should have a currentCompany assigned and we can route to home
    this.router.navigate(['/announcements'])

  }
}
