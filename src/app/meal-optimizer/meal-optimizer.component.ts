import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor(private orderService : OrderService) { 
    this.orderService.getMealPlan.subscribe(
      (mealList : Array<String>) => {
        console.log('List of meals received as input for optimization' + mealList[0] + mealList[1] + mealList[2] + mealList[3]);
        mealList.forEach(meal => console.log(meal));
      }
    );
  }

  ngOnInit(): void {
  }
}