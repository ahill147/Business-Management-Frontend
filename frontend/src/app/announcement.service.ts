import { Injectable } from '@angular/core';
import { AnnouncementDto } from './home-announcements/home-announcements.component';
import BasicUserDto from './interface-models/BasicUserDto';

@Injectable({
  providedIn: 'root'
})



export class AnnouncementService {

  author: BasicUserDto = { //initialize with default values
    id: 0,
    profile: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    isAdmin: false,
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
