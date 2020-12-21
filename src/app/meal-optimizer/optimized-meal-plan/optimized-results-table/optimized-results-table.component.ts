import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Meal } from 'src/app/shared/model/order-response.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { OptimizationStatus } from '../../../shared/services/optimization-status.enum';
import { OptimizedMealPlans } from '../../store/reducers/order.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
export class OptimizedResultsTableComponent implements OnInit, OnDestroy {

  costOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String } = { mealList : new Array<Meal>(), planCost: 0, optimizationType : 'COST' };
  
  qualityOptimizedPlan : { mealList : Meal[], planCost: number, optimizationType : String } = { mealList : new Array<Meal>(), planCost: 0, optimizationType : 'QUALITY' };

  optimizationStatus : OptimizationStatus;

  optimizationStatusValues = OptimizationStatus;
  
  optimizationState : String;

  resultsPending = false;

  constructor(private store : Store<AppState>, private optimizationService : OptimizationService) { }

  ngOnInit(): void {
    
    this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {

      this.optimizationStatus = optimizedMealPlans.status;
      
      if(optimizedMealPlans.status === OptimizationStatus.RESPONSE_RECEIVED) {
        this.costOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('COST', optimizedMealPlans);
        this.qualityOptimizedPlan = this.optimizationService.getMealPlanByOptimizationType('QUALITY', optimizedMealPlans);
      }
    
      if(optimizedMealPlans.optimizedMealPlans)
      this.optimizationState = optimizedMealPlans.optimizedMealPlans.optimizationState;
    });

  }

  onTabSelected(tabSelected : String) {
    this.store.dispatch(new UserPreferencesActions.OptimizationTypeSelected(tabSelected));
  }

  ngOnDestroy() : void {}
}