import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/shared/model/order/order-response.model';
import { MealPlanService } from 'src/app/shared/services/http/meal-plan.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { OptimizationStatus } from '../../../shared/services/optimization-status.enum';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
export class OptimizedResultsTableComponent implements OnInit, OnDestroy {

  costOptimizedPlan : { mealListByCost : Meal[], planCost: number } = { mealListByCost : new Array<Meal>(), planCost: 0 };
  qualityOptimizedPlan : { mealListByQuality : Meal[], planCost: number } = { mealListByQuality : new Array<Meal>(), planCost: 0 };
  
  costOptimizationSub : Subscription;
  qualityOptimizationSub : Subscription;

  optimizationStatus : OptimizationStatus;

  optimizationStatusValues = OptimizationStatus;

  optimizationStatusChangeSubscription : Subscription;
  
  resultsPending = true;

  constructor(private optimizationService : OptimizationService, private userInputService : UserInputService) { }

  ngOnInit(): void {
    
    this.optimizationStatus = OptimizationStatus.NO_ACTION;

    this.optimizationStatusChangeSubscription = this.optimizationService.optimizationStatusChange.subscribe((optimizationStatus : OptimizationStatus) => {
      this.optimizationStatus = optimizationStatus;
    });

    this.costOptimizationSub = this.optimizationService.onCostOptimizationComplete.subscribe((costOptimizedPlan) => {
      this.optimizationStatus = OptimizationStatus.RESPONSE_RECEIVED;
      this.resultsPending = false;
      this.costOptimizedPlan = costOptimizedPlan;
    });

    this.qualityOptimizationSub = this.optimizationService.onQualityOptimizationComplete.subscribe((qualityOptimizedPlan) => {
      this.optimizationStatus = OptimizationStatus.RESPONSE_RECEIVED;
      this.qualityOptimizedPlan = qualityOptimizedPlan;
    });
  }

  onTabSelected(tabSelected : String) {
    this.userInputService.setOptimizationTypeSelected(tabSelected);
  }

  ngOnDestroy() : void {
    this.costOptimizationSub.unsubscribe();
    this.qualityOptimizationSub.unsubscribe();
  }
}