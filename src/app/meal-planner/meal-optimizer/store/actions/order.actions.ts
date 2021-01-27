import { Action } from '@ngrx/store';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import { HttpRequestStatus } from '../../../../shared/http-request-status.enum';

export const SAVE_ORDER_START = '[Get meal plan] SAVE_ORDER_START';
export const SAVE_ORDER_SUCCESS = '[Get meal plan] SAVE_ORDER_SUCCESS';
export const SAVE_ORDER_FAIL = '[Get meal plan] SAVE_ORDER_FAIL';
export const UPDATE_REQUEST_STATUS = '[Get meal plan] UPDATE_REQUEST_STATUS';
export const CLEAR_ORDER = '[Get meal plan] CLEAR_ORDER';

export class SaveOrderStart implements Action {
    readonly type = SAVE_ORDER_START;
    constructor(public payload : { id?: number, deliveryDate: String, mealSelected: Array<String>, optimizationTypes: Array<String>, username : String }) {}
}

export class SaveOrderSuccess implements Action {
    readonly type = SAVE_ORDER_SUCCESS;
    constructor(public payload : OrderResponse) {}
}

export class SaveOrderFail implements Action {
    readonly type = SAVE_ORDER_FAIL;
    constructor(public payload : String) {}
}

export class UpdateRequestStatus implements Action {
    readonly type = UPDATE_REQUEST_STATUS;
    constructor(public payload : HttpRequestStatus) {}
}

export class ClearOrder implements Action {
    readonly type = CLEAR_ORDER;
}

export type OrderActions = SaveOrderStart | SaveOrderSuccess | SaveOrderFail | UpdateRequestStatus | ClearOrder;