import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { AuthService } from "../services/http/auth.service";
import { User } from "../user.model";
import { catchError, tap } from "rxjs/operators";
import { Nutrient } from "../model/nutrient.model";
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn : 'root' })
export class UserService {
    
    userDisplayName : String = 'Guest';

    user = new BehaviorSubject<User>(null);

    constructor(private authService : AuthService, private http : HttpClient) {}

    login(username:String, password: String) {
        return this.authService.login(username, password).pipe( 
            tap((userData : User) => { 
                this.user.next(userData); 
            }));
    }

    logout() : void {
        this.userDisplayName = 'Guest';
    }

    fetchAllUsernames() : Observable<Array<String>> {
        console.log('Sent request to get all usernames');
        const url = 'http://localhost:9090/mealoptimizer/user/fetchAllUsernames';
        return this.http.get<String[]>(url).pipe(
            catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            })
        );
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