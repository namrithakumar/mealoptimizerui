import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class OrderService {

    orderRequest : { deliveryDate: String, mealSelected: Array<String>, optimizationTypes: Array<String> }; // This is different from order.model.ts since it will have the order response, this on the other hand is the order info entered by the user

    constructor(private datePipe: DatePipe) { }

    createOrderRequest(deliveryDate: Date, mealList: Array<String>) {
      this.orderRequest =  {
            deliveryDate : this.datePipe.transform(deliveryDate, 'MM/dd/yyyy'),
            mealSelected : mealList,
            optimizationTypes : ['COST','REWARD']
        };
        
        return this.orderRequest;
    }

    updateOrderInfo(property:String, value:any) {
        if(this.orderRequest !== undefined) {
            this.orderRequest[property.toString()] = value;
            this.orderObservableSubject.next(this.orderRequest);
        }
    }

    //Setup Observable to track changes in Order object
        orderObservableSubject = new Subject<{ deliveryDate: String, mealSelected: Array<String>, optimizationTypes : Array<String> }>();
        orderObservable = this.orderObservableSubject.asObservable();
}