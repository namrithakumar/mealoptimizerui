import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ItemService } from '../../../shared/services/item.service';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit {

  @Input() indexOfMeal : number; // Set inside meal-selector.html

  itemList : String[] = this.itemService.getItemsByCategory(this.orderService.dietType);

  itemSelected : String;
  
  constructor(private itemService:ItemService, private orderService:OrderService) { }

  ngOnInit(): void {
  }

  onMealSelected() : void {
    this.orderService.addMeal({'itemPosition': this.indexOfMeal, 'itemName': this.itemSelected});
    this.orderService.onMealSelect.emit(this.orderService.mealList);
  }

}
