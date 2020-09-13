import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInputService } from '../shared/services/user-input.service';
import { CanComponentDeactivate } from '../shared/services/can-exit-page.service';
import { Observable } from 'rxjs';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit, CanComponentDeactivate {

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor(private userInputService: UserInputService) {
  }

  ngOnInit(): void {
  }

  canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
    if(this.userInputService.verifyOneOrMoreInputsReceived()) {
      if(this.userInputService.getMealPlanClicked) return true;
      else return confirm('Changes are not saved. Are you sure you want to exit this page?');
    }
    else return true;
  }
}