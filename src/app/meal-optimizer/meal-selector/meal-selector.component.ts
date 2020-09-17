import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { UserInputService } from '../../shared/services/user-input.service';
import { DisplayService } from 'src/app/shared/services/display.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageMealPlanComponent } from './manage-meal-plan/manage-meal-plan.component';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  @ViewChild(ManageMealPlanComponent) manageMealPlan : ManageMealPlanComponent;

  collapseInd : boolean;

  dateOfDelivery : Date = (this.userInputService.deliveryDate === undefined)?new Date():this.userInputService.deliveryDate;

  constructor(private userInputService : UserInputService, private displayService : DisplayService, private router: Router, private route: ActivatedRoute) { 
  }

  ngOnInit(): void {
    this.userInputService.resetAllUserInputs();
  }

  afterViewInit() {
    this.collapseInd = this.manageMealPlan.collapseMealListInd;
  }

  @HostListener('mouseover') onMouseOver() {
    this.collapseInd = this.displayService.getCollapsibleIndMealSelector('mouseover' , this.userInputService.mealList, this.userInputService.createMealPlanClicked || this.userInputService.updateMealPlanClicked);
}

  @HostListener('mouseout') onMouseOut() {
    this.collapseInd = this.displayService.getCollapsibleIndMealSelector('mouseout' , this.userInputService.mealList, this.userInputService.createMealPlanClicked || this.userInputService.updateMealPlanClicked);
  }

  getMealList() : String[] {
    return this.userInputService.mealList;
  }
}