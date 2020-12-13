import * as UserPreferenceActions from '../actions/user-preferences.actions';

export interface UserPreferences {
        dietType : String,
        deliveryDate : Date,
        mealSelected : Array<String>,
	    optimizationTypeSelected : String;
}

const defaultPreferences : UserPreferences = {
        dietType : null,
        deliveryDate : null,
        mealSelected : new Array<String>(4),
	    optimizationTypeSelected : null
};


export function userPreferencesReducer(state : UserPreferences = defaultPreferences, action : UserPreferenceActions.UserPreferencesActions) : UserPreferences {
	switch(action.type) {
		
		case UserPreferenceActions.EDIT_DIET_TYPE : 
            return { ...state, dietType : action.payload };
        
        case UserPreferenceActions.EDIT_DELIVERY_DATE : 
            return { ...state, deliveryDate : action.payload };
			
		case UserPreferenceActions.UPDATE_MEAL:
            //Copy meals upto indexOfMeal to be updated, copy updated meal at index, copy rest of the array
            let modifiedMealList : Array<String> = [...state.mealSelected];
            modifiedMealList[action.payload.itemPosition] = action.payload.itemName;
            return {...state, mealSelected: modifiedMealList };
 
        case UserPreferenceActions.OPTIMIZATION_TYPE_SELECTED:
            return {...state, optimizationTypeSelected : action.payload};

        default : return state;
    }
}