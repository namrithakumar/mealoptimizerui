import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';
import { Menu } from '../../store/reducers/menu.reducer';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
export class MealOptionsComponent implements OnInit {

  @Input() indexOfMeal : number; // Set inside meal-selector.html

  itemList : String[]; 

  itemSelected : String;
  
  defaultText = "Please select meal";

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.resetItemList();
    this.store.select('menu').subscribe((menu : Menu) => {
      if(menu.itemList) { this.itemList = menu.itemList; }
      if(menu.error) { this.itemList = [menu.error]; }
    });
  }
  
  onMealSelected() : void {
    this.store.dispatch(new UserPreferencesActions.UpdateMeal({itemPosition: this.indexOfMeal, itemName: this.itemSelected}));
  }

  resetItemList() {
    this.itemList = new Array<String>(1);
    this.itemList.push(this.defaultText);
  }
}