import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPreferences } from 'src/app/meal-planner/meal-optimizer/store/reducers/user-preferences.reducer';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Component({
  selector: 'app-order-info',
  templateUrl: './order-info.component.html',
  styleUrls: ['./order-info.component.css']
})
/*
 * This tab displays the user inputs (diet type / delivery date / meals selected)
 */
export class OrderInfoComponent implements OnInit, OnDestroy {

  orderInfo : { dietType: String, deliveryDate: Date, mealSelected: Array<String> } = 
              { dietType : null, deliveryDate: null, mealSelected: null };

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
      this.orderInfo.dietType = userPrefs.dietType;
      this.orderInfo.deliveryDate = userPrefs.deliveryDate;
      this.orderInfo.mealSelected = userPrefs.mealSelected;
    });
  }

  ngOnDestroy() : void { }
}