import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  isSubmitted = false;

  constructor(private formBuilder: FormBuilder) {}

  userForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
    adminRole: ['', [Validators.required]],
  });

  changeRole(e: any) {
    this.adminRole?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  get adminRole() {
    return this.userForm.get('adminRole');
  }

  onSubmit(): void {
    console.log(this.userForm);
    this.isSubmitted = true;
    if(!this.userForm.valid) {
      false;
    } else {
      console.log(JSON.stringify(this.userForm.value));
    }
  }
}
