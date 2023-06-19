import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  isWorkerLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  ngOnInit(): void {
  }

  constructor(private userService : UserService, private router : Router){
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    // Simulating API call to authenticate the user
    // Replace this with actual API calls when available
    if (username === 'worker' && password === 'workerpassword') {
      // Set user properties based on API response
      this.userService.id = 1;
      this.userService.username = username;
      this.userService.password = password;
      this.userService.isWorker = true;
    } else if (username === 'admin' && password === 'adminpassword') {
      // Set user properties based on API response
      this.userService.id = 2;
      this.userService.username = username;
      this.userService.password = password;
      this.userService.isWorker = false;
    } else {
      // Handle invalid credentials or other scenarios
    }

    //routing to either the home-announcements-component or the select-company component based on admin or worker properties in user:

    if (this.userService.isWorker) {
      // Navigate to the home-announcements component for workers
      this.router.navigate(['/home-announcements']);
    } else {
      // Navigate to the select-company component for admins
      this.router.navigate(['/select-company']);
    }
  }



}
