import { Component, OnInit } from '@angular/core';
import { OptimizationService } from '../../../shared/services/optimization.service';
@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  optimizationResultsSummary = this.optimizationService.getOptimizationResultSummary();
  constructor(private optimizationService : OptimizationService) { }

  ngOnInit(): void {
  }

}
