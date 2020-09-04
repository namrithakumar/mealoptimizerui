import {
    Component,
    Output,
    EventEmitter
  } from '@angular/core';
  
  import {
    CalendarView, CalendarEvent,
  } from 'angular-calendar';

  import { OrderService } from '../../shared/services/order.service';

  @Component({
    selector: 'app-delivery-date-selector',
    styleUrls: ['delivery-date-selector.component.css'],
    templateUrl: './delivery-date-selector.component.html',
  })
  export class DeliveryDateSelectorComponent {

    activeDayIsOpen: boolean = true;
  
    view: CalendarView = CalendarView.Month;
  
    CalendarView = CalendarView;
  
    viewDate: Date = new Date();
    
    dateOfDelivery: Date = this.viewDate;

    constructor(private orderService : OrderService) {}
  
    dateOfDeliveryChosen({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      this.dateOfDelivery = date;
      this.orderService.setDeliveryDate(this.dateOfDelivery);
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }

  }