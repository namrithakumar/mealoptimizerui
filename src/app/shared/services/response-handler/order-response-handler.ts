import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as OrderActions from '../../../meal-planner/meal-optimizer/store/actions/order.actions';
import { OrderResponse } from '../../model/order-response.model';

@Injectable({ providedIn : 'root' })
export class OrderResponseHandler implements BaseResponseHandler {
    constructor() {}

    //action can be create/update    
    handleSuccess(optimizedMealPlans : OrderResponse) {
        return new OrderActions.SaveOrderSuccess(optimizedMealPlans);
    }
    
    handleFailure(errorResponse: any) {
        return of(new OrderActions.SaveOrderFail(errorResponse));
    }
}