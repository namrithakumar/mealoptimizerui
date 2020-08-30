import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal.model';
import { Order } from '../order.model';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

  mealList : Meal[] = [new Meal("Green Salad", 1.0, 10.0) , new Meal('Icecream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic bread', 1.0,4.75)];
  
  order : Order = new Order( this.mealList, new Date("2020/08/31"), 26.33);
  constructor() { }

  ngOnInit(): void {
  }

  onPlaceOrder(event : Event) : void {
      console.log("plave order clicked - " + event);
  }

  onGetRecipe(event : Event) : void {
    console.log("get recipe clicked - " + event);
}

}
