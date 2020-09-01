import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Meal } from '../../../meal-optimizer/meal.model';

@Component({
  selector: 'app-optimized-results-table',
  templateUrl: './optimized-results-table.component.html',
  styleUrls: ['./optimized-results-table.component.css']
})
export class OptimizedResultsTableComponent implements OnInit {

  @ViewChild("tabTitle", { static: true }) public tabTitle : ElementRef;

  mealListByCost : Meal[] = [new Meal("Green Salad", 1.0, 10.0) , new Meal('Icecream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic bread', 1.0,4.75)];

  mealListByQuality : Meal[] = [new Meal("Green Salad", 1.0, 10.0) , new Meal('Icecream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic bread', 1.0,4.75)];

  constructor() { }

  ngOnInit(): void {
  }

  onTabSelected(tabSelected : String) {
    console.log('Inside optimized-results-table ' + tabSelected);
  }

}
