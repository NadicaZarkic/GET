import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, map } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http'
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'https://localhost:5001/api/'
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http:HttpClient, private presence:PresenceService) { }

  
  login(model:any)
  {
    return this.http.post<User>(this.baseUrl+'account/login', model).pipe(
      map((response:User) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
          // if(user.roleId!=3)
          // this.presence.createHubConnection(user);
        }
      })
    )
  }

  register(model:any){
    return this.http.post<User>(this.baseUrl+'account/register', model).pipe(
      map((user:User) => {
        if(user) {
        this.setCurrentUser(user);
        // if(user.roleId!=3)
      //  this.presence.createHubConnection(user);
        }
      })
    );
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;


    Array.isArray(roles) ? user.roles = roles:user.roles.push(roles);

    if(user.roles[0]=='Admin')
    {
      user.roleId =3
    }
    else if(user.roles[0]=='Agent')
    {
      user.roleId=2
    }
    else
    {
      user.roleId=1
    }


   localStorage.setItem('user',JSON.stringify(user));


    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    //this.presence.stopHubConnection();
  }

  getDecodedToken(token:any)
  {
    return JSON.parse(atob(token.split('.')[1]));
  } 
}


