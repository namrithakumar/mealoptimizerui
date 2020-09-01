import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit {

  @Input() indexOfMeal : number;

  @Output() mealSelected = new EventEmitter< { itemPosition : number, itemName : String } >();

  itemList : String[] = ['Green Salad','Ice cream','Strawberry Milkshake','Garlic Bread'];

  itemSelected : String;
  
  constructor() { }

  ngOnInit(): void {
  }

  onMealSelected() : void {
    this.mealSelected.emit({ itemPosition : this.indexOfMeal, itemName : this.itemSelected });
  }

}
