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
    this.collapseInd = this.displayService.canCollapseMealList;
  }

  @HostListener('mouseover', ['$event'])  
  @HostListener('mouseout', ['$event']) handleMouseEvent() {
    //Update collapse indicator only if 4 meals are selected
      if(this.userInputService.mealList.length === 4)
          this.collapseInd = this.displayService.canCollapseMealList && this.displayService.getCollapsibleInd(event.type);
  }

  getMealList() : String[] {
    return this.userInputService.mealList;
  }
}