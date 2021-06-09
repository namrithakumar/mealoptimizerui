import { Component, Input, OnInit } from '@angular/core';

import { IUserDietType } from '../../shared/services/user-diet-type-resolver.service';

//This component handles routing, link to optimizationService via controller
@Component({
  selector: 'app-meal-optimizer',
  templateUrl: './meal-optimizer.component.html',
  styleUrls: ['./meal-optimizer.component.css']
})
export class MealOptimizerComponent implements OnInit {

  constructor() {
  }

  // Set inside meal-planner.html
  @Input() dietTypes : Array<IUserDietType>;

  ngOnInit(): void { }
}