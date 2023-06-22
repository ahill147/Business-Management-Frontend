import { Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalService } from 'src/app/modal.service';
import { UserService, FullUserDto } from 'src/app/user.service';

@Component({
  selector: 'app-team-overlay',
  templateUrl: './team-overlay.component.html',
  styleUrls: ['./team-overlay.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamOverlayComponent {
  @Input() id?: string;
  isOpen = false;
  private element: any;

  memberList: any;

  isSubmitted = false;

  teamForm = this.formBuilder.group({
    teamName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    members: ['', [Validators.required]],
  });

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

    this.populateMembers()
  }

  ngOnDestroy() {
    this.isSubmitted = false;
    this.teamForm.reset();
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.element.remove();
  }

  open() {
    this.members?.setValue("");
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.isSubmitted = false;
    this.teamForm.reset();

    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

  changeMember(e: any) {
    this.members?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get teamName() {
    return this.teamForm.get('teamName');
  }
  get description() {
    return this.teamForm.get('description');
  }
  get members() {
    return this.teamForm.get('members');
  }

  populateMembers() {
    this.userService.getAllUsers().subscribe(
      (memberList: FullUserDto[]) => {
        this.memberList = memberList;
      }
    )
  }

  onSubmit(): void {

    this.isSubmitted = true;
    if(!this.teamForm.valid) {
      false;
    } else {
      //console.log(JSON.stringify(this.teamForm.value));
      // const query = this.userService.createUser(this.teamForm.value);
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
