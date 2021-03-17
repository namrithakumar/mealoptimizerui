import { Component, OnInit } from '@angular/core';
import { CanComponentDeactivate } from '../../shared/services/can-exit-page.service';
import { Observable } from 'rxjs';
import { IUserDietType } from '../../shared/services/user-diet-type-resolver.service';
import { ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Action, Store } from '@ngrx/store';
import * as UserPreferencesActions from './store/actions/user-preferences.actions';
import * as MenuActions from './store/actions/menu.actions';
import * as OrderActions from './store/actions/order.actions';
import { KeycloakService } from 'keycloak-angular';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit, CanComponentDeactivate {

  constructor(private route: ActivatedRoute, 
              private store : Store<AppState>, 
              private keycloakService : KeycloakService) {
  }

  dietTypes : Array<IUserDietType>;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dietTypes = data['userDietTypes'];
    });

    //This page is loaded only when user authentication on Keycloak is successful. Hence log the username + token

    console.log('username ' + this.keycloakService.getUsername());
    console.log('isLoggedIn ' + this.keycloakService.isLoggedIn().then((loggedIn) => { console.log('Logged In : ' + loggedIn); }));
    console.log('token ' + this.keycloakService.getToken().then((token) => { console.log('Token : ' + token); }));
    console.log('user roles ' + JSON.stringify(this.keycloakService.getUserRoles()));
    console.log('user profile : ' + this.keycloakService.loadUserProfile().then((userProfile) => {
      console.log('user profile : ' + JSON.stringify(userProfile));
    }));
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if(confirm('You are navigating away from the page. Your inputs will be reset.')) {
      [new UserPreferencesActions.ClearUserPreferences(), 
        new MenuActions.ClearMenu(),
        new OrderActions.ClearOrder()].forEach((action : Action) => {
          this.store.dispatch(action);
        });
        return true;
    }
    else return false;
  }
}