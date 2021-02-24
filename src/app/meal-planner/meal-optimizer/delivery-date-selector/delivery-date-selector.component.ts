import {
    Component,
    ElementRef,
    OnInit,
    ViewChild
  } from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";

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

    @ViewChild('calendar') cal : ElementRef;
    calendar: Calendar;

    //defaultConfigurations: any;

    propertyName = 'deliveryDate';

    constructor(private store : Store<AppState>) {
     /* this.defaultConfigurations = {
        plugins: [dayGridPlugin, interactionPlugin],
        validRange: {
          start: new Date(),
          end: new Date().setMonth(new Date().getMonth() + 6)
        },
        aspectRatio: 2,
        dateClick: this.handleDateClick.bind(this)
      }*/
    }
   
    ngOnInit() { }

    handleDateClick(arg) {
      this.store.dispatch(new UserPreferencesActions.EditDeliveryDate(arg.date));
    }

    ngAfterViewInit() {
      this.calendar = new Calendar(this.cal.nativeElement, {
        plugins: [dayGridPlugin, interactionPlugin],
        validRange: {
          start: new Date(),
          end: new Date().setMonth(new Date().getMonth() + 6)
        },
        aspectRatio: 2,
        dateClick: this.handleDateClick.bind(this)
      });
      this.calendar.render();
    }
  }