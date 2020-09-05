import {
    Component,
    HostListener
  } from '@angular/core';
  
  import {
    CalendarView, CalendarEvent,
  } from 'angular-calendar';

import { OrderService } from '../../shared/services/order.service';
import { DisplayService } from 'src/app/shared/services/display.service';

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
    
    dateOfDelivery: Date;

    setCollapseInd : boolean = false;

    constructor(private orderService : OrderService, private displayService : DisplayService) {}
  
    dateOfDeliveryChosen({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      this.dateOfDelivery = date;
      this.orderService.setDeliveryDate(this.dateOfDelivery);
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }

    @HostListener('mouseover') onMouseOver() {
      this.setCollapseInd = this.displayService.getCollapsibleInd('mouseover' , this.dateOfDelivery);
}

    @HostListener('mouseout') onMouseOut() {
      this.setCollapseInd = this.displayService.getCollapsibleInd('mouseout' , this.dateOfDelivery);
    }
  }