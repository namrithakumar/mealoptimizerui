import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class DisplayService {
    
    constructor(private authService : AuthService) {}

    getCollapsibleInd(mouseevent : String, value : any) : boolean {
        switch(mouseevent) {
            case 'mouseover':
                if(value !== undefined) return false; 
                break;
            case 'mouseout':
                if(value !== undefined) return true;
                break;
            default: return false;
        }
    }

    getCollapsibleIndMealSelector(mouseevent : String, mealList : String[], getMealPlanInd : boolean) {
        if(mealList.length === 4 && getMealPlanInd === true) {
        switch(mouseevent) {
            case 'mouseover':
                 return false;
            case 'mouseout':
                return true;
        }
        return false;
       }
    }

    getHideUserOptions() : boolean {
        return !(this.authService.loggedIn);
    }
}