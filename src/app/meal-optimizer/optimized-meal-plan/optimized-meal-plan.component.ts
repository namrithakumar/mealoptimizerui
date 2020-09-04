import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  }

  //  Action rfers to place Order/getRecipe
  onSelect( action : String ) {
      this.orderService.onActionSelected.emit(action);
  }
}