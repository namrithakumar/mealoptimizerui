import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { User } from '../../user.model';
import { catchError} from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';

@Injectable({ providedIn : 'root'})
export class AuthService {

    constructor(private router : Router, public http : HttpClient) {}

    login(username:String, password: String) {
        const url='http://localhost:9090/mealoptimizer/user/login';
        return this.http.post<User>(url, { username : username, password : password})
            .pipe(catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            }));
    }
}