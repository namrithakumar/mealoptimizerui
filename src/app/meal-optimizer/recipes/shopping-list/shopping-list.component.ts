import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { Subscription } from 'rxjs';
import { ShoppingItem } from '../../../shared/model/shopping-item-model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  @Input() shoppingList : ShoppingItem[] = [];

  addIngredientsToShoppingListSubscription : Subscription;

  constructor(private userInputService : UserInputService) { }

  ngOnInit(): void {
    this.addIngredientsToShoppingListSubscription = this.userInputService.onAddIngredientsToShoppingList.subscribe(      
      (shoppingList : ShoppingItem[]) => {
        shoppingList.forEach((shoppingItem : ShoppingItem) => {
          this.addItemToShoppingList(shoppingItem);
        });
      });
  }

  //this method pushes ingredients (bread, milk etc.) to an array. This array elemnts will be displayed in the section 'shopping list'.
  //The values passes are ingredientName, ingredientAmount, ingredient labels (the name of the item or 'added by user')
  addItemToShoppingList(shoppingItem : ShoppingItem) : void {

    var shoppingItemAdded : boolean = false;    

    //If ingredients array is empty, push to the array - there is no need for any check
    (this.shoppingList.length ==0)?(this.shoppingList.push(shoppingItem)):
    //If ingredients array is not empty, follow the below logic for the new ingredient to be added
    /* If the ingredients array already contains the new ingredient,
     * Merge the new ingredient with existing ingredient
     * If the ingredients array does not contain the new ingredient, make sure you loop through the entire array before adding a new ingredient.
     */

    (this.shoppingList.forEach((existingItemInShoppingList, index) => {
      if(!shoppingItemAdded) {  
        if(existingItemInShoppingList.name.toLowerCase() === shoppingItem.name.toLowerCase() &&
          existingItemInShoppingList.measure.toLowerCase() === shoppingItem.measure.toLowerCase()) {
          shoppingItemAdded = this.mergeWithExistingShoppingListItem(index, existingItemInShoppingList, shoppingItem);
          }
          // Before adding a new ingredient, check the whole ingredients array to make sure it does not already have the ingredient
          else if(index === (this.shoppingList.length - 1)) { 
            this.shoppingList.push(shoppingItem);
            shoppingItemAdded=true;
          }
      }
    }));
  }

  deleteItemInShoppingList(shoppingItemInfo : { name:String }) {
    if(this.shoppingList.length > 0) {
      (this.shoppingList.forEach((shoppingItem, index) => {
        if(shoppingItem.name.toLowerCase() === shoppingItemInfo.name.toLowerCase()) {
          this.shoppingList.splice(index, 1);
        }
      }));
    }   
  }

  updateItemInShoppingList(updatedShoppingItemInfo : { indexOfItem : number, name : String, amount : number, shoppingItemNameUpdated : boolean }) : void {
     var shoppingItemUpdated = false;
    (this.shoppingList.forEach((existingIteminShoppingList, index) => {
      if(!shoppingItemUpdated) {
        //If the ingredient name is updated (e.g. tomato -> bread), check if it can be merged with an existing item in the list
        if(updatedShoppingItemInfo.shoppingItemNameUpdated) {
          //If the shoppingList already has the ingredient, merge with existing ingredient
          if(existingIteminShoppingList.name.toLowerCase() === updatedShoppingItemInfo.name.toLowerCase()) {
            shoppingItemUpdated = this.mergeWithExistingShoppingListItem(
                                  index, 
                                  existingIteminShoppingList, 
                                  new ShoppingItem(updatedShoppingItemInfo.name, updatedShoppingItemInfo.amount, existingIteminShoppingList.measure, []));// Labels cannot be updated, hence an empty array
            this.shoppingList.splice(updatedShoppingItemInfo.indexOfItem, 1);
          }
          else {
            //Replace existing ingredient name with new ingredient name, amount with new amount
            let existingItem : ShoppingItem = this.shoppingList[updatedShoppingItemInfo.indexOfItem];
            this.shoppingList.splice(updatedShoppingItemInfo.indexOfItem , 1, new ShoppingItem(updatedShoppingItemInfo.name, updatedShoppingItemInfo.amount, existingIteminShoppingList.measure, existingIteminShoppingList.labels));
          }
        }
          // If ingredientName is not updated, replace the amount with the new amount
          else {
			      this.shoppingList[updatedShoppingItemInfo.indexOfItem].amount = updatedShoppingItemInfo.amount;
            shoppingItemUpdated=true;
          }
      }
    })); 
	}

  onLoadShoppingItem(indexOfShoppingItem : number) {
    this.userInputService.onEditIngredientsInShoppingList.next( { indexOfShoppingItem : indexOfShoppingItem, shoppingItem : this.shoppingList[indexOfShoppingItem]});
  }

  /*
   * Add the new ingredient.label to existing labels
   * Calculate the correct ingredient amount - new ingredient.amount + existing ingredient.amount
   */
  private mergeWithExistingShoppingListItem(indexOfExistingingredient : number, existingItemInShoppingList : ShoppingItem, newShoppingItem : ShoppingItem) {
    var concatenatedLabels = existingItemInShoppingList.labels;
    newShoppingItem.labels.forEach((label) => {

      //Add new label only if the list of labels does not already contain it.
      if(!(concatenatedLabels.includes(label))) {
        concatenatedLabels.push(label);
      }
    });        
    this.shoppingList.splice(indexOfExistingingredient, 1, new ShoppingItem(newShoppingItem.name.toLowerCase(), (Number(existingItemInShoppingList.amount) + Number(newShoppingItem.amount)), newShoppingItem.measure, concatenatedLabels));
    return true;
}

  ngOnDestroy() : void {
    this.addIngredientsToShoppingListSubscription.unsubscribe();
  }
}