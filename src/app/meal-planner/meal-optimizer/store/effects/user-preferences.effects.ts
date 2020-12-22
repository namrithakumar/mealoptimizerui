import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { AppState } from '../../../../store/reducers/app.reducer';
import * as UserPreferencesActions from '../actions/user-preferences.actions';
import * as MenuActions from '../actions/menu.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class UserPreferencesEffects {

  constructor(private actions$ : Actions, private store : Store<AppState>) { }

  @Effect()
  dietTypeChanged = this.actions$.pipe(
      ofType<UserPreferencesActions.EditDietType>(UserPreferencesActions.EDIT_DIET_TYPE),
      map((editDietTypeAction : UserPreferencesActions.EditDietType) => {
        let dietType = editDietTypeAction.payload;
        return new MenuActions.UpdateMenuStart(dietType);
      }));
    }