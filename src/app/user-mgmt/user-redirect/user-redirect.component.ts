import { Component, OnInit } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';

import { AuthenticationResponseHandler } from '../../shared/services/response-handler/authentication-response-handler';
import { User } from 'src/app/shared/model/user.model';
import { UserService } from 'src/app/shared/services/user.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-redirect',
  templateUrl: './user-redirect.component.html',
  styleUrls: ['./user-redirect.component.css']
})
export class UserRedirectComponent implements OnInit {

  authenticatedUser : User;

  constructor( 
    private authenticationResponseHandler : AuthenticationResponseHandler,
    private userService : UserService,
    private store : Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
        //This page is loaded only when user authentication on Keycloak is successful. Hence log the username + token
        this.userService.parseAuthenticatedUserDetails()
        .then((authenticatedUser) => this.authenticationResponseHandler.handleSuccess(authenticatedUser))
        .catch((error) => this.authenticationResponseHandler.handleFailure(error));
  
        this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
          this.authenticatedUser = authenticatedUser.user;
        });
        
        setTimeout(()=>{
          this.router.navigateByUrl('/meal-planner/(mealoptimizer:meal-optimizer)?optimizermode=create');
        },3000);
  }
}