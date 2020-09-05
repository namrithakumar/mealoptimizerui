import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserInputService } from '../../shared/services/user-input.service';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

  constructor(private userInputService : UserInputService) { }

  ngOnInit(): void {
  }

  //  Action rfers to place Order/getRecipe
  onSelect( action : String ) {
      this.userInputService.onActionSelected.emit(action);
  }
}