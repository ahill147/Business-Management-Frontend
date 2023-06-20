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

interface AnnouncementRequestDto{

  credentials: CredentialsDto,
  title: string,
  message: string,
  companyId: number //may need to change this 
}


@Component({
  selector: 'app-home-announcements',
  templateUrl: './home-announcements.component.html',
  styleUrls: ['./home-announcements.component.css']
})
export class HomeAnnouncementsComponent implements OnInit {

  allAnnouncements : AnnouncementDto[] = [];
  // announcementToPost : AnnouncementDto | undefined
  currentUser : FullUserDto | undefined

  constructor(private userService : UserService, private http: HttpClient, private announcementService : AnnouncementService){}

  ngOnInit(): void {
    const companyId = this.userService.currentCompany.id //get the id programatically here
    this.getAllAnnouncements(companyId);
    this.currentUser = this.userService.getUser();
    
    const announcement = this.announcementService.getAnnouncementToPost();
    if (announcement) {
      this.allAnnouncements.push(announcement);
    }

    }
  

  getAllAnnouncements(companyId: number): void {
    this.http.post<AnnouncementDto[]>('http://localhost:8080/company/' + companyId + '/announcements', {})
      .subscribe({
        next: (announcements: AnnouncementDto[]) => {
          this.allAnnouncements = announcements;
        },
        error: (error) => {
          // Handle error
        }
      });
  }

  


}
