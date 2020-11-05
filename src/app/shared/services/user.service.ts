import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { AuthService } from "../services/http/auth.service";
import { UserSignUpRequest } from "../model/user-signup-request.model";
import { catchError, tap } from "rxjs/operators";
import { Nutrient } from "../model/nutrient.model";
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn : 'root' })
export class UserService {
    
    user = new BehaviorSubject<User>(null);

    tokenExpirationTimer : number;

    constructor(private authService : AuthService, private http : HttpClient, private router : Router, private jwtHelper:JwtHelperService) {}

    login(username:String, password: String) {
        return this.authService.login(username, password).pipe( 
            tap((userData : User) => {
                userData.tokenExpiryDate = new Date(new Date().getTime() + userData.tokenValidTime);
                localStorage.setItem('userData' , JSON.stringify(userData));
                this.user.next(userData);
                this.autoLogout(userData.tokenValidTime);
            }));
    }

    signup(userSignUpRequest : UserSignUpRequest) {
        return this.authService.signup(userSignUpRequest).pipe(
            tap((userData : User) => {
                userData.tokenExpiryDate = new Date(new Date().getTime() + userData.tokenValidTime);
                localStorage.setItem('userData' , JSON.stringify(userData));
                this.user.next(userData);
                this.autoLogout(userData.tokenValidTime); 
            })
        );
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    }

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

    createUserRequest(userSignupInputs) : UserSignUpRequest {
        //userSignupInputs.nutrients is an array of objects
        let minMaxNutrientLimits = this.parseNutrientLimits(userSignupInputs.nutrients);
        let usersignupReq = new UserSignUpRequest(userSignupInputs.signupInfo.username, userSignupInputs.signupInfo.password, userSignupInputs.signupInfo.email, userSignupInputs.preferredDietType, minMaxNutrientLimits.nutrientMinLimits, minMaxNutrientLimits.nutrientMinLimits);
        return usersignupReq;
    }

    private parseNutrientLimits(limitInfo : { name: String, min:number, max:number}[]) :  { nutrientMinLimits : {}, nutrientMaxLimits: {}} {
        let nutrientMinLimitMap = new Map<String, number>();
        let nutrientMaxLimitMap = new Map<String, number>();
        limitInfo.forEach((nutrient : { name:string, min:number, max:number }) => {
            nutrientMinLimitMap.set(nutrient.name, nutrient.min);
            nutrientMaxLimitMap.set(nutrient.name, nutrient.max);
        });
        return { nutrientMinLimits : this.convertMapToObj(nutrientMinLimitMap), nutrientMaxLimits: this.convertMapToObj(nutrientMaxLimitMap)};
    }

    private convertMapToObj(limitMap : Map<String, number>) {
        let nutrientLimitObj = {};
        limitMap.forEach((value : number, key : string) => {
            nutrientLimitObj[key.toString()] = value;
        });
        return nutrientLimitObj;
    }

    autoLogin() {
      const userData = JSON.parse(localStorage.getItem('userData'));
      let loadedUser : User;
      if(!userData || (this.jwtHelper.isTokenExpired(userData.token))) {
        return;
    }
      else { 
        loadedUser = new User(userData.id, userData.username, userData.email, userData.preferredDietType, userData.nutrientMinLimits, userData.nutrientMaxLimits, userData.token, userData._tokenValidTime, userData.tokenExpiryDate);  
        this.user.next(loadedUser);
        this.autoLogout(new Date(loadedUser.tokenExpiryDate).getTime() - new Date().getTime());
      }
    }

    autoLogout(expirationDuration : number) {
        this.tokenExpirationTimer = setTimeout(this.logout, expirationDuration);       
    }
}