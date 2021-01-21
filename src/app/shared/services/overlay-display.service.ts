import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';

import { CustomOverlayComponent } from '../custom-overlay/custom-overlay.component'; 
import { DisplayService } from './display.service';

@Injectable({ providedIn:'root' })
export class OverlayDisplayService extends DisplayService {

    private overlayRef : OverlayRef;
    
    constructor(private overlay : Overlay) {
      super();
    }

    public showOverlay(message : String) {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        const componentPortal = new ComponentPortal(CustomOverlayComponent, 
                                                    null, 
                                                    super.createInjector(message));
        this.overlayRef.attach(componentPortal); 
    }

    public hideOverlay() {
      if(!!this.overlayRef) {
          this.overlayRef.detach();
        }
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
}