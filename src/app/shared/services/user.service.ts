import { Injectable } from '@angular/core';
import { User } from "../user.model";

@Injectable({providedIn: 'root'})
export class UserService {
    
    currentUserID : number;

    user: User = new User( 1,'hp','harry','potter','4 Privet Drive, Surrey',2000,2300 );

    constructor() { }

    getUserDetails(username: String) : User {
        if(username.toLowerCase() === this.user.username.toLowerCase()) return this.user;
    }
}