import { Injectable } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { DisplayService } from "./display.service";
import { ComponentPortal } from "@angular/cdk/portal";
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';

@Injectable({ providedIn : 'root' })
export class NotificationDisplayService extends DisplayService {
    
    private notificationReferences : Array<OverlayRef> = new Array<OverlayRef>();

    constructor(private overlay : Overlay) {
        super();
    }

    public showNotification(content : String) {
        let notificationRef : OverlayRef = this.overlay.create(this.getNotificationConfig());
        this.notificationReferences.push(notificationRef);
        const componentPortal = new ComponentPortal(CustomNotificationComponent, 
                                                    null, 
                                                    this.createInjector(content));
        notificationRef.attach(componentPortal);
        setTimeout(this.hideNotification.bind(this), 2000);       
      }

      public hideNotification() {
        if(this.notificationReferences.length > 0) {
          let notificationRef : OverlayRef = this.notificationReferences.shift();
          if(!!notificationRef) {
            notificationRef.detach();
          }
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