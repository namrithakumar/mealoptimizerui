import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import * as OrderActions from '../actions/order.actions';
import { of } from 'rxjs';
import { OrderResponse } from '../../../../shared/model/order-response.model';

@Injectable()
export class OrderEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions) {}

@Effect()
placeOrder = this.actions$.pipe(
    ofType<OrderActions.CreateOrderStart>(OrderActions.CREATE_ORDER_START),
    switchMap((createOrderAction : OrderActions.CreateOrderStart) => {
        return this.http.post<OrderResponse>('http://localhost:9090/mealoptimizer/orders/save',
                createOrderAction.payload).pipe(
                    map((optimizedMealPlans : OrderResponse) => {
                        return new OrderActions.CreateOrderSuccess(optimizedMealPlans);
                    }),
                    catchError((error : any) => {
                        return of(new OrderActions.CreateOrderFail(error.error.message));
                    })
                )
    })
);
}