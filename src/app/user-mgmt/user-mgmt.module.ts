import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMgmtComponent } from '../user-mgmt/user-mgmt.component';
import { UserComponent } from './user/user.component';
import { UserMgmtRoutingModule } from '../user-mgmt/user-mgmt-routing.module';
import { CoreModule } from '../shared/core/core.module';

@NgModule({
    declarations : [
        UserMgmtComponent,
        UserComponent
    ],
    imports : [
        CommonModule,
        CoreModule,
        UserMgmtRoutingModule
    ]
})
export class UserMgmtModule {}