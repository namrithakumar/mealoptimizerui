import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Injectable({providedIn:'root'})
export class UserInputService {
    
    mealList : Array<String> = new Array<String>();
    dietType : String;
    deliveryDate : Date;
    tabSelected : String;
    getMealPlanClicked: boolean;

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

    setGetMealPlanClicked(getMealPlanClicked : boolean) {
        this.getMealPlanClicked = getMealPlanClicked;
    }

    //verify if all inputs are recieved
    verifyAllInputsReceived() : boolean {
        return (this.dietType !== undefined && this.deliveryDate !== undefined && this.mealList.length === 4)? true : false;
    }

    //verify if one or more inputs are recieved
    verifyOneOrMoreInputsReceived() : boolean {
        return (this.dietType !== undefined || this.deliveryDate !== undefined || this.mealList.length === 4)? true : false;
    }
 
    resetAllUserInputs() : void {
        this.mealList = new Array<String>();
        this.dietType = undefined;
        this.deliveryDate = undefined;
        this.getMealPlanClicked = false;   
    }

    onMealSelect = new EventEmitter<String[]>();

    getMealPlan = new EventEmitter< Array<String> >();

    onRecipeSelect = new EventEmitter<Recipe>();

    onAddIngredientsToShoppingList = new EventEmitter<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[]>();
}