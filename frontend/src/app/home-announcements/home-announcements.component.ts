import { Component, OnInit } from '@angular/core';
import { UserService, BasicUserDto, CredentialsDto, FullUserDto } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AnnouncementService } from '../announcement.service';

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

  constructor(private userService: UserService, private http: HttpClient, private announcementService: AnnouncementService) { }

  ngOnInit(): void {

    this.currentUser = this.userService.getUser();

    //need to get announcements for each of the company ids and add them to our allAnnouncements array
    if (this.currentUser?.companies) {
      this.currentUser.companies.forEach((company: any) => {
        this.getAllAnnouncements(company.id);
      });
    }

    //if the user posted a new announcement in create-announcement, it should be retrieved from the announcement service
    const newAnnouncement = this.announcementService.getAnnouncementToPost();
    if (newAnnouncement) {
      this.allAnnouncements.push(newAnnouncement);
    }
  }


  getAllAnnouncements(companyId: number): void {
    this.http.get<AnnouncementDto[]>('http://localhost:8080/company/' + companyId + '/announcements')
      .subscribe({
        next: (announcements: AnnouncementDto[]) => {
          this.allAnnouncements.concat(announcements); //adding all of the announcements to our announcements array
          console.log(this.allAnnouncements)

        },
        error: (error) => {
          // Handle error
        }
      });
  }

}
