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

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit, CanComponentDeactivate {

  constructor(private route: ActivatedRoute, private store : Store<AppState>) {
  }

  dietTypes : Array<IUserDietType>;

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.dietTypes = data['userDietTypes'];
    });
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