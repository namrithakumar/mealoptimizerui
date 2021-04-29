import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/model/user.model';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import * as UserMgmtActions from 'src/app/user-mgmt/store/actions/user-mgmt.actions';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']    
})
export class HeaderComponent implements OnInit {
    
    authenticatedUser : User;

    constructor(private store : Store<AppState>, 
                private router: Router, 
                private keyCloakService : KeycloakService) {}

    ngOnInit(){
        this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
            if(!authenticatedUser.error) this.authenticatedUser = authenticatedUser.user;
        });
    }

    viewMealPlanner() : void {
        this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    }

    logout() : void {

        //Clear User state
        this.store.dispatch(new UserMgmtActions.Logout());
        
        //Logout of Keycloak
        this.keyCloakService.logout('http://localhost:4200/app-info/home');
    }
}