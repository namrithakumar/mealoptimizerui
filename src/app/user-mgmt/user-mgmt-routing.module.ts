import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterLoginGuardService } from '../shared/services/register-login-guard.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UserProfileComponent } from '../user-mgmt/user-profile/user-profile.component';
import { AuthReaderComponent } from "./auth/auth-reader/auth-reader.component";

const userMgmtRoutes : Routes = [
{path:'user-mgmt', children: [
    { path:'user', canActivate: [AuthGuardService], children: [
        { path:'user-profile', component: UserProfileComponent }]},
    { path:'auth/authCodeReader', component: AuthReaderComponent }    
]}];

@NgModule({
    imports: [RouterModule.forChild(userMgmtRoutes)],
    exports: [RouterModule]
})
export class UserMgmtRoutingModule {}