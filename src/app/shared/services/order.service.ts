import { Injectable, EventEmitter } from '@angular/core';
import { ItemService } from './item.service';
import { UserDietService } from './user-diet.service';
import { Meal } from '../meal.model';

@Injectable({providedIn:'root'})
export class OrderService {

    selectedMealList = new Array<String>();
    dietType : String;
    deliveryDate : Date;

    constructor(private itemService : ItemService, private userDietService : UserDietService) {}

    setDietType(dietType : String) {
        this.dietType = dietType;
    }

    setDeliveryDate(deliveryDate : Date) {
        this.deliveryDate = deliveryDate;
    }

    addMeal(meal : Meal) {
        this.selectedMealList.push(meal.itemName);
    }
    
    onMealSelect = new EventEmitter<Meal>();
}