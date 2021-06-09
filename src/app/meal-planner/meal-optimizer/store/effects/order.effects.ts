import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';

import { OrderResponseHandler } from '../../../../shared/services/response-handler/order-response-handler';
import { OrderResponse } from '../../../../shared/model/order-response.model';
import * as OrderActions from '../actions/order.actions';
import { User } from 'src/app/shared/model/user.model';

import { environment } from '../../../../../environments/environment';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Injectable()
export class OrderEffects {

    /*
     * Read the authenticatedUser info from store to check login status.
     * The backend url changes based on the login status.
     */
    authenticatedUser : User;
    url : string;

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private orderResponseHandler : OrderResponseHandler,
                private store : Store<AppState>) {
        this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
                    this.authenticatedUser = authenticatedUser.user;
                    });            
                }

@Effect()
placeOrder = this.actions$.pipe(
    ofType<OrderActions.SaveOrderStart>(OrderActions.SAVE_ORDER_START),
    switchMap((createOrderAction : OrderActions.SaveOrderStart) => {
        /* 
         * If the user is logged in, the url to get meal plan is `${environment.hostUrl}/${environment.applicationName}/orders/user/save`
         * If the user is not logged in (user is guest), the url to get meal plan is `${environment.hostUrl}/${environment.applicationName}/orders/guest/compute`
         */
        if(this.authenticatedUser.loggedIn) {
            this.url = `${environment.hostUrl}/${environment.applicationName}/orders/user/save`;
        }
        else {
            this.url = `${environment.hostUrl}/${environment.applicationName}/orders/guest/compute`;
        }

        return this.http.post<OrderResponse>(this.url,
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