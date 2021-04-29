import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/reducers/app.reducer';
import * as MenuActions from '../../meal-planner/meal-optimizer/store/actions/menu.actions';
import * as OrderActions from '../../meal-planner/meal-optimizer/store/actions/order.actions';
import * as RecipeActions from '../../meal-planner/recipes/store/actions/recipes.actions';
import { HttpRequestStatus } from '../http-request-status.enum';

@Injectable({ providedIn : 'root' })
export class ActionDispatcher {

    constructor(private store : Store<AppState>) {}

    public dispatchAction(request : any, tag : String) : void {
                
        //Logic to dispatch action based on tag
        switch(tag) {
            /*
             * NOTE: Logic for tag 'categories-fetch' is not included since this request is never stored in failed request db.
             * The meal-planner/meal-optimizer page is loaded only if the connection is available.
            */
            case 'menu-find' : {                
                                    let dietType : String = request.params.map.get('category').toString();
                                    this.store.dispatch(new MenuActions.UpdateMenuStart(dietType));
                                    break;
                               }
            case 'orders-user' :
            case 'orders-guest':     
                                {
                                    this.store.dispatch(new OrderActions.UpdateRequestStatus(HttpRequestStatus.REQUEST_SENT));
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