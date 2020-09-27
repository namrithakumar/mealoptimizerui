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
  addIngredient(ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }) {
    
    var ingredientAdded : boolean = false;    

    //If ingredients array is empty, push to the array - there is no need for any check
    (this.ingredients.length ==0)?(this.ingredients.push(new Ingredient(ingredientInfo.ingredientName.toLowerCase(), ingredientInfo.ingredientAmount, ingredientInfo.ingredientLabels))):
    //If ingredients array is not empty, follow the below logic for the new ingredient to be added
    /* If the ingredients array already has the new ingredient, do the below
     * Add the new ingredient.label to exiting labels
     * Calculate the correct ingredient amount - new ingredient.amount + existing ingredient.amount
     * If the ingredients array does not have the new ingredient, make sure you loop through the entire array before adding a new ingredient.
     */

    (this.ingredients.forEach((ingredient, index) => {
      if(!ingredientAdded) {  
        if(ingredient.name.toLowerCase() === ingredientInfo.ingredientName.toLowerCase()) {
            var concatenatedLabels = ingredient.labels;
            ingredientInfo.ingredientLabels.forEach((label) => {

              //Add new label only if the list of labels does not already contain it.
              if(!(concatenatedLabels.includes(label))) {
                concatenatedLabels.push(label);
              }
            });         this.ingredients.splice(index, 1, new Ingredient(ingredientInfo.ingredientName.toLowerCase(), (Number(ingredientInfo.ingredientAmount) + Number(ingredient.amount)), concatenatedLabels));
            ingredientAdded=true;
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

  ngOnDestroy() : void {
    this.addIngredientsToShoppingListSubscription.unsubscribe();
  }
}
