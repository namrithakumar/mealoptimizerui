import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit, OnDestroy {

  orderInfo : { deliveryDate: Date, mealSelected: Array<String> } = { deliveryDate: null, mealSelected: null };
  orderSubscription : Subscription;

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.orderObservable.subscribe(
      (orderInfo : { deliveryDate: String, mealSelected: Array<String>, optimizationTypes : Array<String> }) => {
        this.orderInfo.deliveryDate = new Date(orderInfo.deliveryDate.toString());
        this.orderInfo.mealSelected = orderInfo.mealSelected;
      }
    );
  }

  ngOnDestroy() : void {
    this.orderSubscription.unsubscribe();
  }
}