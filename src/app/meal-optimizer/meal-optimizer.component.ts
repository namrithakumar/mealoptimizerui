import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserDietService } from '../shared/services/user-diet.service';

@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  mealList = new Array<String>(4);
  dietTypeSelected : String;

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor() { }

  ngOnInit(): void {
  }

  getMealPlan(mealsSelected: { mealList : Array<String> }) : void {
    this.mealList = mealsSelected.mealList;
  }

  featureSelected( feature :String ) : void {
    this.onFeatureSelected.emit(feature);
  }
}