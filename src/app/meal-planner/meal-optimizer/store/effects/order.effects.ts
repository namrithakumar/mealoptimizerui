import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers/app.reducer';
import * as OrderActions from '../actions/order.actions';
import { of } from 'rxjs';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import { OverlayDisplayService } from 'src/app/shared/services/overlay-display.service';

@Injectable()
export class OrderEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions, 
                private store : Store<AppState>,
                private overlayDisplayService : OverlayDisplayService) {}

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
                        if(error.status !== 404 && error.status !== 0) this.overlayDisplayService.showOverlay();
                        return of(new OrderActions.CreateOrderFail(error.error.message));
                    })
                )
    })
);
}