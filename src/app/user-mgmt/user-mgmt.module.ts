import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserMgmtRoutingModule } from '../user-mgmt/user-mgmt-routing.module';
import { CoreModule } from '../shared/core/core.module';
import { UserRedirectComponent } from './user-redirect/user-redirect.component';

@NgModule({
  declarations: [UserRedirectComponent],
  imports: [
    CommonModule,
    CoreModule,
    UserMgmtRoutingModule
  ]
})
export class UserMgmtModule { }
