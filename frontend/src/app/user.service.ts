import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import TeamDto from './interface-models/TeamDto';
import ProjectDto from './interface-models/ProjectDto';

export interface CredentialsDto {
  username: string;
  password: string;
}

export interface ProfileDto {
  firstName: string,
  lastName: string,
  email: string,
  phone: string
}

export interface UserCreateDto {
  credentials: CredentialsDto;
  user: UserRequestDto;
}

export interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  admin: boolean;
}

export interface BasicUserDto{
  id: number,
  profile: ProfileDto,
  admin: boolean,
  active: boolean,
  status: string
}

export interface FullUserDto {
    id: number,
    profile: ProfileDto,
    admin: boolean,
    active: boolean,
    status: string,
    companies: CompanyDto[],
    teams: TeamDto[]
}

export interface CompanyDto {
  id: number,
  name: string,
  description: string,
  teams: TeamDto[],
  users: BasicUserDto[]
}

@Injectable({
  providedIn: 'root'
})

export class UserService {

  credentials!: CredentialsDto;
  profile: ProfileDto | undefined;
  userRequest: UserRequestDto | undefined;
  basicUser: BasicUserDto | undefined;
  fullUser: FullUserDto | undefined;
  team: TeamDto | undefined;

  currentCompany!: CompanyDto; 

  constructor(private http: HttpClient) { }

  login(username: string, password: string){
    const credentialsDto = {
      username,
      password
    }
    return this.http.post<FullUserDto>('http://localhost:8080/users/login', credentialsDto)
    .pipe(
      tap((fullUser) => {
        this.fullUser = fullUser; //saving our user in this service class
        this.credentials = { //set our credentials
          username,
          password
        }
        console.log(this.fullUser)

        this.basicUser = {
          id: fullUser.id,
          profile: fullUser.profile,
          admin: fullUser.admin,
          active: fullUser.active,
          status: fullUser.status
        };

        console.log(this.basicUser)
      })
    )
    //should return a FullUserDto
  }

  getUser() : FullUserDto | undefined {
    return this.fullUser
  }

    getBasicUser() : BasicUserDto | undefined {
    return this.basicUser
  }
  
  getAllUsers(): Observable<FullUserDto[]>{
    // const companyId = this.currentCompany.id;
    // return this.http.get<FullUserDto[]>(`http://localhost:8080/company/${companyId}/users`);
    return this.http.get<FullUserDto[]>(`http://localhost:8080/company/6/users`)
  }

  createUser(user: any): Observable<FullUserDto> {
    const userCredentials = {
      username: user.email,
      password: user.password
    }
    const userProfile = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: null
    }
    const userRequestDto = {
      credentials: userCredentials,
      profile: userProfile,
      admin: user.adminRole
    }
    const credentialsDto = {
      username: this.credentials.username,
      password: this.credentials.password
    }
    const userCreateDto = {
      credentials: credentialsDto,
      user: userRequestDto
    }
    console.log(userCreateDto);
    return this.http.post<FullUserDto>(`http://localhost:8080/users/${this.currentCompany.id}`, userCreateDto);
  }

  getAllTeams(): Observable<TeamDto[]> {
    // return this.http.get<TeamDto[]>(`http://localhost:8080/company/${this.currentCompany.id}/teams`);
    return this.http.get<TeamDto[]>(`http://localhost:8080/company/6/teams`);
  }

  getUserProjects() : ProjectDto[] | undefined {
    let userProjects: ProjectDto[] = [];
    console.log('getUserProject user:', this.fullUser)
    this.fullUser?.teams.forEach((team) => {
      team.projects.forEach((project) => userProjects.push(project))        
    });

    return userProjects;
  }
  
}