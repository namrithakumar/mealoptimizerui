import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../services/http/auth.service";
import { User } from "../user.model";
import { tap } from "rxjs/operators";

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
}