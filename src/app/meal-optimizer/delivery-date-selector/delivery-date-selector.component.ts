import {
    Component,
    HostListener,
    OnInit
  } from '@angular/core';
  
  import {
    CalendarView, CalendarEvent,
  } from 'angular-calendar';

import { UserInputService } from '../../shared/services/user-input.service';
import { DisplayService } from 'src/app/shared/services/display.service';

  @Component({
    selector: 'app-delivery-date-selector',
    styleUrls: ['delivery-date-selector.component.css'],
    templateUrl: './delivery-date-selector.component.html',
  })
  export class DeliveryDateSelectorComponent implements OnInit {

    activeDayIsOpen: boolean = true;
  
    view: CalendarView = CalendarView.Month;
  
    CalendarView = CalendarView;
  
    viewDate: Date = new Date();

    setCollapseInd : boolean = false;

    constructor(private userInputService : UserInputService, private displayService : DisplayService) {}
  
    dateOfDeliveryChosen({ date, events }: { date: Date; events: CalendarEvent[] }):void {
      this.userInputService.setDeliveryDate(date);
    }
  
    closeOpenMonthViewDay() {
      this.activeDayIsOpen = false;
    }

    @HostListener('mouseover') onMouseOver() {
      this.setCollapseInd = this.displayService.getCollapsibleInd('mouseover' , this.userInputService.deliveryDate);
}

    @HostListener('mouseout') onMouseOut() {
      this.setCollapseInd = this.displayService.getCollapsibleInd('mouseout' , this.userInputService.deliveryDate);
    }

    ngOnInit() {
    }
  }