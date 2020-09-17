import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class OrderService {

    order : { userDietType: String, deliveryDate: Date, mealSelected: Array<String> }; // This is different from order.model.ts since it will have the order response, this on the other hand is the order info entered by the user

    constructor() { }

    createOrder(userDietType: String, deliveryDate: Date, mealList: Array<String>) {
        this.order = {
            userDietType : userDietType,
            deliveryDate : deliveryDate,
            mealSelected : mealList
        };
        
    }

    updateUserDietType(userDietType : String): void {
        if(this.order !== undefined) { 
            this.order.userDietType = userDietType;
            this.orderObservableSubject.next(this.order);
        }
    }

    updateDeliveryDate(deliveryDate : Date): void {
        if(this.order !== undefined) {
            this.order.deliveryDate = deliveryDate;
            this.orderObservableSubject.next(this.order);
        };
    }

    updateMealSelected(mealList : Array<String>) : void {
        if(this.order !== undefined) {
            this.order.mealSelected = mealList;
            this.orderObservableSubject.next(this.order);
        }
    }

    //Setup Observable to track changes in Order object
        orderObservableSubject = new Subject<{ userDietType: String, deliveryDate: Date, mealSelected: Array<String> }>();
        orderObservable = this.orderObservableSubject.asObservable();
}