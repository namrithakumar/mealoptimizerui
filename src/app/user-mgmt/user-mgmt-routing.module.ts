import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterLoginGuardService } from '../shared/services/register-login-guard.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UserProfileComponent } from '../user-mgmt/user-profile/user-profile.component';

const userMgmtRoutes : Routes = [
{path:'user-mgmt', children: [
    { path:'user', canActivate: [AuthGuardService], children: [
        { path:'user-profile', component: UserProfileComponent }]}
]}];

@NgModule({
    imports: [RouterModule.forChild(userMgmtRoutes)],
    exports: [RouterModule]
})
export class UserMgmtRoutingModule {}