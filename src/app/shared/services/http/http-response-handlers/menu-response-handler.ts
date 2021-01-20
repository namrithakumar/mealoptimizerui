import { Injectable } from '@angular/core';
import { BaseResponseHandler } from "./base-response-handler";
import * as MenuActions from '../../../../meal-planner/meal-optimizer/store/actions/menu.actions';
import { of } from 'rxjs';
import { ConnectionStatusProviderService } from '../../connection-status-provider.service';
import { ErrorDisplayService } from '../../error-display.service';

@Injectable({ providedIn: 'root' })
export class MenuResponseHandler implements BaseResponseHandler {

    constructor( 
        private connectionStatusProviderService : ConnectionStatusProviderService,
        private errorDisplayService : ErrorDisplayService
        ) {}

    handleSuccess(menu: String[]) {
        console.log('Inside MenuResponseHandler.handleSuccess');
        return new MenuActions.UpdateMenuSuccess(menu);
    }
    handleFailure(errorResponse: any) {
        console.log('Inside MenuResponseHandler.handleFailure');
        if(this.connectionStatusProviderService.getConnectionStatus() && errorResponse.status !== 404 && errorResponse.status !== 0) this.errorDisplayService.showError();
        return of(new MenuActions.UpdateMenuFail('There was an error in retrieving the menu.'));
    }

}