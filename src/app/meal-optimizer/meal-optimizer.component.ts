import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../shared/services/order.service';

//This component handles routing
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  mealList = new Array<String>(4);
  dietTypeSelected : String;

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

  featureSelected( feature :String ) : void {
    this.onFeatureSelected.emit(feature);
  }
}