import { Component } from '@angular/core';
import { BasicUserDto, UserService } from '../user.service';
import TeamDto from '../interface-models/TeamDto';
import { ModalService } from '../modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent {

  teams: TeamDto[] = [];

  constructor(public userService: UserService, protected modalService: ModalService, private router: Router) {}

  ngOnInit(): void {
    this.populateTeams();
  }

  populateTeams() {
    this.userService.getAllTeams().subscribe(
      (teams: TeamDto[]) => {
        this.teams = teams;
        console.log(teams);
      },
      (error: any) => {
        console.error('Error retrieving team data:', error);
      }
    )
  }

  onTeamSelection(team: TeamDto) {
    this.userService.team = team;
    console.log('selection pushed');
    this.router.navigate(['/projects']);
  }

  openModal(id: string) {
    this.modalService.open(id);
}
}
