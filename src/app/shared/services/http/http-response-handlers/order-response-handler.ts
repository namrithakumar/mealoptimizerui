import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as OrderActions from '../../../../meal-planner/meal-optimizer/store/actions/order.actions';
import { ConnectionStatusProviderService } from '../../connection-status-provider.service';
import { ErrorDisplayService } from '../../error-display.service';
import { OrderResponse } from '../../../model/order-response.model';

@Injectable({ providedIn : 'root' })
export class OrderResponseHandler implements BaseResponseHandler {
    constructor( 
        private connectionStatusProviderService : ConnectionStatusProviderService,
        private errorDisplayService : ErrorDisplayService
        ) {}

    //action can be create/update    
    handleSuccess(optimizedMealPlans : OrderResponse, action: String) {
        switch(action) {
            case 'create' : return new OrderActions.CreateOrderSuccess(optimizedMealPlans);
        }
    }
    handleFailure(errorResponse: any, action : String) {
        if(this.connectionStatusProviderService.getConnectionStatus() && errorResponse.status !== 404 && errorResponse.status !== 0) this.errorDisplayService.showError();
        switch(action) {
            case 'create' : return of(new OrderActions.CreateOrderFail(
                                    'There was an error in creating the meal plan.'));
        }
    }
}