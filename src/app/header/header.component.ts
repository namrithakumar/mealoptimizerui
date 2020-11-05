import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { DisplayService } from '../shared/services/display.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent implements OnInit {
    
    authenticatedUser : User;

    constructor(private userService : UserService, private displayService : DisplayService, private router: Router) {}

    ngOnInit(){
        this.userService.user.subscribe((user : User) => {
            this.authenticatedUser = user;
        });
    }

    viewMealPlanner() : void {
        this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    }

    viewOrModifyProfile() : void {
        this.router.navigate(['/user-mgmt','user','user-profile'], { queryParams: {mode: 'view'} });
    }

    logout() : void {
        this.userService.logout();
        this.router.navigate(['/app-info','home']);
    }
}