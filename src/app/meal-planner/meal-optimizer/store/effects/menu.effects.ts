import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/reducers/app.reducer';
import * as MenuActions from '../actions/menu.actions';
import { of } from 'rxjs';
import { ErrorDisplayService } from 'src/app/shared/services/error-display.service';
import { ConnectionStatusProviderService } from 'src/app/shared/services/connection-status-provider.service';

@Injectable()
export class MenuEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions, 
                private connectionStatusProviderService : ConnectionStatusProviderService,
                private errorDisplayService : ErrorDisplayService) {}

    @Effect()
    fetchMenuFromBackend = this.actions$.pipe(
        ofType<MenuActions.UpdateMenuStart>(MenuActions.UPDATE_MENU_START),
        switchMap((updateMenuAction : MenuActions.UpdateMenuStart) => {
            return this.http.get<String[]>('http://localhost:9090/mealoptimizer/menu/find',
                {
                    'params' : new HttpParams().set('category', updateMenuAction.payload.toString())
                }).pipe(map((menu : String[]) => {
                    return new MenuActions.UpdateMenuSuccess(menu);
                }),
                catchError(
                    (errorRes : any) => {
                        if(this.connectionStatusProviderService.getConnectionStatus() && errorRes.status !== 404 && errorRes.status !== 0) this.errorDisplayService.showError();
                        return of(new MenuActions.UpdateMenuFail('There was an error in retrieving the menu.'));
                    }
                ))
}));
}