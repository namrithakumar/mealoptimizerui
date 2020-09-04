import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Meal } from '../../../shared/meal.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
export class OptimizedResultsTableComponent implements OnInit {

  mealListByCost : Array<Meal> = this.optimizationService.mealListByCost;
  mealListByQuality : Array<Meal> = this.optimizationService.mealListByQuality;

  constructor(private optimizationService : OptimizationService) { }

  ngOnInit(): void {
  }

  onTabSelected(tabSelected : String) {
    console.log('Inside optimized-results-table ' + tabSelected);
  }

}
