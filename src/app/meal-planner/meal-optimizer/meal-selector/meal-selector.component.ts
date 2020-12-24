import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { UserPreferences } from '../store/reducers/user-preferences.reducer';

@Component({
  selector: 'app-meal-selector',
  templateUrl: './meal-selector.component.html',
  styleUrls: ['./meal-selector.component.css']
})

export class MealSelectorComponent implements OnInit {

  constructor(private store : Store<AppState>) {}
  
  dateOfDelivery : Date;

  mealsSelected : String[];

  ngOnInit(): void {
    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
        
        this.dateOfDelivery = userPrefs.deliveryDate;

        this.mealsSelected = userPrefs.mealSelected;
      });
  }

  afterViewInit() {
    //this.collapseInd = this.displayService.canCollapseMealList;
  }
}