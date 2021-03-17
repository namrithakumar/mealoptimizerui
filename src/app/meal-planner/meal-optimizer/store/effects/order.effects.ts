import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';

import { OrderResponseHandler } from '../../../../shared/services/response-handler/order-response-handler';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import * as OrderActions from '../actions/order.actions';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class OrderEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private orderResponseHandler : OrderResponseHandler) {}

@Effect()
placeOrder = this.actions$.pipe(
    ofType<OrderActions.SaveOrderStart>(OrderActions.SAVE_ORDER_START),
    switchMap((createOrderAction : OrderActions.SaveOrderStart) => {
        return this.http.post<OrderResponse>(`${environment.hostUrl}:${environment.port}/${environment.applicationName}/orders/user/save`,
                createOrderAction.payload).pipe(
                    map((optimizedMealPlans : OrderResponse) => {
                        return this.orderResponseHandler.handleSuccess(optimizedMealPlans);
                    }),
                    catchError((errorRes : any) => {
                        return this.orderResponseHandler.handleFailure(errorRes);
                    })
                )
    })
);
}