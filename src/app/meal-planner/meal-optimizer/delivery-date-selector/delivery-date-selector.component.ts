import {
    Component,
    OnInit
  } from '@angular/core';

  import {
    CalendarEvent,
    CalendarMonthViewDay,
    CalendarView,
  } from 'angular-calendar';

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
    customDate = new Date(new Date().setDate(20));
    viewDate: Date = this.customDate;

    constructor(private store : Store<AppState>) {}

    dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
      this.store.dispatch(new UserPreferencesActions.EditDeliveryDate(date));
    }

    setView(view: CalendarView) {
      this.view = view;
    }

    beforeMonthViewRender({ body }: { body: CalendarMonthViewDay[] }): void {
      body.forEach((day) => {
        if (day.date < new Date()) {
          console.log(day.date + 'check : ' + (day.date < new Date()));
          day.cssClass = 'cal-disabled';
        }
      });
    }
    
    ngOnInit() { }
  }