import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ErrorPageComponent } from '../core/error-page/error-page.component';
import { CustomOverlayComponent } from '../core/custom-overlay/custom-overlay.component';
import { CustomNotificationComponent } from '../core/custom-notification/custom-notification.component';

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