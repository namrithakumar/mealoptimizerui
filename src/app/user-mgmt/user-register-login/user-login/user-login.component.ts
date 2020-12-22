import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserMgmtActions from '../../store/actions/user-mgmt.actions';
import { AuthenticatedUser } from '../../store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  error : String;
  isLoading : boolean;

  constructor(private store : Store<AppState>, private router : Router) { }

  ngOnInit(): void { }

  onLogin() : void {
    this.store.dispatch(new UserMgmtActions.LoginStart( { username : this.loginForm.value.username, password : this.loginForm.value.password} ));
    this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
      if(authenticatedUser.user && !authenticatedUser.error) {
        this.isLoading = true;
        this.router.navigate(['/meal-planner','meal-optimizer'], { queryParams: {mode: 'create'} });
      }
      else if (!authenticatedUser.user && authenticatedUser.error) {
        this.isLoading = false;
        this.error = authenticatedUser.error;
      }
    });
  }

  logout() : void {
    this.store.dispatch(new UserMgmtActions.Logout());
    this.router.navigate(['/app-info','home']);
  }

  switchToRegister() {
    this.router.navigate(['/user-mgmt','register']);
  }
}