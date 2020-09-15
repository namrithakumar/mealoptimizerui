import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DisplayService } from '../shared/services/display.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent {
    constructor(private authService : AuthService, private displayService : DisplayService, private router: Router, private userService: UserService) {}

    getHideUserOptions() : boolean {
        return this.displayService.getHideUserOptions();
    }

    getDisplayName() : String {
        return this.authService.getDisplayName();
    }

    viewProfile() : void {
        this.router.navigate(['/user-mgmt','user','user-profile', this.userService.user.username], { queryParams: {mode: 'view'} });
    }

    modifySettings() : void {
        this.router.navigate(['/user-mgmt','user','user-settings', this.userService.user.username], { queryParams: {mode: 'edit'} });
    }

    logout() : void {
        this.authService.logout();
        this.router.navigate(['/app-info','home']);
    }
}