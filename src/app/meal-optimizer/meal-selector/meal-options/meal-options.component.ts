import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Actions, Effect, EffectsFeatureModule, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { ItemService } from '../../../shared/services/http/item.service';
import * as MenuActions from '../../../meal-optimizer/store/actions/menu.actions';
import * as UserPreferencesActions from '../../store/actions/user-preferences.actions';
import { map } from 'rxjs/operators';
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

  constructor(private itemService:ItemService, private store:Store<AppState>, private actions$ : Actions) { }

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