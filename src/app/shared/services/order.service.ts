import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({providedIn:'root'})
export class OrderService {

    order : { dietType: String, deliveryDate: Date, mealSelected: Array<String> }; // This is different from order.model.ts since it will have the order response, this on the other hand is the order info entered by the user

    constructor() { }

    createOrder(dietType: String, deliveryDate: Date, mealList: Array<String>) {
        this.order = {
            dietType : dietType,
            deliveryDate : deliveryDate,
            mealSelected : mealList
        };
        
    }

    updateOrderInfo(property:String, value:any) {
        if(this.order !== undefined) {
            this.order[property.toString()] = value;
            this.orderObservableSubject.next(this.order);
        }
    }

    //Setup Observable to track changes in Order object
        orderObservableSubject = new Subject<{ dietType: String, deliveryDate: Date, mealSelected: Array<String>}>();
        orderObservable = this.orderObservableSubject.asObservable();
}