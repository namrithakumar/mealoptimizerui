import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { HttpRequestStatus } from 'src/app/shared/http-request-status.enum';
import { AppState } from 'src/app/store/reducers/app.reducer';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';
import { Menu } from '../../store/reducers/menu.reducer';
import { DefaultMessages } from '../../../../shared/default-messages';

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

  defaultText : String = DefaultMessages.menu.get(HttpRequestStatus.NO_ACTION);

  // Menu received from the backend.
  itemList : String[]; 

  //Meal selected by the user
  itemSelected : String;
  
  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    // Subscribe to store.menu to be notifed of changes in menu. Note that the menu is fetched from the backend.
    this.store.select('menu').subscribe((menu : Menu) => {
      
      switch(menu.requestStatus) {
        case HttpRequestStatus.NO_ACTION: {
                                          this.resetItemList();                                          
                                          this.defaultText = DefaultMessages.menu.get(HttpRequestStatus.NO_ACTION);                                          
                                          break;
                                          }
        case HttpRequestStatus.REQUEST_SENT: {                                      
                                          this.resetItemList();                                          
                                          this.defaultText = DefaultMessages.menu.get(HttpRequestStatus.REQUEST_SENT);                                                                                 
                                          break;
                                          }
        case HttpRequestStatus.RESPONSE_RECEIVED: {
                                          this.defaultText = DefaultMessages.menu.get(HttpRequestStatus.RESPONSE_RECEIVED);
                                          this.resetItemList();
                                          // Only one of the 2 values can be truthy - menu.itemList | menu.error
                                          // If menu.itemList if truthy, display item list to the user
                                          if(menu.itemList) { 
                                            this.itemList = menu.itemList.slice();
                                          }
                                          //If menu.error is true, display the error
                                          if(menu.error) { this.itemList = [menu.error]; }                                          
                                          
                                          break;
                                          }                                                                   
      }
    });
  }
  /* If a meal is selected by the user from the dropdown, save it to store.userPreferences by dispatching an action. 
   *
   */
  onMealSelected(item : String) : void {
    console.log('Item selected ' + item + this.indexOfMeal);
    this.itemSelected = item;
    this.store.dispatch(
      new UserPreferencesActions.UpdateMeal({
        itemPosition: this.indexOfMeal, 
        itemName: this.itemSelected
      }));
  }

  private resetItemList() {
    this.itemList = new Array<String>();
  }
}