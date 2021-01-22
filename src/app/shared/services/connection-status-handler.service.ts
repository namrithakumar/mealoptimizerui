import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

import { ConnectionLossErrorHandler } from './error-handler/connection-loss-error-handler';
import { NotificationDisplayService } from './notification-display.service';

@Injectable({ providedIn : 'root' })
export class ConnectionStatusHandlerService {
 
    private isConnected : boolean = navigator.onLine;
 
    constructor(private connectionService : ConnectionService,
                private connectionLossErrorHandler : ConnectionLossErrorHandler,
                private notificationDisplayService : NotificationDisplayService) {
        this.connectionService.monitor().subscribe((connectionStatus : boolean) => {
            this.isConnected = connectionStatus;
            if(!connectionStatus) { this.handleConnectionLoss(); }
            if(connectionStatus) { this.handleConnectionFix(); }
        });  
    }

    getConnectionStatus() : boolean {
        return this.isConnected;
    }

    handleConnectionLoss() : void {
        this.connectionLossErrorHandler.handleError();
    }

    handleConnectionFix() {
        //Write code to read failed requests from indexedDB and call backend.
        this.notificationDisplayService.showNotification('Connection fixed. We will try to process your requests');
    }
}