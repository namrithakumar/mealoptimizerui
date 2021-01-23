import { OrderResponse } from '../../../../shared/model/order-response.model';
import { HttpRequestStatus } from '../../../../shared/http-request-status.enum';
import * as OrderActions from '../actions/order.actions';

export interface OptimizedMealPlans {
    optimizedMealPlans : OrderResponse,
    error : String,
    requestStatus : HttpRequestStatus
}

const defaultMealPlans : OptimizedMealPlans = {
    optimizedMealPlans : null,
    error : null,
    requestStatus : HttpRequestStatus.NO_ACTION
};

export function orderReducer(state : OptimizedMealPlans = defaultMealPlans, action : OrderActions.OrderActions) {
    switch(action.type) {

        case OrderActions.CREATE_ORDER_SUCCESS :
            return { ...state, optimizedMealPlans : action.payload, error : null, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED };

        case OrderActions.CREATE_ORDER_FAIL:
            return { ...state, optimizedMealPlans : null, error : action.payload, requestStatus : HttpRequestStatus.RESPONSE_RECEIVED };

        case OrderActions.UPDATE_REQUEST_STATUS:
            return { ...state, requestStatus : action.payload };

        case OrderActions.CLEAR_ORDER:
            return defaultMealPlans;
            
        default : return state;
    }
}