import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';
import { Menu } from '../../store/reducers/menu.reducer';
import { defaultMessages } from '../../../../shared/default-messages';

@Component({
  selector: 'app-meal-options',
  templateUrl: './meal-options.component.html',
  styleUrls: ['./meal-options.component.css']
})
/* This component performs 2 actions,
 * Display menu got from the backend
 * When the user selects a meal from the menu, dispatch an action
 */
export class MealOptionsComponent implements OnInit {

  // Set inside meal-selector.html
  @Input() indexOfMeal : number; 

  // Default text displayed when menu is not received from the backend.
  defaultText = "Please select a meal";

  // Menu received from the backend.
  itemList : String[]; 

  //Meal selected by the user
  itemSelected : String;
  
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    // Clear existing menu and display default text when component is loaded.
    this.resetItemList();

    // Subscribe to store.menu to be notifed of changes in menu. Note that the menu is fetched from the backend.
    this.store.select('menu').subscribe((menu : Menu) => {
      // Only one of the 2 values can be truthy - menu.itemList | menu.error
      // If menu.itemList if truthy, display item list to the user
      if(menu.itemList) { 
        this.itemList = menu.itemList.slice();
        //Insert default text 'Please select a meal' as the first entry of the list
        this.itemList.unshift(this.defaultText);
      }
      //If menu.error is true, display the error
      if(menu.error) { this.itemList = [menu.error]; }
    });
  }
 
  /* If a meal is selected by the user from the dropdown, save it to store.userPreferences by dispatching an action. 
   *
   */
  onMealSelected() : void {
    this.store.dispatch(
      new UserPreferencesActions.UpdateMeal({
        itemPosition: this.indexOfMeal, 
        itemName: this.itemSelected
      }));
  }

  private resetItemList() {
    this.itemList = new Array<String>(1);
    this.itemList.push(this.defaultText);
  }
}