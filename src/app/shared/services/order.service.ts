import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserPreferences } from 'src/app/meal-planner/meal-optimizer/store/reducers/user-preferences.reducer';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { User } from '../model/user.model';

@Injectable({providedIn:'root'})
export class OrderService {

    orderRequest : { id?: number,
                     deliveryDate: String, 
                     mealSelected: Array<String>, 
                     optimizationTypes: Array<String>, 
                     username : String }; // This is different from order.model.ts since it will have the order response, this on the other hand is the order info entered by the user

    userPrefs : UserPreferences;

    constructor(private datePipe: DatePipe,
                private store : Store<AppState>) { 
                this.store.select('userPreferences').subscribe((userPrefs : UserPreferences) => {
                    this.userPrefs = userPrefs;
                  });
                }

    createOrderRequest(deliveryDate: Date, mealList: Array<String>, user : User, id? : number) {
      this.orderRequest =  {
            deliveryDate : this.datePipe.transform(deliveryDate, 'MM/dd/yyyy'),
            mealSelected : mealList,
            optimizationTypes : ['COST','REWARD'],
            username : user.username
        };

        //Set optional param id(orderId) if it is available. 'id' is available for update meal plan only, not for create meal plan.
        if(id) this.orderRequest.id = id;
        
        return this.orderRequest;
    }

    verifyAllInputsAreReceived() {
        return (this.userPrefs.dietType !==null &&
                this.userPrefs.deliveryDate !==null && 
                (this.userPrefs.mealSelected.filter(
                    (meal) => meal !== undefined ).length) === 4);
    }
}