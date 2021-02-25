import {
    Component,
    ElementRef,
    OnInit,
    ViewChild,
    Renderer2
  } from '@angular/core';
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Calendar } from "@fullcalendar/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

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

    constructor(private store : Store<AppState>,
                private breakpointObserver: BreakpointObserver,
                private renderer: Renderer2) { }
   
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
        aspectRatio: 2.4,
        dateClick: this.handleDateClick.bind(this)
      });
      
      this.calendar.render();
      //Track the size of the window and set aspectRatio (width:height) ratio of the calendar.
      //AspectRatio is a property of fullcalendar ver 4.
      //Note that angular cdk screen sizes(small, medium, large etc.) are different from bootstrap sizes.
      /*this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe( (state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall] || 
            state.breakpoints[Breakpoints.Small]) {
             this.calendar.setOption('aspectRatio', 1.35);
        }
        else if (state.breakpoints[Breakpoints.Medium] || 
                 state.breakpoints[Breakpoints.Large] || 
                 state.breakpoints[Breakpoints.XLarge]) {
            this.calendar.setOption('aspectRatio', 2.4);
        }
        this.calendar.render();
      });*/
    }
  }