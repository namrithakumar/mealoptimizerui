import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Meal } from 'src/app/shared/model/order-response.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { OptimizationStatus } from '../../../../shared/services/optimization-status.enum';
import { OptimizedMealPlans } from '../../store/reducers/order.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
/*
 * This component has 3 sections (tabs):
 * OrderInfo : Displays the user inputs
 * Optimized by Cost : Displays Item name, portion and cost for meal plan optimized by Cost
 * Optimized by Quality : Displays Item name, portion and cost for meal plan optimized by Quality
 * 
 * Tasks:
 * (1) Setup structure of the tabs
 * (2) Pass item info to the tabs optimized by Cost and optimized by Quality when response is received from backend (optimizedMealPlans.status = RESPONSE RECEIVED).
 *     Technique used: attribute binding
 * (3) Update User Preferences with the name of the ta selected - this value is stored as optimizationTypeSelected.
 * (4) Disable tabs if the optimizationState != DISTINCT | OPTIMAL | FEASIBLE
 */
export class OptimizedResultsTableComponent implements OnInit, OnDestroy {

  costOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String } = { mealList : new Array<Meal>(), planCost: 0, optimizationType : 'COST' };
  
  qualityOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String } = { mealList : new Array<Meal>(), planCost: 0, optimizationType : 'QUALITY' };

  optimizationStatus : OptimizationStatus;

  optimizationStatusValues = OptimizationStatus;
  
  optimizationState : String;

  constructor(private store : Store<AppState>, private optimizationService : OptimizationService) { }

  ngOnInit(): void {
    
    this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {

      this.optimizationStatus = optimizedMealPlans.status;
      
      /*
       * Once meal plan is received from the backend, parse it into a suitable format 
       * and bind it to the individual tabs using attribute binding.
       */
      if(optimizedMealPlans.status === OptimizationStatus.RESPONSE_RECEIVED && !optimizedMealPlans.error) {
        this.costOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('COST', optimizedMealPlans);
        this.qualityOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('QUALITY', optimizedMealPlans);
        this.optimizationState = optimizedMealPlans.optimizedMealPlans.optimizationState;
      }      
    });

  }

  /*
   * Once a tab is selected, update user preferences (stored as optimizationTypeSelected)
   */
  onTabSelected(tabSelected : String) {
    this.store.dispatch(new UserPreferencesActions.OptimizationTypeSelected(tabSelected));
  }

  ngOnDestroy() : void {}
}