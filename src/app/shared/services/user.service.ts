import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { UserSignUpRequest } from "../model/user-signup-request.model";
import { catchError } from "rxjs/operators";
import { Nutrient } from "../model/nutrient.model";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn : 'root' })
export class UserService {
 
    constructor(private http : HttpClient, private router : Router, private jwtHelper:JwtHelperService) {}

    fetchAllUsernames() : Observable<Array<String>> {
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

    createUserSignupRequest(userSignupInputs) : UserSignUpRequest {
        //userSignupInputs.nutrients is an array of objects
        let minMaxNutrientLimits = this.parseNutrientLimits(userSignupInputs.nutrients);
        let usersignupReq = new UserSignUpRequest(userSignupInputs.signupInfo.username, userSignupInputs.signupInfo.password, userSignupInputs.signupInfo.email, userSignupInputs.preferredDietType, minMaxNutrientLimits.nutrientMinLimits, minMaxNutrientLimits.nutrientMinLimits);
        return usersignupReq;
    }

    // The nutrient min-max elements for each user is stored as { nutrientName, min, max }
    // We split it into 2 separate objects - { nutrientName, min } and { nutrientName, max} to mae it easier to handle. 
    private parseNutrientLimits(limitInfo : { name: String, min:number, max:number}[]) :  { nutrientMinLimits : {}, nutrientMaxLimits: {}} {
        let nutrientMinLimitMap = new Map<String, number>();
        let nutrientMaxLimitMap = new Map<String, number>();
        limitInfo.forEach((nutrient : { name:string, min:number, max:number }) => {
            nutrientMinLimitMap.set(nutrient.name, nutrient.min);
            nutrientMaxLimitMap.set(nutrient.name, nutrient.max);
        });
        //return { nutrientMinLimits : this.convertMapToObj(nutrientMinLimitMap), nutrientMaxLimits: this.convertMapToObj(nutrientMaxLimitMap)};
        return { nutrientMinLimits : Object.fromEntries(nutrientMinLimitMap), nutrientMaxLimits: Object.fromEntries(nutrientMaxLimitMap)};
    }
}