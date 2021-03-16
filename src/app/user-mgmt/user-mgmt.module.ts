import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMgmtComponent } from '../user-mgmt/user-mgmt.component';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserMgmtRoutingModule } from '../user-mgmt/user-mgmt-routing.module';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
    declarations : [
        UserMgmtComponent,
        UserComponent,
        UserProfileComponent
    ],
    imports : [
        CommonModule,
        CoreModule,
        UserMgmtRoutingModule
    ]
})
export class UserMgmtModule {}