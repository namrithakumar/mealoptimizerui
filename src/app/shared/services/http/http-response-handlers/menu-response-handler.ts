import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as MenuActions from '../../../../meal-planner/meal-optimizer/store/actions/menu.actions';
import { ConnectionStatusHandlerService } from '../../connection-status-handler.service';
import { ErrorDisplayService } from '../../error-display.service';

@Injectable({ providedIn: 'root' })
export class MenuResponseHandler implements BaseResponseHandler {

    constructor( 
        private connectionStatusHandlerService : ConnectionStatusHandlerService,
        private errorDisplayService : ErrorDisplayService
        ) {}

    handleSuccess(menu: String[]) {      
        return new MenuActions.UpdateMenuSuccess(menu);
    }
    handleFailure(errorResponse: any) {
        if(this.connectionStatusHandlerService.getConnectionStatus() && errorResponse.status !== 404 && errorResponse.status !== 0) this.errorDisplayService.showError();
        return of(new MenuActions.UpdateMenuFail('There was an error in retrieving the menu.'));
    }

}