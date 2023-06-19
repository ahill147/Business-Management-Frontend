import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';


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

  constructor(private userService : UserService){
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

  }



}
