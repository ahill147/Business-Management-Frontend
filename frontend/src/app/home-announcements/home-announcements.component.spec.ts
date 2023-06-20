import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAnnouncementsComponent } from './home-announcements.component';

describe('HomeAnnouncementsComponent', () => {
  let component: HomeAnnouncementsComponent;
  let fixture: ComponentFixture<HomeAnnouncementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAnnouncementsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
