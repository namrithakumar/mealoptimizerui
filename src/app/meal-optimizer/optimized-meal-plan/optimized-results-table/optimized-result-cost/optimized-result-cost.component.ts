import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../../shared/model/order-response.model';

@Component({
  selector: 'app-optimized-result-cost',
  templateUrl: './optimized-result-cost.component.html',
  styleUrls: ['./optimized-result-cost.component.css']
})
export class OptimizedResultCostComponent implements OnInit {
  
  @Input() meal : Meal;

  constructor() { }

  ngOnInit(): void {
  }

}