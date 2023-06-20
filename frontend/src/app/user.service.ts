import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const userUrl = 'http://localhost:3000/placeholder';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  isWorker: boolean | undefined;
  isAdmin: boolean | undefined;
  company: string | undefined;

  constructor(private http: HttpClient) { }

  async getAllUsers() {
    let data = await this.http.get(userUrl);
    console.log(data);
    return data;
  }
}
