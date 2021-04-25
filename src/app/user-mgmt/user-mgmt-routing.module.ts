import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UserRedirectComponent } from '../user-mgmt/user-redirect/user-redirect.component';

const userMgmtRoutes : Routes = [
        { path: 'meal-planner/meal-optimizer/user-redirect', //canActivate: [AuthGuardService], 
        component: UserRedirectComponent 
    }];
    
    @NgModule({
        imports: [RouterModule.forChild(userMgmtRoutes)],
        exports: [RouterModule]
    })
    export class UserMgmtRoutingModule {}