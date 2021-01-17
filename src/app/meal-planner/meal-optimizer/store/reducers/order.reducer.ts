import { OrderResponse } from '../../../../shared/model/order-response.model';
import { OptimizationStatus } from '../../../../shared/services/optimization-status.enum';
import * as OrderActions from '../actions/order.actions';

export interface OptimizedMealPlans {
    optimizedMealPlans : OrderResponse,
    error : String,
    status : OptimizationStatus
}

const defaultMealPlans : OptimizedMealPlans = {
    optimizedMealPlans : null,
    error : null,
    status : OptimizationStatus.NO_ACTION
};

export function orderReducer(state : OptimizedMealPlans = defaultMealPlans, action : OrderActions.OrderActions) {
    switch(action.type) {

        case OrderActions.CREATE_ORDER_SUCCESS :
            return { ...state, optimizedMealPlans : action.payload, error : null, status : OptimizationStatus.RESPONSE_RECEIVED };

        case OrderActions.CREATE_ORDER_FAIL:
            console.log('Inside reducer. Error set as ' + JSON.stringify(action.payload));
            return { ...state, optimizedMealPlans : null, error : action.payload, status : OptimizationStatus.RESPONSE_RECEIVED };

        case OrderActions.UPDATE_OPTIMIZATION_STATUS:
            return { ...state, status : action.payload };

        case OrderActions.CLEAR_ORDER:
            return defaultMealPlans;
            
        default : return state;
    }
}