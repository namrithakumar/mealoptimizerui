import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';

import { ShoppingItem } from '../../shared/model/shopping-item-model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../../app/store/reducers/app.reducer';
import { ShoppingList } from './store/shopping-list.reducer';
import { ShoppingListMode } from 'src/app/shared/shopping-list-mode.enum';
import * as UserDisplayPreferencesActions from '../../user-mgmt/store/actions/user-display-preferences.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  /*
   * Stores a list of shopping items selected from the store. 
   */
  shoppingItems: ShoppingItem[];

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.store.select('shoppingList').subscribe((shoppingItems : ShoppingList) => {
      this.shoppingItems = shoppingItems.shoppingItems;
    });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.store.dispatch(new UserDisplayPreferencesActions.UpdateShoppingListMode(ShoppingListMode.UPDATE));
  }

  ngOnDestroy() { }
}
