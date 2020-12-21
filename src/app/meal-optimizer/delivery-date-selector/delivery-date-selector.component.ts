import {
    Component,
    HostListener,
    OnInit
  } from '@angular/core';
  
  import {
    CalendarView, CalendarEvent,
  } from 'angular-calendar';

import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import * as UserPreferencesActions from '../store/actions/user-preferences.actions';

  @Component({
    selector: 'app-delivery-date-selector',
    styleUrls: ['delivery-date-selector.component.css'],
    templateUrl: './delivery-date-selector.component.html',
  })
  export class DeliveryDateSelectorComponent implements OnInit {

    propertyName = 'deliveryDate';

    activeDayIsOpen: boolean = true;
  
    view: CalendarView = CalendarView.Month;
  
    CalendarView = CalendarView;
  
    viewDate: Date = new Date();

    constructor(private store : Store<AppState>) {}
  
    dateOfDeliveryChosen({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      this.store.dispatch(new UserPreferencesActions.EditDeliveryDate(date));
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }

    ngOnInit() {
    }
  }