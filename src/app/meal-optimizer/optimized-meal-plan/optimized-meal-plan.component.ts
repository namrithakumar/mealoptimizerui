import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-optimized-meal-plan',
  templateUrl: './optimized-meal-plan.component.html',
  styleUrls: ['./optimized-meal-plan.component.css']
})
export class OptimizedMealPlanComponent implements OnInit {

  @Output() onFeatureSelected = new EventEmitter< String >();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect( feature : String) {
      this.onFeatureSelected.emit(feature);
  }
}