import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { DisplayService } from '../shared/services/display.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent {
    constructor(private authService : AuthService, private displayService : DisplayService, private router: Router) {}

    getHideUserOptions() : boolean {
        return this.displayService.getHideUserOptions();
    }

    getDisplayName() : String {
        return this.authService.getDisplayName();
    }

    logout() : void {
        this.authService.logout();
        this.router.navigate(['/app-info','home']);
    }
}