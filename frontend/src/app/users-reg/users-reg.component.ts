import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { ModalService } from '../modal.service';

@Component({
  selector: 'app-users-reg',
  templateUrl: './users-reg.component.html',
  styleUrls: ['./users-reg.component.css']
})
export class UsersRegComponent {

  users: any;
  populated: boolean = false;

  constructor(private userService: UserService, protected modalService: ModalService) {}

  ngOnInit(): void {
    this.populateUserTable();
  }

  async populateUserTable() {
    try {
      const response = await this.userService.getAllUsers()
      if (response) {
        this.users = response.users;
        this.populated = true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
}

  closeModal(id: string) {
      this.modalService.close();
  }

}
