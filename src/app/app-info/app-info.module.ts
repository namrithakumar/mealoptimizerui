import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppInfoComponent } from '../app-info/app-info.component';
import { HomeComponent } from '../app-info/home/home.component';
import { ContactUsComponent } from '../app-info/contact-us/contact-us.component';
import { AppInfoRoutingModule } from '../app-info/app-info-routing.module';

@NgModule({
    declarations : [
        AppInfoComponent,
        HomeComponent,
        ContactUsComponent
    ],
    imports : [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        AppInfoRoutingModule
    ]
})
export class AppInfoModule {}