import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { InjectionToken } from '@angular/core';
import { Injectable, Injector } from '@angular/core';

import { CustomOverlayComponent } from '../custom-overlay/custom-overlay.component'; 

@Injectable({ providedIn:'root' })
export class OverlayDisplayService {

    private overlayRef : OverlayRef;
    
    constructor(private overlay : Overlay) {}

    public showOverlay() {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        const componentPortal = new ComponentPortal(CustomOverlayComponent, 
                                                    null, 
                                                    this.createInjector('There was an error. This was not supposed to happen. We\'re sorry.. Our engineers are hard at work fixing your problem. We will notify you as soon as we have a fix.'));
        //this.overlayRef.addPanelClass("example-overlay");
        this.overlayRef.attach(componentPortal); 
    }

    public hideOverlay() {      
        if (!!this.overlayRef) {
          this.overlayRef.detach();
        }
      }

    public showNotification(content : String) {

    }  

    private getOverlayConfig() : OverlayConfig {
      const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

      const overlayConfig = new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });

      return overlayConfig;
    }

    private createInjector(content : String) {
      return Injector.create({
        providers : [
          { provide: CONTAINER_DATA, useValue : content}]
      });
    }
}

export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');