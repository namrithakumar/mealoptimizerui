import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInputService } from '../shared/services/user-input.service';
import { CanComponentDeactivate } from '../shared/services/can-exit-page.service';
import { Observable } from 'rxjs';
import { IUserDietType } from '../shared/services/user-diet-type-resolver.service';
import { ActivatedRoute, Data } from '@angular/router';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit, CanComponentDeactivate {

  constructor(private userInputService: UserInputService, private route: ActivatedRoute) {
  }

  dietTypes : Array<IUserDietType>;

  ngOnInit(): void {
    this.userInputService.resetAllUserInputs();
    this.route.data.subscribe(data => {
      this.dietTypes = data['userDietTypes'];
    });
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if(this.userInputService.verifyOneOrMoreInputsReceived()) {
      if(this.userInputService.createMealPlanClicked || this.userInputService.updateMealPlanClicked) return true;
      else return confirm('Changes are not saved. Are you sure you want to exit this page?');
    }
    else return true;
  }
}