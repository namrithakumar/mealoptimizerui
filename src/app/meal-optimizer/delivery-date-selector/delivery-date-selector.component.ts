import {
    Component,
    Output,
    EventEmitter
  } from '@angular/core';
  
  import {
    CalendarView, CalendarEvent,
  } from 'angular-calendar';
  
  @Component({
    selector: 'app-delivery-date-selector',
    styleUrls: ['delivery-date-selector.component.css'],
    templateUrl: './delivery-date-selector.component.html',
  })
  export class DeliveryDateSelectorComponent {
  
    @Output() dateOfDeliverySelected = new EventEmitter< { dateOfDelivery : Date } >();

    activeDayIsOpen: boolean = true;
  
    view: CalendarView = CalendarView.Month;
  
    CalendarView = CalendarView;
  
    viewDate: Date = new Date();
    
    dateOfDelivery: Date = this.viewDate;

    constructor() {}
  
    dateOfDeliveryChosen({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      this.dateOfDelivery = date;
      this.dateOfDeliverySelected.emit({ dateOfDelivery : this.dateOfDelivery});
    }
  
      closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }

    getDateOfDelivery() : Date {
      return this.dateOfDelivery;
    }
  }