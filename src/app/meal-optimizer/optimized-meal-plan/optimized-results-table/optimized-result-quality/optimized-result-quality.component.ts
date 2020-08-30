import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../../meal-optimizer/meal.model';

@Component({
  selector: 'app-optimized-result-quality',
  templateUrl: './optimized-result-quality.component.html',
  styleUrls: ['./optimized-result-quality.component.css']
})
export class OptimizedResultQualityComponent implements OnInit {
  
  @Input() meal : Meal;
  
  constructor() { }

  ngOnInit(): void {
  }

}
