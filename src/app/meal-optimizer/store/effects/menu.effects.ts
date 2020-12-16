import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/reducers/app.reducer';
import * as MenuActions from '../actions/menu.actions';
import { of, throwError } from 'rxjs';

@Injectable()
export class MenuEffects {

    constructor(private http : HttpClient, private actions$ : Actions, private store : Store<AppState>) {}

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
                        return of(new MenuActions.UpdateMenuFail('There was an error in retrieving the menu. Error was : ' + errorRes.error));
                    }
                ))
}));
}