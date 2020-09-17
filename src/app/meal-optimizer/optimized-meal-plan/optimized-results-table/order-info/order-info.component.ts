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

  orderInfo : { userDietType: String, deliveryDate: Date, mealSelected: Array<String> };
  orderSubscription : Subscription;

  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.orderObservable.subscribe(
      (orderInfo : { userDietType: String, deliveryDate: Date, mealSelected: Array<String> }) => {
        this.orderInfo = orderInfo;
      }
    );
  }

  ngOnDestroy() : void {
    this.orderSubscription.unsubscribe();
  }
}