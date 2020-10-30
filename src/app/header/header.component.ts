import { Component } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { DisplayService } from '../shared/services/display.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent {
    constructor(private userService : UserService, private displayService : DisplayService, private router: Router) {}

    viewMealPlanner() : void {
        this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    }

    getHideUserOptions() : boolean {
        return this.displayService.getHideUserOptions();
    }

    getDisplayName() : String {
        this.userService.user.subscribe((user : User) => {
            return (user) ? user.username : 'Guest';
        });
        return 'Guest';
    }

    viewProfile() : void {
        //this.router.navigate(['/user-mgmt','user','user-profile', this.userService.user.username], { queryParams: {mode: 'view'} });
    }

    modifySettings() : void {
        //this.router.navigate(['/user-mgmt','user','user-settings', this.userService.user.username], { queryParams: {mode: 'edit'} });
    }

    logout() : void {
        this.userService.logout();
        this.router.navigate(['/app-info','home']);
    }
}