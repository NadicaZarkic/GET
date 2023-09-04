import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {};
  roleId: number = 0;

  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) {}


    ngOnInit(): void {

      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: user =>{
          if(user){
            this.roleId = user.roleId;
          }
        }
      });
    }

    login() {
      this.accountService.login(this.model).subscribe({
        next: _ => {
          this.accountService.currentUser$.pipe(take(1)).subscribe({
            next: user =>{
              if(user){
                this.roleId = user.roleId;
              }
            }
           
          });
          this.router.navigateByUrl('/allFlight')
          
      }
      })
    }

    logout() {
      this.accountService.logout();
      this.router.navigateByUrl('/');
    }
  
}
