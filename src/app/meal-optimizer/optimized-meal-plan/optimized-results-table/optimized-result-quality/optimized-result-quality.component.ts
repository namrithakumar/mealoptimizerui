import { Component, OnInit, Input } from '@angular/core';
import { Meal } from '../../../../shared/model/order/order-response.model';

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