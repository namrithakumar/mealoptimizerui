import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../shared/services/item.service';
import { UserInputService } from '../../../shared/services/user-input.service';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit {

  @Input() indexOfMeal : number; // Set inside meal-selector.html

  itemList : String[] = this.itemService.getItemsByCategory(this.userInputService.dietType);

  itemSelected : String;
  
  constructor(private itemService:ItemService, private userInputService:UserInputService) { }

  ngOnInit(): void {
  }

  onMealSelected() : void {
    this.userInputService.addMeal({itemPosition: this.indexOfMeal, itemName: this.itemSelected});
    this.userInputService.onMealSelect.emit(this.userInputService.mealList);
  }

}