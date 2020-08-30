import { Component, OnInit } from '@angular/core';
import { MealOptionsComponent } from './meal-options/meal-options.component';
import { DeliveryDateSelectorComponent } from '../delivery-date-selector/delivery-date-selector.component';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  mealList : MealOptionsComponent[] = [new MealOptionsComponent(), new MealOptionsComponent(), new MealOptionsComponent(), new MealOptionsComponent()];
  
  constructor() { }

  ngOnInit(): void {
  }

}
