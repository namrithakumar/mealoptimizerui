import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import { AuthorizationService } from '../../shared/services/authorization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticatedUser : User;

  constructor(private router:Router, 
              private store : Store<AppState>, 
              private authorizationService : AuthorizationService) { }

  ngOnInit(): void {
    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      this.authenticatedUser = authenticatedUser.user;
    });
  }

  goToLoginOrRegister() : void {
    //this.router.navigate(['/user-mgmt','login']);
    //If user is not logged in
    if(!this.authenticatedUser) {
      this.authorizationService.dispatchAuthorizationCodeRequest();
    }
  }

  goToMealPlanner() : void {
    this.router.navigate(['/meal-planner', { outlets: { mealoptimizer : ['meal-optimizer'] } }], { queryParams: {optimizermode: 'create'} });
  }
}