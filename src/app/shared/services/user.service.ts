import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../services/http/auth.service";
import { User } from "../user.model";
import { tap } from "rxjs/operators";
import { Nutrient } from "../model/nutrient.model";

@Injectable({ providedIn : 'root' })
export class UserService {
    
    userDisplayName : String = 'Guest';

    user = new BehaviorSubject<User>(null);

    constructor(private authService : AuthService) {}

    login(username:String, password: String) {
        return this.authService.login(username, password).pipe( 
            tap((userData : User) => { 
                this.user.next(userData); 
            }));
    }

    logout() : void {
        this.userDisplayName = 'Guest';
    }

    getDefaultNutrientLimits() : Nutrient[] {
        const defaultNutrients = new Array<Nutrient>();
        defaultNutrients.push(
            new Nutrient('calories', 2000, 2400, 'cal'),
            new Nutrient('carbs', 105, 500, 'g'),
            new Nutrient('protein', 20, 200, 'g'),
            new Nutrient('fat', 5, 80, 'g'),
            new Nutrient('sodium', 30, 5000, 'mg'),
            new Nutrient('calcium', 100, 5000, 'mg'));
        return defaultNutrients;
    }
}