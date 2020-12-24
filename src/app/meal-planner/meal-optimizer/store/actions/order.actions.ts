import { Action } from '@ngrx/store';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import { OptimizationStatus } from '../../../../shared/services/optimization-status.enum';

export const CREATE_ORDER_START = '[Get meal plan] CREATE_ORDER_START';
export const CREATE_ORDER_SUCCESS = '[Get meal plan] CREATE_ORDER_SUCCESS';
export const CREATE_ORDER_FAIL = '[Get meal plan] CREATE_ORDER_FAIL';
export const UPDATE_OPTIMIZATION_STATUS = '[Get meal plan] UPDATE_OPTIMIZATION_STATUS';
export const CLEAR_ORDER = '[Get meal plan] CLEAR_ORDER';

export class CreateOrderStart implements Action {
    readonly type = CREATE_ORDER_START;
    constructor(public payload : { deliveryDate: String, mealSelected: Array<String>, optimizationTypes: Array<String>, username : String }) {}
}

export class CreateOrderSuccess implements Action {
    readonly type = CREATE_ORDER_SUCCESS;
    constructor(public payload : OrderResponse) {}
}

export class CreateOrderFail implements Action {
    readonly type = CREATE_ORDER_FAIL;
    constructor(public payload : String) {}
}

export class UpdateOptimizationStatus implements Action {
    readonly type = UPDATE_OPTIMIZATION_STATUS;
    constructor(public payload : OptimizationStatus) {}
}

export class ClearOrder implements Action {
    readonly type = CLEAR_ORDER;
}

export type OrderActions = CreateOrderStart | CreateOrderSuccess | CreateOrderFail | UpdateOptimizationStatus | ClearOrder;