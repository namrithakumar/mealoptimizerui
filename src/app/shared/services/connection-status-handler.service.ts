import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

import { ConnectionLossErrorHandler } from './error-handler/connection-loss-error-handler';
import { IndexedDBService } from './indexeddb/indexed-db.service';
import { NotificationDisplayService } from './notification-display.service';
import { ActionDispatcher } from '../services/action-dispatcher.service';

@Injectable({ providedIn : 'root' })
export class ConnectionStatusHandlerService {
 
    private isConnected : boolean = navigator.onLine;
 
    constructor(private connectionService : ConnectionService,
                private connectionLossErrorHandler : ConnectionLossErrorHandler,
                private notificationDisplayService : NotificationDisplayService,
                private indexedDBService : IndexedDBService,
                private actionDispatcher : ActionDispatcher) {
                    
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
        //Show notification
        this.notificationDisplayService.showNotification(
            'Connection fixed. We will try to process your requests');
        //Read failed requests from indexedDB and call backend.
        this.indexedDBService.getAllEntries()
                             .then((failedRequests : Map<string, any>) => {
                                failedRequests.forEach(async (failedRequest, tag) => {
                                    await this.actionDispatcher.dispatchAction(failedRequest, tag);
                                    this.indexedDBService.deleteRequest(tag);
                                });
                             });    
    }
}