import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';


@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.css']
})
export class SelectCompanyComponent implements OnInit{

  selectCompanyForm: FormGroup;

  ngOnInit(): void {
  }

  constructor(private userService: UserService){
    this.selectCompanyForm = new FormGroup({
      selectCompany: new FormControl('') //initialize the default value with an empty string
    });
  }

  onSubmit() {
    const selectedCompany = this.selectCompanyForm.get('selectCompany')?.value;
    // Handle the selected company and perform any necessary actions
    console.log('Selected company:', selectedCompany);
    this.userService.fullUser?.companies.includes(selectedCompany);

  }


}
