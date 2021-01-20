import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as OrderActions from '../actions/order.actions';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import { OrderResponseHandler } from '../../../../shared/services/http/http-response-handlers/order-response-handler';

@Injectable()
export class OrderEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private orderResponseHandler : OrderResponseHandler) {}

@Effect()
placeOrder = this.actions$.pipe(
    ofType<OrderActions.CreateOrderStart>(OrderActions.CREATE_ORDER_START),
    switchMap((createOrderAction : OrderActions.CreateOrderStart) => {
        return this.http.post<OrderResponse>('http://localhost:9090/mealoptimizer/orders/save',
                createOrderAction.payload).pipe(
                    map((optimizedMealPlans : OrderResponse) => {
                        return this.orderResponseHandler.handleSuccess(optimizedMealPlans, 'create');
                    }),
                    catchError((error : any) => {
                        return this.orderResponseHandler.handleFailure(error, 'create');
                    })
                )
    })
);
}