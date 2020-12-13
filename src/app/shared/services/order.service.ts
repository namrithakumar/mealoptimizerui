import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({providedIn:'root'})
export class OrderService {

    orderRequest : { deliveryDate: String, mealSelected: Array<String>, optimizationTypes: Array<String>, username : String }; // This is different from order.model.ts since it will have the order response, this on the other hand is the order info entered by the user

    constructor(private datePipe: DatePipe) { }

    createOrderRequest(deliveryDate: Date, mealList: Array<String>, user : User) {
      this.orderRequest =  {
            deliveryDate : this.datePipe.transform(deliveryDate, 'MM/dd/yyyy'),
            mealSelected : mealList,
            optimizationTypes : ['COST','REWARD'],
            username : user.username
        };
        
        return this.orderRequest;
    }
}