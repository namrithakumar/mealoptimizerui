import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as OrderActions from '../../../meal-planner/meal-optimizer/store/actions/order.actions';
import { OrderResponse } from '../../model/order-response.model';

@Injectable({ providedIn : 'root' })
export class OrderResponseHandler implements BaseResponseHandler {
    constructor() {}

    //action can be create/update    
    handleSuccess(optimizedMealPlans : OrderResponse, action: String) {
        switch(action) {
            case 'create' : return new OrderActions.CreateOrderSuccess(optimizedMealPlans);
        }
    }
    handleFailure(errorResponse: any, action : String) {
        switch(action) {
            case 'create' : return of(new OrderActions.CreateOrderFail(
                                    errorResponse));
        }
    }
}