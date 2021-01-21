import { Injectable } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { DisplayService } from "./display.service";
import { ComponentPortal } from "@angular/cdk/portal";
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';

@Injectable({ providedIn : 'root' })
export class NotificationDisplayService extends DisplayService {
    
    private notificationRef : OverlayRef;
    
    constructor(private overlay : Overlay) {
        super();
    }

    public showNotification(content : String) {
        this.notificationRef = this.overlay.create(this.getNotificationConfig());
        //Hide any existing notifications
        this.hideNotification();
        const componentPortal = new ComponentPortal(CustomNotificationComponent, 
                                                    null, 
                                                    this.createInjector(content));
        //this.overlayRef.addPanelClass("example-overlay");
        this.notificationRef.attach(componentPortal);
        setTimeout(this.hideNotification.bind(this),2000);       
      }  
  
      public hideNotification() {
        if(!!this.notificationRef) {
          this.notificationRef.detach();
        }
      }

      private getNotificationConfig() : OverlayConfig {
        const positionStrategy = this.overlay.position()
                                             .global()
                                             .bottom()
                                             .right();
  
        const notificationConfig = new OverlayConfig({
          scrollStrategy: this.overlay.scrollStrategies.block(),
          positionStrategy
        });
  
        return notificationConfig;
      }
}