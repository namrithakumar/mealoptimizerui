import { Injectable } from "@angular/core";
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';

import { DisplayService } from "./display.service";
import { ComponentPortal } from "@angular/cdk/portal";
import { CustomNotificationComponent } from '../custom-notification/custom-notification.component';

@Injectable({ providedIn : 'root' })
export class NotificationDisplayService extends DisplayService {
    
    //OverlayRef is the container created dynamically. Store a list of all containers created dynamically for tracking.
    private notificationReferences : Array<OverlayRef> = new Array<OverlayRef>();

    constructor(private overlay : Overlay) {
        super();
    }

    public showNotification(content : String) {
        //Create container dynamically.
        let notificationRef : OverlayRef = this.overlay.create(this.getNotificationConfig());
        //Add to list of containers.
        this.notificationReferences.push(notificationRef);
        //Create component dynamically.
        const componentPortal = new ComponentPortal(CustomNotificationComponent, 
                                                    null, 
                                                    this.createInjector(content));
        //Attach component to container
        notificationRef.attach(componentPortal);
        //Auto hide notification after 20 secs.
        setTimeout(this.hideNotification.bind(this), 20000);       
      }

      public hideNotification() {
        //If atleast 1 container is created.
        if(this.notificationReferences.length > 0) {
          //Get a reference to the earliest/first container created.
          let notificationRef : OverlayRef = this.notificationReferences.shift();
          if(!!notificationRef) {
            //Clear the container.
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