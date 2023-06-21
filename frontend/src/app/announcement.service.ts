import { Injectable } from '@angular/core';
import { AnnouncementDto } from './home-announcements/home-announcements.component';
import { BasicUserDto } from './user.service';

@Injectable({
  providedIn: 'root'
})



export class AnnouncementService {

  author: BasicUserDto = { //initialize with default values
    id: 0,
    profile: {
      firstname: '',
      lastname: '',
      email: '',
      phone: ''
    },
    admin: false,
    active: false,
    status: ''
  };

  announcementToPost: AnnouncementDto = { //initialize with default values
    id: 0,
    date: '',
    title: '',
    message: '',
    author: this.author
  };

  constructor() { }

  getAnnouncementToPost(){
    return this.announcementToPost;
  }

  saveAnnouncement(announcement: AnnouncementDto){
    this.announcementToPost = announcement;
  }
}
