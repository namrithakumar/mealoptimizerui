import { Injectable, EventEmitter } from '@angular/core';
import { UserInputService } from './user-input.service';

@Injectable({providedIn:'root'})
export class OrderService {

    constructor(private userInputService : UserInputService) {}

    getOrderInfo() {
        return { 
            userDietType: this.userInputService.dietType, 
            deliveryDate: this.userInputService.deliveryDate, 
            mealSelected: this.userInputService.mealList
        };
    }    
}