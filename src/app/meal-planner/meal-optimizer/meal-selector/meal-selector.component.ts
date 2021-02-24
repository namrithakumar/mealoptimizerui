import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';

import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

/* This component is a holder for menu received from the backend.
 */
export class MealSelectorComponent implements OnInit {
  
  constructor(private store : Store<AppState>,
              private breakpointObserver: BreakpointObserver,
              private renderer: Renderer2, 
              private el: ElementRef) {}
  
  dateOfDelivery : Date;

  mealsSelected : String[];

  ngOnInit(): void {
    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
        
        this.dateOfDelivery = userPrefs.deliveryDate;

        this.mealsSelected = userPrefs.mealSelected;
      });

      //Track the size of the window and pivot row -> column accordingly.
      //Note that angular cdk screen sizes(small, medium, large etc.) are different from bootstrap sizes.
      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ]).subscribe( (state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
             this.resetSelectorLayout('column');
        }
        if (state.breakpoints[Breakpoints.Small]) {
             this.resetSelectorLayout('column');
        }
        if (state.breakpoints[Breakpoints.Medium]) {
             this.resetSelectorLayout('row');
        }
        if (state.breakpoints[Breakpoints.Large]) {
             this.resetSelectorLayout('row');
        }
        if (state.breakpoints[Breakpoints.XLarge]) {
             this.resetSelectorLayout('row'); 
        }
      });  
   }

   //Function to pivot row -> column using JQuery selector and css classes.
   resetSelectorLayout(layout : String) : void {
 
    let tableBody = this.el.nativeElement.querySelector("div table tbody");
    let tableRows = this.el.nativeElement.querySelectorAll("div table tbody tr");
    let tableElements = this.el.nativeElement.querySelectorAll("div table tbody td");

    switch(layout) {

       case 'row' : this.renderer.removeClass(tableBody,'flex_container_column');
                    tableRows.forEach((row) => this.renderer.removeClass(row, 'flex_container_row'));
                    tableElements.forEach((element) => this.renderer.removeClass(element, 'w-50'));    
                    this.renderer.addClass(tableBody,'flex_container_row');
                    tableRows.forEach((row) => this.renderer.addClass(row, 'flex_container_column'));  
                    tableElements.forEach((element) => this.renderer.addClass(element, 'w-100'));      
                    break;
      
       case 'column' : this.renderer.removeClass(tableBody,'flex_container_row');
                       tableRows.forEach((row) => this.renderer.removeClass(row, 'flex_container_column'));    
                       tableElements.forEach((element) => this.renderer.removeClass(element, 'w-100'));    
                       this.renderer.addClass(tableBody,'flex_container_column');
                       tableRows.forEach((row) => this.renderer.addClass(row, 'flex_container_row'));
                       tableElements.forEach((element) => this.renderer.addClass(element, 'w-50'));    
                       break;
     }     
   }
}