import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

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
