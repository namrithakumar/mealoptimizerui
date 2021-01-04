import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { OrderService } from 'src/app/shared/services/order.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/model/user.model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { UserPreferences } from '../../store/reducers/user-preferences.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import * as OrderActions from '../../store/actions/order.actions';
import { OptimizedMealPlans } from '../../store/reducers/order.reducer';
import { OrderResponse } from 'src/app/shared/model/order-response.model';

@Component({
  selector: 'app-manage-meal-plan',
  templateUrl: './manage-meal-plan.component.html',
  styleUrls: ['./manage-meal-plan.component.css']
})
export class ManageMealPlanComponent implements OnInit, OnDestroy {

  disableGetMealPlan : boolean = false;

  savedMealPlans : OrderResponse;
  
  userPrefs : UserPreferences;

  authenticatedUser : User;

  mode : String;

  orderRequest : any;

  constructor(private store : Store<AppState>, private router : Router, private route:ActivatedRoute, private userService : UserService, private optimizationService : OptimizationService, private orderService : OrderService) { }

  ngOnInit(): void {
        // Get value of mode (create or edit)
        this.route.queryParams.subscribe((queryParams : String) => {
          this.mode = queryParams['optimizermode'];
        });

        this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
          this.userPrefs = userPrefs;
        });

        this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
          this.authenticatedUser = authenticatedUser.user;
        });

        //Switch to 'update' mode if there is no error and optimization result state is DISTINCT OR OPTIMAL OR FEASIBLE
        this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {
          if(!optimizedMealPlans.error && (optimizedMealPlans.optimizedMealPlans && (optimizedMealPlans.optimizedMealPlans.optimizationState === "DISTINCT" || optimizedMealPlans.optimizedMealPlans.optimizationState === "OPTIMAL" || optimizedMealPlans.optimizedMealPlans.optimizationState === "FEASIBLE"))) {
            this.savedMealPlans = optimizedMealPlans.optimizedMealPlans;
            this.router.navigate([],{
              relativeTo : this.route,
              queryParams : { optimizermode: 'update' }
            });
            this.disableGetMealPlan = false;
          }
          else { 
            this.savedMealPlans = null;}
        });
  }

  onGetMealPlan() {
    if(this.userPrefs.deliveryDate !== null && this.userPrefs.dietType !==null && this.userPrefs.mealSelected.length === 4) {
      //If all inputs are received, create the order
      this.orderRequest = this.orderService.createOrderRequest(this.userPrefs.deliveryDate, this.userPrefs.mealSelected, this.authenticatedUser);    
      //Call backend to get a meal plan
      this.store.dispatch(new OrderActions.CreateOrderStart(this.orderRequest));
      this.disableGetMealPlan = true;
    }
    else alert('One of the required inputs is missing');
  }

  onUpdateMealPlan() {
    /* We do not check if this.savedMealPlans !=null since this point is reached 
     * only if the order has been saved atleast once, 
     * if the order has never been saved, the optimizer is in create mode. 
     */
    
    if(this.userPrefs.deliveryDate !== null && this.userPrefs.dietType !==null && this.userPrefs.mealSelected.length === 4)
      console.log('Order ID to be updated ' + this.savedMealPlans.orderId);
  }

  ngOnDestroy() : void {}
}