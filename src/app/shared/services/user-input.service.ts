import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({providedIn:'root'})
export class UserInputService {
    
    mealList : Array<String> = new Array<String>();
    dietType : String;
    deliveryDate : Date;
    tabSelected : String;

    setDietType(dietType : String) {        
        this.dietType = dietType;
    }

    setDeliveryDate(deliveryDate : Date) {
        this.deliveryDate = deliveryDate;
    }

    addMeal(mealInfo : {itemPosition : number, itemName: String}) {
        this.mealList[mealInfo.itemPosition] = mealInfo.itemName;
    }

    setTabSelected(tabSelected : String) {
        this.tabSelected = tabSelected;
    }

    onMealSelect = new EventEmitter<String[]>();

    getMealPlan = new EventEmitter< Array<String> >();

    onRecipeSelect = new EventEmitter<Recipe>();

    onAddIngredientsToShoppingList = new EventEmitter<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[]>();
}