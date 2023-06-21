import { Component, OnInit } from '@angular/core';
import { UserService, FullUserDto } from '../user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  currentUser : FullUserDto | undefined
  //based on the user Admin status, different buttons will be displayed
  
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
    if(this.userService.getUser()){
      this.currentUser = this.userService.getUser()
    }
  }

}
