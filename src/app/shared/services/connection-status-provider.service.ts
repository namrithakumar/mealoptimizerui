import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';

@Injectable({ providedIn : 'root' })
export class ConnectionStatusProviderService {
 
    private isConnected : boolean = navigator.onLine;
 
    constructor(private connectionService : ConnectionService) {
        this.connectionService.monitor().subscribe((connectionStatus : boolean) => {
            this.isConnected = connectionStatus;
        });  
    }

    getConnectionStatus() : boolean {
        return this.isConnected;
    }
}