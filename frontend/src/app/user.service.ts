import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


interface CredentialsDto {
  username: string;
  password: string;
}

interface ProfileDto {
  firstname: string,
  lastname: string,
  email:string,
  phone: string
}

interface UserRequestDto {
  credentials: CredentialsDto;
  profile: ProfileDto;
  isAdmin: boolean;
}

interface BasicUserDto{
  id: number,
  profile: ProfileDto,
  isAdmin: boolean,
  active: boolean,
  status: string
}

interface FullUserDto {
    id: number,
    profile: ProfileDto,
    isAdmin: boolean,
    active: boolean,
    status: string,
    companies: [any],
    teams: [any]
}

const userUrl = 'http://localhost:3000/placeholder';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  credentials: CredentialsDto | undefined;
  profile: ProfileDto | undefined;
  userRequest: UserRequestDto | undefined;
  basicUser: BasicUserDto | undefined;
  fullUser: FullUserDto | undefined;

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
      })
    )
    //should return a FullUserDto
  }

  getUser() : FullUserDto | undefined {
    return this.fullUser
  }
  
  async getAllUsers() {
    let data = await this.http.get(userUrl);
    console.log(data);
    return data;
  }
}

