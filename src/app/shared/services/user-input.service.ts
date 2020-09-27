import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { OrderService } from './order.service';

@Injectable({providedIn:'root'})
export class UserInputService {

    constructor(private orderService: OrderService) {}

    mealList : Array<String> = new Array<String>();
    dietType : String;
    deliveryDate : Date;
    tabSelected : String;
    userInputSaved : boolean;

    setDietType(dietType : String) {   
        this.dietType = dietType;
        this.orderService.updateUserDietType(this.dietType);
    }

    setDeliveryDate(deliveryDate : Date) {
        this.deliveryDate = deliveryDate;
        this.orderService.updateDeliveryDate(this.deliveryDate);
    }

    addMeal(mealInfo : {itemPosition : number, itemName: String}) {
        this.mealList[mealInfo.itemPosition] = mealInfo.itemName;
        this.orderService.updateMealSelected(this.mealList);
    }

    setTabSelected(tabSelected : String) {
        this.tabSelected = tabSelected;
    }

    //verify if all inputs are recieved
    verifyAllInputsReceived() : boolean {
        if(this.dietType !== undefined && this.deliveryDate !== undefined && this.mealList.length === 4) {
            return true;
        }
        else return false;
    }

    //verify if one or more inputs are recieved
    verifyOneOrMoreInputsReceived() : boolean {
        return (this.dietType !== undefined || this.deliveryDate !== undefined || this.mealList.length === 4)? true : false;
    }
 
    resetAllUserInputs() : void {
        this.mealList = new Array<String>();
        this.dietType = undefined;
        this.deliveryDate = undefined;
    }

    //userInputSaved is set to true when either get meal plan or update meal plan is clicked.
    setUserInputSaved(saved : boolean) {
        this.userInputSaved = saved;
    }

    onMealSelect = new Subject<String[]>();

    //This is a common event for both create meal plan and update
    getMealPlan = new Subject< String[] >();

    onAddIngredientsToShoppingList = new Subject<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[]>();

}