import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  baseUrl = 'https://localhost:5001/api/'
  
  constructor(private http: HttpClient) { }


  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model);
  } 
}
