import { Component } from '@angular/core';
import { FullUserDto, UserService } from '../user.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-users-reg',
  templateUrl: './users-reg.component.html',
  styleUrls: ['./users-reg.component.css']
})
export class UsersRegComponent {

  users: any;
  populated: boolean = false;

  constructor(public userService: UserService, protected modalService: ModalService) {}

  ngOnInit(): void {
    this.populateUserTable();
  }

  populateUserTable() {
    this.userService.getAllUsers().subscribe(
      (users: FullUserDto[]) => {
        this.users = users;
        console.log(users);
        this.populated = true;
      },
      (error: any) => {
        console.error('Error retrieving user data:', error);
      }
    )
    // try {
    //   const response = await this.userService.getAllUsers()
    //   if (response) {
    //     this.users = response.users;
    //     this.populated = true;
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
      this.modalService.close();
  }

}
