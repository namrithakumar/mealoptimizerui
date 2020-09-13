import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
export class OrderInfoComponent implements OnInit {

  orderInfo = this.orderService.getOrderInfo();
  constructor(private orderService : OrderService) { }

  ngOnInit(): void {
  }
}
