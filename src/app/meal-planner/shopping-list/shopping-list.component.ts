import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingItem } from '../../shared/model/shopping-item-model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../../../app/store/reducers/app.reducer';
import { ShoppingList } from './store/shopping-list.reducer';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { filter } from 'rxjs/operators';

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
    private store: Store<fromApp.AppState>,
    private router : Router,
    private route : ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.select('shoppingList').subscribe((shoppingItems : ShoppingList) => {
      this.shoppingItems = shoppingItems.shoppingItems;
    });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.router.navigate([],{
      relativeTo : this.route,
      queryParams : { shoppinglistmode: 'update' },
      queryParamsHandling : 'merge'
    });
  }

  ngOnDestroy() { }
}
