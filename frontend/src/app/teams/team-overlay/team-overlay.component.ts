import { Component, ElementRef, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import TeamDto from 'src/app/interface-models/TeamDto';
import { ModalService } from 'src/app/modal.service';
import { UserService, FullUserDto, ProfileDto } from 'src/app/user.service';


@Component({
  selector: 'app-team-overlay',
  templateUrl: './team-overlay.component.html',
  styleUrls: ['./team-overlay.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TeamOverlayComponent {
  @Output() event = new EventEmitter<string>();
  @Input() id?: string;
  isOpen = false;
  private element: any;

  memberList!: FullUserDto[];
  originalMembersList!: FullUserDto[];
  addedMembers: FullUserDto[] = [];
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

    this.event.emit();
    this.isSubmitted = false;
    this.teamForm.reset();
    // remove self from modal service
    this.modalService.remove(this);

    // remove modal element from html
    this.event.emit('complete');
    console.log("entered");
    this.element.remove();
  }

  open() {
    this.members?.setValue("");
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
    this.isOpen = true;
  }

  close() {
    this.event.emit();
    this.isSubmitted = false;
    this.teamForm.reset();
    this.addedMembers = [];
    this.memberList = this.originalMembersList;

    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
    this.isOpen = false;
  }

  changeMember(e: any) {
    const member = this.memberList.find(element => element.id == e.target.value) as FullUserDto;
    this.addedMembers.push(member);
    this.memberList = this.memberList.filter((element: any) => element.id != e.target.value);
    this.members?.setValue("");
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
        this.originalMembersList = memberList;
      }
    )
  }

  removeMember(member: FullUserDto) {
    this.memberList.push(member);
    this.addedMembers = this.addedMembers.filter((element: any) => element.id != member.id);
  }

  onSubmit(): void {
    const membersToAdd: { id: number; profile: ProfileDto; admin: boolean; active: boolean; status: string; }[] = [];
    this.addedMembers.forEach((member) => {
      const {teams: _, companies: __, ...newObj} = member;
      membersToAdd.push(newObj);
    })
    console.log("addedMembers: ", membersToAdd);
    this.members?.setValue(JSON.stringify(membersToAdd));
    // console.log(this.members);
    this.isSubmitted = true;
    if(!this.teamForm.valid) {
      false;
    } else {
      this.userService.createTeam(this.teamForm.value).subscribe(
        (team: TeamDto) => {
          console.log(team);
          this.close();
        },
        (error: any) => {
          console.error('Error retrieving team data:', error);
          this.close();
        }
      )
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
