import {
    Component,
    OnInit,
    ViewChild
  } from '@angular/core';
  
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';

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

    @ViewChild('calendar') calendarComponent: FullCalendarComponent;
    
    calendarOptions: CalendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      aspectRatio : 2,
      validRange : {
        start : new Date(),
        end : new Date().setMonth(new Date().getMonth() + 6)
      }
    };

    constructor(private store : Store<AppState>) {}
  
    handleDateClick(arg) {
      this.store.dispatch(new UserPreferencesActions.EditDeliveryDate(arg.date));
    }

    ngOnInit() { }
  }