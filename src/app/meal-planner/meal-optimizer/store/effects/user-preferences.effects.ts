import { Injectable } from '@angular/core';
import { Effect } from '@ngrx/effects';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import * as UserPreferencesActions from '../actions/user-preferences.actions';
import * as MenuActions from '../actions/menu.actions';

@Injectable()
export class UserPreferencesEffects {

  constructor(private actions$ : Actions) { }

  @Effect()
  dietTypeChanged = this.actions$.pipe(
      ofType<UserPreferencesActions.EditDietType>(UserPreferencesActions.EDIT_DIET_TYPE),
      map((editDietTypeAction : UserPreferencesActions.EditDietType) => {
        let dietType = editDietTypeAction.payload;
        return new MenuActions.UpdateMenuStart(dietType);
      }));
    }