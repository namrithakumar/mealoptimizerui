import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from './user.service';

@Injectable({ providedIn : 'root'})
export class AuthService {

    loggedIn : boolean = false;
    userDisplayName : String = 'Guest';

    constructor(private router : Router, private userService: UserService) {}

    isAuthenticated() : boolean {
        return this.loggedIn;
    }

    login() : void {
        this.loggedIn = true;
        this.userDisplayName = 'User : ' + this.userService.user.username;
    }

    logout() : void {
        this.loggedIn = false;
        this.userDisplayName = 'Guest';
    }

    getDisplayName() : String {
        return this.userDisplayName;
    }
}