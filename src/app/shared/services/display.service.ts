import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserInputService } from './user-input.service';

@Injectable({providedIn:'root'})
export class DisplayService {

    canCollapseMealList : boolean;
    
    constructor(private authService : AuthService, private userInputService : UserInputService) {}

    getCollapsibleInd(mouseevent : String) : boolean {
        switch(mouseevent) {
            case 'mouseover':
                return false; 
                break;
            case 'mouseout':
                return true;
                break;
            default: return false;
        }
    }

    //Allow user to place order/get recipe
    allowUserToPlaceOrderOrGetRecipe() {
        return (this.userInputService.optimizationTypeSelected === 'optimizedByCost' || 
                this.userInputService.optimizationTypeSelected === 'optimizedByQuality');
    }

    getHideUserOptions() : boolean {
        return !(this.authService.loggedIn);
    }
}