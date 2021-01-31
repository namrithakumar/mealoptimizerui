import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { CustomOverlayComponent } from '../core/custom-overlay/custom-overlay.component'; 
import { DisplayService } from './display.service';

@Injectable({ providedIn:'root' })
export class OverlayDisplayService extends DisplayService {

    private overlayRef : OverlayRef;
    
    constructor(private overlay : Overlay) {
      super();
    }

    public showOverlay(message : String) {
        //Create container
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        //Create component
        const componentPortal = new ComponentPortal(CustomOverlayComponent, 
                                                    null, 
                                                    super.createInjector(message));
        //Attach component to container.
        this.overlayRef.attach(componentPortal); 
    }

    //Function to hide overlay.
    public hideOverlay() {
      if(!!this.overlayRef) {
          this.overlayRef.detach();
        }
      }

    private getOverlayConfig() : OverlayConfig {
      //Center the overlay.
      const positionStrategy = this.overlay.position()
                              .global()
                              .centerHorizontally()
                              .centerVertically();
      //Return object with all the config properties.
      const overlayConfig = new OverlayConfig({
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy
      });

      return overlayConfig;
    }
}