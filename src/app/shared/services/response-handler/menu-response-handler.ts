import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { BaseResponseHandler } from "./base-response-handler";
import * as MenuActions from '../../../meal-planner/meal-optimizer/store/actions/menu.actions';

@Injectable({ providedIn: 'root' })
export class MenuResponseHandler implements BaseResponseHandler {

    constructor() {}

    handleSuccess(menu: String[]) {      
        return new MenuActions.UpdateMenuSuccess(menu);
    }
    handleFailure(errorResponse: any) {
        return of(new MenuActions.UpdateMenuFail(
            errorResponse));
    }

}