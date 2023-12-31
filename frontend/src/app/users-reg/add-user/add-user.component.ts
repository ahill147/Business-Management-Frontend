import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modal.service';
import { FullUserDto, UserService } from 'src/app/user.service';

@Component({
  selector: 'jw-modal',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddUserComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  isSubmitted = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    // add self (this modal instance) to the modal service so it can be opened from any component
    this.modalService.add(this);

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: any) => {
        if (el.target.className === 'jw-modal') {
            this.close();
        }
    });
  }

  ngOnDestroy() {
    this.isSubmitted = false;
    this.userForm.reset();
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.adminRole?.setValue("");
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.isSubmitted = false;
    this.userForm.reset();

    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

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

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get password() {
    return this.userForm.get('password');
  }
  get confirmPassword() {
    return this.userForm.get('confirmPassword');
  }
  get adminRole() {
    return this.userForm.get('adminRole');
  }

  onSubmit(): void {

    this.isSubmitted = true;
    if(!this.userForm.valid) {
      false;
    } else {
      //console.log(JSON.stringify(this.userForm.value));
      this.userService.createUser(this.userForm.value).subscribe(
        (user: FullUserDto) => {
          console.log(user);
          this.close();
        },
        (error: any) => {
          console.error('Error retrieving user data:', error);
          this.close();
        }
      )
      // const query = this.userService.createUser(this.userForm.value);
      // if (query) {
      //   console.log("User successfully added");
      // } else {
      //   console.log("User failed to add");
      // }
      // console.log(query);
      // this.close();
    }
  }
}
