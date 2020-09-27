import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({providedIn:'root'})
export class DisplayService {

    canCollapseMealList : boolean;
    
    constructor(private authService : AuthService) {}

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

    getHideUserOptions() : boolean {
        return !(this.authService.loggedIn);
    }
}