import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingItem } from '../../../shared/model/shopping-item-model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../../../app/store/reducers/app.reducer';
import { ShoppingList } from './store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  shoppingItems: ShoppingItem[];
  private subscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe((shoppingItems : ShoppingList) => {
      this.shoppingItems = shoppingItems.shoppingItems;
    });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
