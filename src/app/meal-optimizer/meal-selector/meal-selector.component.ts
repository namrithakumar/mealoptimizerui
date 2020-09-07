import { Component, OnInit, HostListener } from '@angular/core';
import { UserInputService } from '../../shared/services/user-input.service';
import { DisplayService } from 'src/app/shared/services/display.service';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  disableGetMealPlan : boolean = true;
  
  dateOfDelivery : Date = (this.userInputService.deliveryDate === undefined)?new Date():this.userInputService.deliveryDate;

  setCollapseInd : boolean = false;

  getMealPlanInd : boolean = false;

  constructor(private userInputService : UserInputService, private displayService : DisplayService) { 
    this.userInputService.onMealSelect.subscribe((mealList : String[]) => {
      this.disableGetMealPlan = (mealList.length === 4)?false:true;
    });
  }

  ngOnInit(): void {
  }

  onGetMealPlan() {
    this.setCollapseInd = true;
    this.getMealPlanInd = true;
    this.userInputService.getMealPlan.emit(this.userInputService.mealList);
  }

  @HostListener('mouseover') onMouseOver() {
    this.setCollapseInd = this.displayService.getCollapsibleIndMealSelector('mouseover' , this.userInputService.mealList, this.getMealPlanInd);
}

  @HostListener('mouseout') onMouseOut() {
    this.setCollapseInd = this.displayService.getCollapsibleIndMealSelector('mouseout' , this.userInputService.mealList, this.getMealPlanInd);
  }

  getMealList() : String[] {
    return this.userInputService.mealList;
  }
}