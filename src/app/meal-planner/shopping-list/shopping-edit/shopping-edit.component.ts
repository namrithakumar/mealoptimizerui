import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ShoppingItem } from '../../../shared/model/shopping-item-model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../../store/reducers/app.reducer';
import { ActivatedRoute, Router } from '@angular/router';
import * as UserDisplayPreferencesActions from '../../../user-mgmt/store/actions/user-display-preferences.actions';
import { UserDisplayPreferences } from 'src/app/user-mgmt/store/reducers/user-display-preferences.reducer';
import { ShoppingListMode } from 'src/app/shared/shopping-list-mode.enum';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', { static: false }) slForm: NgForm;
  
  subscription: Subscription;
  mode : String = ShoppingListMode.ADD;
  editedItem: ShoppingItem = null;

  defaultLabel : String = 'Added by user';

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {

    // Get value of mode (create or update)
    this.store.select('userDisplayPreferences').subscribe((userDisplayPreferences : UserDisplayPreferences) => {
      
      this.mode = userDisplayPreferences.shoppingListMode;
    });

    this.subscription = this.store
      .select('shoppingList')
      .subscribe(stateData => {
        if (stateData.editedshoppingItemIndex > -1) {
          this.editedItem = stateData.editedshoppingItem;
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
            measure: this.editedItem.measure
          });
          this.store.dispatch(new UserDisplayPreferencesActions.UpdateShoppingListMode(ShoppingListMode.UPDATE));
        }
      });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    let updatedLabels = null;    
    let newIngredient = null;    
    if (this.mode === 'update') {
      //Calculate updatedLabels. Add the label 'Added by User' if it is not already available 
      updatedLabels = this.editedItem.labels.slice();
      if(!updatedLabels.includes(this.defaultLabel)) updatedLabels.push(this.defaultLabel);
      //Create the ingredient to be updated. NOTE: We use the same measure as editedItem since the measure cannot be updated.
      newIngredient = new ShoppingItem(value.name, value.amount, this.editedItem.measure, updatedLabels); 
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({ shoppingItem : newIngredient, itemNameUpdated : form.controls['name'].touched })
      );
    } else {
      //Create the ingredient to be added
      newIngredient = new ShoppingItem(value.name, value.amount, value.measure, [this.defaultLabel]);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.store.dispatch(new UserDisplayPreferencesActions.UpdateShoppingListMode(ShoppingListMode.ADD));
    this.mode = ShoppingListMode.ADD;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.store.dispatch(new UserDisplayPreferencesActions.UpdateShoppingListMode(ShoppingListMode.ADD));
  }

  onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}