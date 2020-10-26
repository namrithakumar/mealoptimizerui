import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({ providedIn : 'root'})
export class AuthService {

    userDisplayName : String = 'Guest';

    isLoggedIn : boolean = false;
    
    user = new BehaviorSubject<User>(null);

    constructor(private router : Router, public http : HttpClient) {}

    isAuthenticated() : boolean {
        return this.isLoggedIn;
    }

    login(username:String, password: String) {
        this.isLoggedIn = true;
        const url='http://localhost:9090/mealoptimizer/user/login';
        return this.http.post<User>(url, { username : username, password : password})
            .pipe(catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            }), 
            tap((userData : User) => { 
                this.user.next(userData); }));
    }

    logout() : void {
        this.userDisplayName = 'Guest';
    }

    getDisplayName() : String {
        return this.userDisplayName;
    }
}