import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users-reg',
  templateUrl: './users-reg.component.html',
  styleUrls: ['./users-reg.component.css']
})
export class UsersRegComponent {

  users: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.populateUserTable();
  }

  async populateUserTable() {
    try {
      const response = await this.userService.getAllUsers()
      if (response) {
        this.users = response;
      }
    } catch (error) {
      console.log(error);
    }
  }

  onAddUser() {
    
  }
}
