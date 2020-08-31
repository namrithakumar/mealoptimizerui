import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MealOptionsComponent } from './meal-options/meal-options.component';
import { DeliveryDateSelectorComponent } from '../delivery-date-selector/delivery-date-selector.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  mealList = new Array<String>(4);
  
  @Output() getMealPlan = new EventEmitter< { mealList : Array<String> } >();

  getSelectedMeal(mealSelected : { itemPosition :number, itemName : String }) {
    this.mealList[mealSelected.itemPosition] = mealSelected.itemName;
  }
  constructor() { }

  ngOnInit(): void {
  }

  onGetMealPlan() {
    this.getMealPlan.emit({ mealList : this.mealList });
  }
}