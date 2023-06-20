import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


interface ProfileDto {
  firstname: string,
  lastname: string,
  email:string,
  phone: string
}

interface FullUserDto {
  id: number,
  profile: ProfileDto,
  isAdmin: boolean,
  active: boolean,
  status: string,
  companies: [any],
  teams: [any]
}

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

  constructor(private userService : UserService, private router : Router, private http: HttpClient){
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.login(username, password).subscribe({
      next: (user: FullUserDto) => {
        if (user.isAdmin) {
          // Navigate to the home-announcements component for admins
          this.router.navigate(['/home-announcements']);
        } else {
          // Navigate to the select-company component for workers
          this.router.navigate(['/select-company']);
        }
      },
      error: (error) => {
        // Handle login error if necessary
      }
    });
  }
}


