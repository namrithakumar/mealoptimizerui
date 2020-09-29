import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Ingredient } from '../../../shared/ingredient.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  @Input() ingredients : Ingredient[] = [];

  addIngredientsToShoppingListSubscription : Subscription;

  constructor(private userInputService : UserInputService) { }

  ngOnInit(): void {
    this.addIngredientsToShoppingListSubscription = this.userInputService.onAddIngredientsToShoppingList.subscribe(      
      (ingredientInfoList : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[]) => {
        ingredientInfoList.forEach(ingredientInfo => {
          this.addIngredient(ingredientInfo);
        });
      });
  }

  //this method pushes ingredients (bread, milk etc.) to an array. This array elemnts will be displayed in the section 'shopping list'.
  //The values passes are ingredientName, ingredientAmount, ingredient labels (the name of the item or 'added by user')
  addIngredient(ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }) : void {

    var ingredientAdded : boolean = false;    

    //If ingredients array is empty, push to the array - there is no need for any check
    (this.ingredients.length ==0)?(this.ingredients.push(new Ingredient(ingredientInfo.ingredientName.toLowerCase(), ingredientInfo.ingredientAmount, ingredientInfo.ingredientLabels))):
    //If ingredients array is not empty, follow the below logic for the new ingredient to be added
    /* If the ingredients array already contains the new ingredient,
     * Merge the new ingredient with existing ingredient
     * If the ingredients array does not contain the new ingredient, make sure you loop through the entire array before adding a new ingredient.
     */

    (this.ingredients.forEach((ingredient, index) => {
      if(!ingredientAdded) {  
        if(ingredient.name.toLowerCase() === ingredientInfo.ingredientName.toLowerCase()) {
          ingredientAdded = this.mergeWithExistingIngredient(index, ingredient, ingredientInfo);
          }
          // Before adding a new ingredient, check the whole ingredients array to make sure it does not already have the ingredient
          else if(index === (this.ingredients.length - 1)) { 
            this.ingredients.push(new Ingredient(ingredientInfo.ingredientName.toLowerCase(), ingredientInfo.ingredientAmount, ingredientInfo.ingredientLabels));
            ingredientAdded=true;
          }
      }
    }));
  }

  deleteIngredient(ingredientInfo : { ingredientName:String }) {
    if(this.ingredients.length > 0) {
      (this.ingredients.forEach((ingredient, index) => {
        if(ingredient.name.toLowerCase() === ingredientInfo.ingredientName.toLowerCase()) {
          this.ingredients.splice(index, 1);
        }
      }));
    }   
  }

  updateIngredient(updatedIngredientInfo : { indexOfIngredient : number, ingredientName : String, ingredientAmount : number, ingredientNameUpdated : boolean }) : void {
    var ingredientUpdated = false;
    (this.ingredients.forEach((ingredient, index) => {
      if(!ingredientUpdated) {
        //If the ingredient name is updated (e.g. tomato -> bread), check if it can be merged with an existing item in the list
        if(updatedIngredientInfo.ingredientNameUpdated) {
          //If the shoppingList already has the ingredient, merge with existing ingredient
          if(ingredient.name.toLowerCase() === updatedIngredientInfo.ingredientName.toLowerCase()) {
            ingredientUpdated = this.mergeWithExistingIngredient(
                                index, 
                                ingredient, 
                                { ingredientName:updatedIngredientInfo.ingredientName,
                                  ingredientAmount:updatedIngredientInfo.ingredientAmount, 
                                  ingredientLabels:[] // Labels cannot be updated, hence an empty array
                                });
            this.ingredients.splice(updatedIngredientInfo.indexOfIngredient, 1);
          }
        }
          // If ingredientName is not updated, replace the amount with the new amount
          else {
			      this.ingredients[updatedIngredientInfo.indexOfIngredient].amount = updatedIngredientInfo.ingredientAmount;
            ingredientUpdated=true;
          }
      }
    })); 
	}

  onLoadIngredient(indexOfIngredient : number) {
    this.userInputService.onEditIngredientsInShoppingList.next( { indexOfIngredient : indexOfIngredient, ingredient : this.ingredients[indexOfIngredient]});
  }

  /*
   * Add the new ingredient.label to existing labels
   * Calculate the correct ingredient amount - new ingredient.amount + existing ingredient.amount
   */
  private mergeWithExistingIngredient(indexOfExistingingredient : number, existingIngredient : Ingredient, newIngredient : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }) {
    var concatenatedLabels = existingIngredient.labels;
    newIngredient.ingredientLabels.forEach((label) => {

      //Add new label only if the list of labels does not already contain it.
      if(!(concatenatedLabels.includes(label))) {
        concatenatedLabels.push(label);
      }
    });        
    this.ingredients.splice(indexOfExistingingredient, 1, new Ingredient(newIngredient.ingredientName.toLowerCase(), (Number(existingIngredient.amount) + Number(newIngredient.ingredientAmount)), concatenatedLabels));
    return true;
}

  ngOnDestroy() : void {
    this.addIngredientsToShoppingListSubscription.unsubscribe();
  }
}
