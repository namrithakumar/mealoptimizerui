import { Injectable, EventEmitter } from '@angular/core';
import { ItemService } from './item.service';
import { UserDietService } from './user-diet.service';

@Injectable({providedIn:'root'})
export class OrderService {

    mealList : Array<String> = new Array<String>();
    dietType : String;
    deliveryDate : Date;

    constructor(private itemService : ItemService, private userDietService : UserDietService) {}

    setDietType(dietType : String) {        
        this.dietType = dietType;
    }

    setDeliveryDate(deliveryDate : Date) {
        this.deliveryDate = deliveryDate;
    }

    addMeal(mealInfo : {itemPosition : number, itemName: String}) {
        this.mealList[mealInfo.itemPosition] = mealInfo.itemName;
    }
 
    getOrderInfo() {
        return { 
            userDietType: this.dietType, 
            deliveryDate: this.deliveryDate, 
            mealSelected: this.mealList
        };
    }
    onMealSelect = new EventEmitter<String[]>();

    getMealPlan = new EventEmitter< Array<String> >();

    //Action refers to place Order/get Recipe
    onActionSelected = new EventEmitter< String >();
}