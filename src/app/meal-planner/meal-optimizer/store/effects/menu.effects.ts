import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, share } from 'rxjs/operators';

import * as MenuActions from '../actions/menu.actions';
import { MenuResponseHandler } from '../../../../shared/services/response-handler/menu-response-handler';

import { environment } from '../../../../../environments/environment';

@Injectable()
export class MenuEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private menuResponseHandler : MenuResponseHandler) {}

    @Effect()
    fetchMenuFromBackend = this.actions$.pipe(
        ofType<MenuActions.UpdateMenuStart>(MenuActions.UPDATE_MENU_START),
        switchMap((updateMenuAction : MenuActions.UpdateMenuStart) => {
            return this.http.get<String[]>(`${environment.hostUrl}:${environment.port}/${environment.applicationName}/menu/find`,
                {
                    'params' : new HttpParams().set('category', updateMenuAction.payload.toString())
                }).pipe(share(),
                map(
                    (menu : String[]) => {
                        return this.menuResponseHandler.handleSuccess(menu);
                }),
                catchError(
                    (errorRes : any) => {
                        return this.menuResponseHandler.handleFailure(errorRes);
                    }
                ))
    }));
}