import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import * as MenuActions from '../actions/menu.actions';
import { of } from 'rxjs';
import { OverlayDisplayService } from 'src/app/shared/services/overlay-display.service';

@Injectable()
export class MenuEffects {

    constructor(private http : HttpClient, 
                private actions$ : Actions,
                private overlayDisplayService : OverlayDisplayService) {}

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
                        if(errorRes.status !== 404 && errorRes.status !== 0) this.overlayDisplayService.showOverlay();
                        return of(new MenuActions.UpdateMenuFail('There was an error in retrieving the menu.'));
                    }
                ))
}));
}