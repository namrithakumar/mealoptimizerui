import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterLoginGuardService } from '../shared/services/register-login-guard.service';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { UseDietTypeResolver } from '../shared/services/user-diet-type-resolver.service';
import { UsernameResolver } from '../shared/services/username-resolver.service';

const userMgmtRoutes : Routes = [];

@NgModule({
    imports: [RouterModule.forChild(userMgmtRoutes)],
    exports: [RouterModule]
})
export class UserMgmtRoutingModule {}