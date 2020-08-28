import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { UserDietTypeComponent } from './user_diet_type/user_diet_type.component';
import { DeliveryDateSelectorComponent } from './delivery-date-selector/delivery-date-selector.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDietTypeComponent,
    DeliveryDateSelectorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
