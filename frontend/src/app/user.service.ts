import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import TeamDto from './interface-models/TeamDto';


export interface CredentialsDto {
  username: string;
  password: string;
}

export interface ProfileDto {
  firstname: string,
  lastname: string,
  email: string,
  phone: string
}

export interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  isAdmin: boolean;
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

const userUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  credentials!: CredentialsDto;
  profile: ProfileDto | undefined;
  userRequest: UserRequestDto | undefined;
  basicUser: BasicUserDto | undefined;
  fullUser: FullUserDto | undefined;

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
  
  async getAllUsers() {
    let data = await fetch(userUrl).then(response => response.json());
    console.log(data);
    return data;
  }
}

