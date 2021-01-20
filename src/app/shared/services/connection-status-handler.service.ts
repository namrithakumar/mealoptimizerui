import { Injectable } from '@angular/core';
import { ConnectionService } from 'ng-connection-service';
import { IndexedDBService } from './indexdb/indexed-db-service';

@Injectable({ providedIn : 'root' })
export class ConnectionStatusHandlerService {
 
    private isConnected : boolean = navigator.onLine;
 
    constructor(private connectionService : ConnectionService,
                private indexedDBService : IndexedDBService) {
        this.connectionService.monitor().subscribe((connectionStatus : boolean) => {
            this.isConnected = connectionStatus;
            (!connectionStatus)?this.handleConnectionLoss():this.handleConnectionFix(); 
        });  
    }

    getConnectionStatus() : boolean {
        return this.isConnected;
    }

    handleConnectionLoss() {
        alert('You are no longer connected to the internet. You can continue using the app, but some of its features will be unavailable.');
    }

    handleConnectionFix() {
        //notify user that connection is back
        alert('You are now connected to the internet. We will try to resend all your requests');
        this.indexedDBService.getAllEntries().then((entries : Map<string, any>) => 
                    entries.forEach((failedRequest : any, tag : string) => {
                        console.log('Tag ' + tag);
                        console.log('Request ' + JSON.stringify(failedRequest.params));            
                    })
                  );
        console.log('Finished reading all entries');          
    }
}