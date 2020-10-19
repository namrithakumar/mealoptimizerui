import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from 'src/app/shared/model/order/order-response.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { UserInputService } from 'src/app/shared/services/user-input.service';

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

  resultsPending : boolean = true;

  constructor(private optimizationService : OptimizationService, private userInputService : UserInputService) { }

  ngOnInit(): void {
    
    this.costOptimizationSub = this.optimizationService.onCostOptimizationComplete.subscribe((costOptimizedPlan) => {
      this.costOptimizedPlan = costOptimizedPlan;
      this.resultsPending = false;
    });

    this.qualityOptimizationSub = this.optimizationService.onQualityOptimizationComplete.subscribe((qualityOptimizedPlan) => {
      this.qualityOptimizedPlan = qualityOptimizedPlan;
      this.resultsPending = false;
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