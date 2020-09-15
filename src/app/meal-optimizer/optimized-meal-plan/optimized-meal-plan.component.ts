import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserInputService } from 'src/app/shared/services/user-input.service';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

  constructor(private router:Router, private userInputService: UserInputService) { }

  ngOnInit(): void {
  }

  placeOrderSelected() {
    this.router.navigate(['meal-optimizer','online-order']);
  }

  getRecipeSelected() {
    this.router.navigate(['meal-optimizer','recipes']);
  }
}