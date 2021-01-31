import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ErrorPageComponent } from '../error-page/error-page.component';
import { CustomOverlayComponent } from '../custom-overlay/custom-overlay.component';
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';

@NgModule({
  declarations: [
    ErrorPageComponent,
    CustomOverlayComponent,
    CustomNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ErrorPageComponent,
    CustomOverlayComponent,
    CustomNotificationComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ]
})
export class CoreModule { }