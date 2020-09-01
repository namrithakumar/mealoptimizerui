import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  dateOfDelivery : Date;
  mealList = new Array<String>(4);
  dietTypeSelected : String;

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor() { }

  ngOnInit(): void {
  }

  getSelectedDietType(userDietTypeSelected : { dietType : String }) : void {
    this.dietTypeSelected = userDietTypeSelected.dietType;
  }

  getSelectedDateOfDelivery(dateOfDeliverySelected : { dateOfDelivery : Date }) : void {
    this.dateOfDelivery = dateOfDeliverySelected.dateOfDelivery;
  }

  getMealPlan(mealsSelected: { mealList : Array<String> }) : void {
    this.mealList = mealsSelected.mealList;
  }

  featureSelected( feature :String ) : void {
    this.onFeatureSelected.emit(feature);
  }
}