import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { UserMgmtComponent } from '../user-mgmt/user-mgmt.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegisterComponent } from './user-register-login/user-register/user-register.component';
import { UserLoginComponent } from './user-register-login/user-login/user-login.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserMgmtRoutingModule } from '../user-mgmt/user-mgmt-routing.module';

@NgModule({
    declarations : [
        UserMgmtComponent,
        UserComponent,
        UserProfileComponent,
        UserRegisterComponent,
        UserLoginComponent,
        UserSettingsComponent
    ],
    imports : [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        UserMgmtRoutingModule
    ]
})
export class UserMgmtModule {}