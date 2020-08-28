import {
    Component
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
  
    activeDayIsOpen: boolean = true;
  
    view: CalendarView = CalendarView.Month;
  
    CalendarView = CalendarView;
  
    viewDate: Date = new Date();
  
    constructor() {}
  
    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      console.log('date clicked: ' + date.getDate() + date.getMonth() + date.getFullYear());
    }
  
      closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }
  }