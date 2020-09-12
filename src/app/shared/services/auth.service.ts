import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn : 'root'})
export class AuthService {

    loggedIn : boolean = false;
    userDisplayName : String = 'Guest';

    constructor(private router : Router) {}

    isAuthenticated() {
            return new Promise(
                (resolve, reject) => {
                    resolve(this.loggedIn);
                }
            );
        }

    login() : void {
        this.loggedIn = true;
        this.userDisplayName = 'User';
    }

    logout() : void {
        this.loggedIn = false;
        this.userDisplayName = 'Guest';
    }

    getDisplayName() : String {
        return this.userDisplayName;
    }
}