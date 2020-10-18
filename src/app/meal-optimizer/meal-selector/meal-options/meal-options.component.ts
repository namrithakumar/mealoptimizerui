import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ItemService } from '../../../shared/services/http/item.service';
import { UserInputService } from '../../../shared/services/user-input.service';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit, OnDestroy {

  @Input() indexOfMeal : number; // Set inside meal-selector.html

  dietTypeSelected : Subscription = new Subscription();

  itemListSubscription : Subscription = new Subscription();

  itemList : String[]; 

  itemSelected : String;
  
  defaultText = "Please select meal";

  constructor(private itemService:ItemService, private userInputService:UserInputService) { }

  ngOnInit(): void {
    this.resetItemList();
    this.dietTypeSelected = this.userInputService.onDietTypeSelect.subscribe(dietType => {
      this.resetItemList();
      this.getItemsByDietType(dietType);
    });
  }

  getItemsByDietType(dietType : String) {
    this.itemListSubscription = this.itemService
        .getItemsByCategory(this.userInputService.userInput.dietType)
        .subscribe(items => {
          this.itemList = items;
          this.itemList.unshift(this.defaultText);
        });
  }

  onMealSelected() : void {
    this.userInputService.addMeal({itemPosition: this.indexOfMeal, itemName: this.itemSelected});
    this.userInputService.onMealSelect.next(this.userInputService.userInput.mealSelected);
  }

  resetItemList() {
    this.itemList = new Array<String>(1);
  }

  ngOnDestroy() : void {
    this.itemListSubscription.unsubscribe();
    this.dietTypeSelected.unsubscribe();
  }
}