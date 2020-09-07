import { Component, OnInit } from '@angular/core';
import { Meal } from '../../../shared/meal.model';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { UserInputService } from 'src/app/shared/services/user-input.service';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
export class OptimizedResultsTableComponent implements OnInit {

  mealListByCost : Array<Meal> = this.optimizationService.mealListByCost;
  mealListByQuality : Array<Meal> = this.optimizationService.mealListByQuality;

  constructor(private optimizationService : OptimizationService, private userInputService : UserInputService) { }

  ngOnInit(): void {
  }

  onTabSelected(tabSelected : String) {
    this.userInputService.setTabSelected(tabSelected);
  }

}