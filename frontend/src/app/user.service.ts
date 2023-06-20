import { Injectable } from '@angular/core';

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

  constructor() { }
}
