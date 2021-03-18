import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { KeycloakService } from 'keycloak-angular';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  authenticatedUser : User;

  constructor(private router:Router, 
              private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      this.authenticatedUser = authenticatedUser.user;
    });
  }

  //Displayed if user has not logged in
  goToLoginOrRegister() : void {
    this.router.navigate(['/meal-planner', { outlets: { mealoptimizer : ['meal-optimizer'] } }], { queryParams: {optimizermode: 'create'} });
  }

  //Displayed if user has not logged in
  continueAsGuest() : void {
    console.log('Code to be written to continue as unauthenticated guest'); 
  }

  //Displayed if user has logged in
  goToMealPlanner() : void {
    this.router.navigate(['/meal-planner', { outlets: { mealoptimizer : ['meal-optimizer'] } }], { queryParams: {optimizermode: 'create'} });
  }
}