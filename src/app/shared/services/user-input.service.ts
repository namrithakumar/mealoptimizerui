import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../ingredient.model';
import { OrderService } from './order.service';

@Injectable({providedIn:'root'})
export class UserInputService {

    constructor(private orderService: OrderService) {}

    userInput : {
        dietType : String,
        deliveryDate : Date,
        mealSelected : Array<String>
    } = 
    {
        dietType : new String(),
        deliveryDate : new Date(),
        mealSelected : new Array<String>()
    };

    optimizationTypeSelected : String;
    userInputSaved : boolean;

    updateUserInput(property:String, value:any) {
        this.userInput[property.toString()] = value;
        if(property === 'dietType') this.onDietTypeSelect.next(value);
        this.userInputSaved = false;
        this.orderService.updateOrderInfo(property, value);
    }

    addMeal(mealInfo : {itemPosition : number, itemName: String}) {
        this.userInput.mealSelected[mealInfo.itemPosition] = mealInfo.itemName;
        this.orderService.updateOrderInfo('mealSelected',this.userInput.mealSelected);
        this.userInputSaved = false;
    }

    setOptimizationTypeSelected(tabSelected : String) {
        this.optimizationTypeSelected = tabSelected;
        this.onOptimizationTypeSelected.next(this.optimizationTypeSelected);
    }

    //verify if all inputs are recieved
    verifyAllInputsReceived() : boolean {
        if(this.userInput.dietType !== undefined && this.userInput.deliveryDate !== undefined && this.userInput.mealSelected.length === 4) {
            return true;
        }
        else return false;
    }

    //verify if one or more inputs are recieved
    verifyOneOrMoreInputsReceived() : boolean {
        return (this.userInput.dietType !== undefined || this.userInput.deliveryDate !== undefined || this.userInput.mealSelected.length === 4)? true : false;
    }
 
    resetAllUserInputs() : void {
        this.userInput.mealSelected = new Array<String>();
        this.userInput.dietType = undefined;
        this.userInput.deliveryDate = undefined;
    }

    //userInputSaved is set to true when either get meal plan or update meal plan is clicked.
    setUserInputSaved(saved : boolean) {
        this.userInputSaved = saved;
    }

    onDietTypeSelect = new Subject<String>();

    onMealSelect = new Subject<String[]>();

    onOptimizationTypeSelected = new Subject< String >();

    onAddIngredientsToShoppingList = new Subject<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[]>();

    onEditIngredientsInShoppingList = new Subject< { indexOfIngredient : number, ingredient : Ingredient } >();
}