import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/app.reducer';
import * as MenuActions from '../../meal-planner/meal-optimizer/store/actions/menu.actions';
import * as OrderActions from '../../meal-planner/meal-optimizer/store/actions/order.actions';
import * as RecipeActions from '../../meal-planner/recipes/store/actions/recipes.actions';
import * as UserMgmtActions from '../../user-mgmt/store/actions/user-mgmt.actions';

@Injectable({ providedIn : 'root' })
export class ActionDispatcher {

    constructor(private store : Store<AppState>) {}

    public dispatchAction(request : any, tag : String) : void {
                
        //Logic to dispatch action based on tag
        switch(tag) {
            case 'menu-find' : {
                                    let dietType : String = request.params.map.get('category').toString();
                                    this.store.dispatch(new MenuActions.UpdateMenuStart(dietType));
                                    break;
                               }
            case 'orders-save' : {
                                    let orderRequest = request.body;
                                    this.store.dispatch(new OrderActions.SaveOrderStart(orderRequest));
                                    break;
                                 }                   
            case 'recipe-find' : {
                                    let itemNames : Array<String> = request.params.map.get('names');
                                    this.store.dispatch(new RecipeActions.FetchRecipesStart(itemNames));
                                    break;
                                 }                
        }
        return;
    }    
}