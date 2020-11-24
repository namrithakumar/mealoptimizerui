import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { AppState } from '../store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from '../user-mgmt/store/reducers/user-mgmt.reducer';
import * as UserMgmtActions from '../user-mgmt/store/actions/user-mgmt.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
    
})
export class HeaderComponent implements OnInit {
    
    authenticatedUser : User;

    constructor(private store : Store<AppState>, private router: Router) {}

    ngOnInit(){
        /*
        this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
            if(!authenticatedUser.error) this.authenticatedUser = authenticatedUser.user;
        });*/
    }

    viewMealPlanner() : void {
        this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    }

    viewOrModifyProfile() : void {
        this.router.navigate(['/user-mgmt','user','user-profile'], { queryParams: {mode: 'view'} });
    }

    logout() : void {
        this.store.dispatch(new UserMgmtActions.Logout());
        this.router.navigate(['/app-info','home']);
    }
}