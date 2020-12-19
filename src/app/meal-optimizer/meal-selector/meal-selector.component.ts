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

  collapseInd : boolean;

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

  @HostListener('mouseover', ['$event'])  
  @HostListener('mouseout', ['$event']) handleMouseEvent() {
    //Update collapse indicator only if 4 meals are selected
      //if(this.userInputService.userInput.mealSelected!==undefined && this.userInputService.userInput.mealSelected.length === 4)
      //    this.collapseInd = this.displayService.canCollapseMealList && this.displayService.getCollapsibleInd(event.type);
  }

  getMealList() : String[] {
    return this.mealsSelected;
  }
}