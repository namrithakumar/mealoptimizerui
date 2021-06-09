import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { OrderService } from 'src/app/shared/services/order.service';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../../store/reducers/user-preferences.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import { OptimizedMealPlans } from '../../store/reducers/order.reducer';
import { OrderResponse } from 'src/app/shared/model/order-response.model';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { OptimizationMode } from 'src/app/shared/optimization-mode.enum';
import { UserDisplayPreferences } from 'src/app/user-mgmt/store/reducers/user-display-preferences.reducer';

import * as OrderActions from '../../store/actions/order.actions';
import * as UserDisplayPreferencesActions from '../../../../user-mgmt/store/actions/user-display-preferences.actions';
import * as RecipeActions from '../../../recipes/store/actions/recipes.actions';

@Component({
  selector: 'app-manage-meal-plan',
  templateUrl: './manage-meal-plan.component.html',
  styleUrls: ['./manage-meal-plan.component.css']
})
/* This component performs 3 actions
 * Get mode from the url : This decide whether the backend call must be a CREATE (POST) or an UPDATE (PUT)
 * Get values of user prefs and authenticated user from the store and create the meal plan request
 * Call backend by dispatching the action CREATE_ORDER_START
 */
export class ManageMealPlanComponent implements OnInit, OnDestroy {

  /* Enable or disable the 'Get Meal Plan' button based 2 conditions. Enable button if:
   * User inputs are valid and
   * The meals selected do not satisfy daily nutrition requirements - allow the user to edit meals selected
   * Initially disableGetMealPlan is set to true (because user inputs are invalid at this point)
   */
  disableGetOrUpdateMealPlan : boolean = true;

  //This value is truthy if a valid meal plan is generated atleast once. 
  //We need the ID of the generated meal plan for further updates.
  savedMealPlans : OrderResponse;
  
  //Read the user inputs from store to generate a meal plan request
  userPrefs : UserPreferences;

  //Read the authenticatedUser info from store to include user ID in the meal plan request
  authenticatedUser : User;

  //Mode toggles between get and update to either generate meal plan for the first time 
  //or to update an existing meal plan.
  mode : String;

  constructor(private store : Store<AppState>, 
              private orderService : OrderService) { }

  ngOnInit(): void {
        // Get value of mode (create or edit)
        this.store.select('userDisplayPreferences').subscribe((userDisplayPreferences : UserDisplayPreferences) => {
          this.mode = userDisplayPreferences.optimizationMode;
        });

        this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
          this.userPrefs = userPrefs;
          //Enable get meal plan when 4 meals are selected.
          this.disableGetOrUpdateMealPlan = (userPrefs.mealSelected.filter(
                                                            (meal) => meal !== undefined ).length) !== 4;
          });

        this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
          this.authenticatedUser = authenticatedUser.user;
        });
        
        this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {
          
          //Response received from backend. The user can choose to edit meals selected, so enable get meal plan.
          if(optimizedMealPlans.requestStatus === HttpRequestStatus.RESPONSE_RECEIVED) {
            this.disableGetOrUpdateMealPlan = false;

            //Switch to 'update' mode if there is no error and optimization result state is DISTINCT OR OPTIMAL OR FEASIBLE
            if(!optimizedMealPlans.error && 
              (optimizedMealPlans.mealPlans && 
                (optimizedMealPlans.mealPlans.optimizationState === "DISTINCT" || optimizedMealPlans.mealPlans.optimizationState === "OPTIMAL" || optimizedMealPlans.mealPlans.optimizationState === "FEASIBLE"))) {
                  this.savedMealPlans = optimizedMealPlans.mealPlans;
                  this.store.dispatch(new UserDisplayPreferencesActions.UpdateOptimizationMode(OptimizationMode.UPDATE));
            }
            else { 
              this.savedMealPlans = null;
            }
          }
          
        });
  }

  onGetMealPlan() {
    //Clear existing meal plans
    this.store.dispatch(new OrderActions.ClearOrder());
    if(this.orderService.verifyAllInputsAreReceived()) {
      //If all inputs are received, create the order
      let orderRequest = this.orderService.createOrderRequest(this.userPrefs.deliveryDate, this.userPrefs.mealSelected, this.authenticatedUser);    
      this.fetchMealPlan(orderRequest);
    }
    else alert('One of the required inputs is missing');
  }

  onUpdateMealPlan() {
    /* We do not check if this.savedMealPlans !=null since this point is reached 
     * only if the order has been saved atleast once, 
     * if the order has never been saved, the optimizer is in create mode. 
     */  
    //Hide recipes section
    this.store.dispatch(new UserDisplayPreferencesActions.HideRecipes());
    this.store.dispatch(new RecipeActions.ClearRecipes());
    //Clear existing meal plans
    this.store.dispatch(new OrderActions.ClearOrder());
    if(this.orderService.verifyAllInputsAreReceived()) {
      //If all inputs are received, create the order
      let orderRequest = this.orderService.createOrderRequest(this.userPrefs.deliveryDate, this.userPrefs.mealSelected, this.authenticatedUser, this.savedMealPlans.orderId);    
      this.fetchMealPlan(orderRequest);
      }
    else alert('One of the required inputs is missing');
    }

  private fetchMealPlan(orderRequest) : void {
      //Call backend to get a meal plan
      this.store.dispatch(new OrderActions.UpdateRequestStatus(HttpRequestStatus.REQUEST_SENT));
      this.store.dispatch(new OrderActions.SaveOrderStart(orderRequest));
      this.disableGetOrUpdateMealPlan = true;
  }

  ngOnDestroy() : void {}
}