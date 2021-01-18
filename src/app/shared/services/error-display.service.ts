import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { AppErrorDisplayComponent } from '../app-error-display/app-error-display.component';

@Injectable({ providedIn:'root' })
export class ErrorDisplayService {
 /*   private message = `Sorry, there was an error. Our engineers are  working hard to fix it, you will receive a notification as soon as it is fixed.`;
    private overlayRef: OverlayRef = null;

    constructor(private overlay : Overlay) {}

    public showOverlay() {
      console.log('Show overlay called');
        if (!this.overlayRef) {
            this.overlayRef = this.overlay.create();
          }
          const userProfilePortal = new ComponentPortal(AppErrorDisplayComponent);
          this.overlayRef.attach(userProfilePortal);
    }
    public hideOverlay() {
      console.log('Hide overlay called');      
        if (!!this.overlayRef) {
          this.overlayRef.detach();
        }
      }*/
}