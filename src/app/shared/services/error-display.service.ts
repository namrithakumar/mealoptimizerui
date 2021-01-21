import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

@Injectable({ providedIn:'root' })
export class ErrorDisplayService {
    private overlayRef : OverlayRef;

    constructor(private overlay : Overlay) {}

    public showError() {
      this.overlayRef = this.overlay.create();
      const componentPortal = new ComponentPortal(AppErrorDisplayComponent);
      this.overlayRef.addPanelClass("example-overlay");
      this.overlayRef.attach(componentPortal); 
  }

  public hideError() {      
      if (!!this.overlayRef) {
        this.overlayRef.detach();
      }
    }
}