import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { UserMgmtComponent } from '../user-mgmt/user-mgmt.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register-login/user-register/user-register.component';
import { UserLoginComponent } from './user-register-login/user-login/user-login.component';
import { UserMgmtRoutingModule } from '../user-mgmt/user-mgmt-routing.module';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
    declarations : [
        UserMgmtComponent,
        UserComponent,
        UserProfileComponent,
        UserRegisterComponent,
        UserLoginComponent
    ],
    imports : [
        CommonModule,
        BrowserAnimationsModule,
        CoreModule,
        UserMgmtRoutingModule
    ]
})
export class UserMgmtModule {}