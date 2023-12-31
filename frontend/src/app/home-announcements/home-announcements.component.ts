import { Component, OnInit } from '@angular/core';
import { UserService, BasicUserDto, CredentialsDto, FullUserDto } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AnnouncementService } from '../announcement.service';
import { Observable } from 'rxjs';
import { CreateAnnouncementComponent } from '../create-announcement/create-announcement.component';
import { MatDialog } from '@angular/material/dialog';


export interface AnnouncementDto {
  id: number,
  date: string,
  title: string,
  message: string,
  author: BasicUserDto
}


@Component({
  selector: 'app-home-announcements',
  templateUrl: './home-announcements.component.html',
  styleUrls: ['./home-announcements.component.css']
})
export class HomeAnnouncementsComponent implements OnInit {

  allAnnouncements: AnnouncementDto[] = [];
  currentUser: FullUserDto | undefined

  constructor(private userService: UserService, private http: HttpClient, private announcementService: AnnouncementService, private dialog: MatDialog) { }

  ngOnInit(): void {

    this.currentUser = this.userService.getUser();

    //need to get announcements for each of the company ids and add them to our allAnnouncements array
    if (this.currentUser?.companies) {
      this.currentUser.companies.forEach((company: any) => {
        this.getAllAnnouncements(company.id)
          .subscribe({
            next: (announcements: AnnouncementDto[]) => {
              console.log("Announcement" + announcements);
              this.allAnnouncements = this.allAnnouncements.concat(announcements);
              this.sortAnnouncementsByDate(); // Sort the announcements after adding them
              console.log("ALL ANNOUNCEMENTS BEFORE NEW", this.allAnnouncements);
            },
            error: (error) => {
              // Handle error
            }
          });
      });
    }

  }


  getAllAnnouncements(companyId: number): Observable<AnnouncementDto[]> {
    return this.http.get<AnnouncementDto[]>('http://localhost:8080/company/' + companyId + '/announcements');
  }

  openCreateAnnouncementDialog(): void {
    const dialogRef = this.dialog.open(CreateAnnouncementComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      // Handle any result or action after the dialog is closed
      if (result) {
        // console.log("RESULT FROM DIALOG (ANNOUNCEMENT)" + result)
        this.allAnnouncements.unshift(result); // Add the new announcement at the beginning
        this.allAnnouncements = [...this.allAnnouncements]; // Update the reference of the array to trigger change detection and update the view
        this.sortAnnouncementsByDate(); // Sort the announcements
        this.getAllAnnouncementsForCurrentUser(); // Fetch the updated list of announcements
        // console.log("ALL ANNOUNCEMENTS AFTER NEW" + this.allAnnouncements)
      }
    });
  }

  sortAnnouncementsByDate() {

    this.currentUser = this.userService.getUser();

    //need to get announcements for each of the company ids and add them to our allAnnouncements array

    this.allAnnouncements.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  getAllAnnouncementsForCurrentUser() {
    this.allAnnouncements = []; // Clear the existing announcements
  
    if (this.currentUser?.companies) {
      this.currentUser.companies.forEach((company: any) => {
        this.getAllAnnouncements(company.id)
          .subscribe({
            next: (announcements: AnnouncementDto[]) => {
              this.allAnnouncements = this.allAnnouncements.concat(announcements);
              this.sortAnnouncementsByDate(); // Sort the announcements by date
            },
            error: (error) => {
              // Handle error
            }
          });
      });
    
    }
  }
}
