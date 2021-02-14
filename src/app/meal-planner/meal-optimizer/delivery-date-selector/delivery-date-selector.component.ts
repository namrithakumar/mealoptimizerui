import {
    Component,
    OnInit
  } from '@angular/core';

  import {
    CalendarMonthViewDay,
    CalendarView,
  } from 'angular-calendar';
  
import { WeekDay } from 'calendar-utils';

import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as UserPreferencesActions from '../store/actions/user-preferences.actions';

  @Component({
    selector: 'app-delivery-date-selector',
    styleUrls: ['delivery-date-selector.component.css'],
    templateUrl: './delivery-date-selector.component.html'
  })
  // This component performs only 1 action - save delivery date chosen to store.
  export class DeliveryDateSelectorComponent implements OnInit {

    propertyName = 'deliveryDate';
 
    view: CalendarView = CalendarView.Month;
    viewDate: Date = new Date();
    selectedDay: WeekDay;

    constructor(private store : Store<AppState>) {}

    dayClicked(day: CalendarMonthViewDay): void {
      if (this.selectedDay) {
        delete this.selectedDay.cssClass;
      }
      day.cssClass = 'cal-day-selected';
      this.selectedDay = day;
      this.store.dispatch(new UserPreferencesActions.EditDeliveryDate(day.date));
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
      body.forEach((day) => {
        if (!this.dateIsValid(day.date)) {
          day.cssClass = 'cal-disabled';
        }
      });
    }
    
    ngOnInit() { }

    dateIsValid(date : Date) {
      let endDate : Date = new Date(new Date().setMonth(new Date().getMonth() + 6));
      return (date >= new Date() && date < endDate);
    }
  }