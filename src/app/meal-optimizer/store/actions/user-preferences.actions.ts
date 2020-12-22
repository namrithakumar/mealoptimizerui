import { Action } from '@ngrx/store';

export const EDIT_DIET_TYPE = '[User preferences] EDIT_DIET_TYPE';
export const EDIT_DELIVERY_DATE = '[User preferences] EDIT_DELIVERY_DATE';
export const UPDATE_MEAL = '[User preferences] UPDATE_MEAL';
export const OPTIMIZATION_TYPE_SELECTED = '[User preferences] OPTIMIZATION_TYPE_SELECTED';
export const CLEAR_USER_PREFERENCES = '[User preferences] CLEAR_USER_PREFERENCES';

export class EditDietType implements Action {
	readonly type = EDIT_DIET_TYPE;
	constructor(public payload : String) {}
}

export class EditDeliveryDate implements Action {
	readonly type = EDIT_DELIVERY_DATE;
	constructor(public payload : Date) {}
}

export class UpdateMeal implements Action {
	readonly type = UPDATE_MEAL;
	constructor(public payload : {itemPosition: number, itemName: String}) {} //Payload refers to name of item to be added to meal list
}

export class OptimizationTypeSelected implements Action {
	readonly type = OPTIMIZATION_TYPE_SELECTED;
	constructor(public payload : String) {}
}

export class ClearUserPreferences implements Action {
	readonly type = CLEAR_USER_PREFERENCES;
}

export type UserPreferencesActions = EditDietType | EditDeliveryDate | UpdateMeal | OptimizationTypeSelected | ClearUserPreferences;