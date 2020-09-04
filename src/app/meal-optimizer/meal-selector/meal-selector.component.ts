import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  disableGetMealPlan : boolean = true;
  
  constructor(private orderService : OrderService) { 
    this.orderService.onMealSelect.subscribe((mealList : String[]) => {
      this.disableGetMealPlan = (mealList.length === 4)?false:true;
    });
  }

  ngOnInit(): void {
  }

  onGetMealPlan() {
    this.orderService.getMealPlan.emit(this.orderService.mealList);
  }
}