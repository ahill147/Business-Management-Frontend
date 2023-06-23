import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(): boolean {
    const user = this.userService.getUser();

    if (user && user.admin) {
      return true; // User is an admin, allow access
    }
    // User is not an admin, redirect to unauthorized page or login page
    this.router.navigate(['']);
    return false;
  }
}
