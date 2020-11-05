import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { User } from '../../user.model';
import { UserSignUpRequest } from '../../model/user-signup-request.model';
import { catchError, tap} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({ providedIn : 'root'})
export class AuthService {

    constructor(private router : Router, public http : HttpClient) {}

    login(username:String, password: String) : Observable<User> {
        const loginurl = 'http://localhost:9090/mealoptimizer/user/login';
        return this.http.post<User>(loginurl, { username : username, password : password})
            .pipe(catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            }));
    }

    signup(userSignUpRequest : UserSignUpRequest) : Observable<User> {
        const signupurl = 'http://localhost:9090/mealoptimizer/user/register';
        return this.http.post<User>(signupurl, userSignUpRequest)
            .pipe(
                catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            })
        );
    }
}