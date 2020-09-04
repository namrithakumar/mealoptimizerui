import { Injectable, EventEmitter } from '@angular/core';
import { ItemService } from './item.service';
import { UserDietService } from './user-diet.service';
import { Meal } from '../meal.model';

@Injectable({providedIn:'root'})
export class OrderService {

    mealList = new Array<String>();
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
    
    onMealSelect = new EventEmitter<String[]>();

    getMealPlan = new EventEmitter< Array<String> >();
}