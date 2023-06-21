import { Component, OnInit } from '@angular/core';
import { AnnouncementDto } from '../home-announcements/home-announcements.component';
import { UserService, BasicUserDto, CredentialsDto } from '../user.service';
import { FormsModule } from '@angular/forms';
import { AnnouncementService } from '../announcement.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';


interface AnnouncementRequestDto {
  credentials: CredentialsDto,
  title: string,
  message: string,
  companyId: number
}

@Component({
  selector: 'app-create-announcement',
  templateUrl: './create-announcement.component.html',
  styleUrls: ['./create-announcement.component.css']
})
export class CreateAnnouncementComponent implements OnInit {

  announcementMessage: string = ""
  announcementTitle: string = ""

 
  ngOnInit(): void {
  }
  constructor(private userService: UserService, private announcementService: AnnouncementService, private http: HttpClient, private router: Router, private dialogRef: MatDialogRef<CreateAnnouncementComponent>) { }

  onSubmit() {
    //need to post to the API
    //this will return an announcementDTO that we will store in the service, but may not need to
    //should just update the data base with new announcement which will load on init

    const companyId : number = this.userService.currentCompany.id; //need to save the current company that the user is logged in as in the userService

    if(this.userService.basicUser){ //if the user is not undefined
      const currentUser : BasicUserDto = this.userService.basicUser
      
      this.postAnnouncement(currentUser, companyId) 
    }
    this.closeDialog();
    // this.router.navigate(['/announcements'])

  }


  postAnnouncement(user: BasicUserDto, companyId: number){

  const announcementToPost: AnnouncementRequestDto = { //need to create the request dto based on values from the user and the message they posted
      credentials: this.userService.credentials,
      title: this.announcementTitle,
      message: this.announcementMessage,
      companyId: this.userService.currentCompany.id
    };
   
    this.http.post<AnnouncementDto>('http://localhost:8080/announcements/' + companyId, announcementToPost)
    .subscribe({
      next: (announcement: AnnouncementDto) => {
        this.announcementService.saveAnnouncement(announcement); //may not need to save the announcement in the service at all, but for now lets
        this.dialogRef.close(announcement); //pass the announcement argument as our result
      },
      error: (error) => {
        // Handle error
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
