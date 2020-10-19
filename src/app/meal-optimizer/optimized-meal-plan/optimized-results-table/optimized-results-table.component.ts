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

  mealListByCost : Array<Meal>;
  mealListByQuality : Array<Meal>;
  
  costOptimizationSub : Subscription;
  qualityOptimizationSub : Subscription;

  constructor(private optimizationService : OptimizationService, private userInputService : UserInputService) { }

  ngOnInit(): void {
    
    this.costOptimizationSub = this.optimizationService.onCostOptimizationComplete.subscribe((costOptimizedPlan) => {
      this.mealListByCost = costOptimizedPlan.mealListByCost;
    });

    this.qualityOptimizationSub = this.optimizationService.onQualityOptimizationComplete.subscribe((qualityOptimizedPlan) => {
      this.mealListByQuality = qualityOptimizedPlan.mealListByQuality;
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