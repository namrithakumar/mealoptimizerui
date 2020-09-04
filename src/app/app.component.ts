import { Component } from '@angular/core';
import { OrderService } from './shared/services/order.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  actionSelected : String;

  constructor(private orderService : OrderService) {
    this.orderService.onActionSelected.subscribe((action : String) => this.actionSelected=this.actionSelected);
  }
}