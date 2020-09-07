import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { UserInputService } from '../shared/services/user-input.service';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor(private userInputService : UserInputService) { 
    this.userInputService.getMealPlan.subscribe(
      (mealList : Array<String>) => {
        mealList.forEach(meal => console.log(meal));
      }
    );
  }

  ngOnInit(): void {
  }
}