import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DefaultMessages } from 'src/app/shared/default-messages';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserMgmtActions from '../../store/actions/user-mgmt.actions';
import { AuthenticatedUser } from '../../store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
/*
 * The user can perform 2 actions during login:
 * Login - On successful login, reroute to meal-optimizer homepage. On login error, display error
 * Switch to register - Reroute to registration page.
 */
export class UserLoginComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  //Authentication error when the user tries to login in.
  error : String;

  defaultText : String = DefaultMessages.login.get(HttpRequestStatus.NO_ACTION);
  
  isLoading : boolean;

  constructor(private store : Store<AppState>, 
              private router : Router) { }

  ngOnInit(): void { }

  onLogin() : void {

    this.store.dispatch(new UserMgmtActions.UpdateRequestStatus(HttpRequestStatus.REQUEST_SENT));
    this.store.dispatch(new UserMgmtActions.LoginStart( {
                                                          username : this.loginForm.value.username, 
                                                          password : this.loginForm.value.password} 
                                                      ));
 
    /*
     * If login is successful, route to meal-optimizer homepage. If there is an error display the error.
     */ 
    this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
    
      switch(authenticatedUser.requestStatus) {
        case HttpRequestStatus.NO_ACTION :         this.defaultText = DefaultMessages.login.get(HttpRequestStatus.NO_ACTION);
                                                   break;
        case HttpRequestStatus.REQUEST_SENT :      this.defaultText = DefaultMessages.login.get(HttpRequestStatus.REQUEST_SENT);
                                                   break;
        case HttpRequestStatus.RESPONSE_RECEIVED : this.defaultText = DefaultMessages.login.get(HttpRequestStatus.RESPONSE_RECEIVED);
                                                    //If user is truthy and error is not populated, reroute to meal-optimizer homepage
                                                    if(authenticatedUser.user && !authenticatedUser.error) {
                                                      this.isLoading = true;
                                                      this.router.navigate(['/meal-planner', { outlets: { mealoptimizer : ['meal-optimizer'] } }], { queryParams: {optimizermode: 'create'} });
                                                      }
                                                
                                                    //If user is falsy and error is populated, display the error
                                                    else if (!authenticatedUser.user && authenticatedUser.error) {
                                                      this.isLoading = false;
                                                      this.error = authenticatedUser.error;
                                                      } 
                                                    break;                                                                               
      }
    });
  }

  //If the user clicks 'Switch to register mode', reroute to registration page
  switchToRegister() {
    this.router.navigate(['/user-mgmt','register']);
  }
}