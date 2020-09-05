import { Component, OnInit, HostListener } from '@angular/core';
import { OrderService } from '../../shared/services/order.service';
import { DisplayService } from 'src/app/shared/services/display.service';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  disableGetMealPlan : boolean = true;
  
  dateOfDelivery : Date = (this.orderService.deliveryDate === undefined)?new Date():this.orderService.deliveryDate;

  setCollapseInd : boolean = false;

  getMealPlanInd : boolean = false;

  constructor(private orderService : OrderService, private displayService : DisplayService) { 
    this.orderService.onMealSelect.subscribe((mealList : String[]) => {
      this.disableGetMealPlan = (mealList.length === 4)?false:true;
    });
  }

  ngOnInit(): void {
  }

  onGetMealPlan() {
    this.setCollapseInd = true;
    this.getMealPlanInd = true;
    this.orderService.getMealPlan.emit(this.orderService.mealList);
  }

  @HostListener('mouseover') onMouseOver() {
    this.setCollapseInd = this.displayService.getCollapsibleIndMealSelector('mouseover' , this.orderService.mealList, this.getMealPlanInd);
}

  @HostListener('mouseout') onMouseOut() {
    this.setCollapseInd = this.displayService.getCollapsibleIndMealSelector('mouseout' , this.orderService.mealList, this.getMealPlanInd);
  }

  getMealList() : String[] {
    return this.orderService.mealList;
  }
}