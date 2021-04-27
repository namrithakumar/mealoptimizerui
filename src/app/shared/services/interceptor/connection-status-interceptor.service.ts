import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConnectionStatusHandlerService } from '../connection-status-handler.service';
import { IndexedDBService } from '../indexeddb/indexed-db.service';

@Injectable()
export class ConnectionStatusInterceptor implements HttpInterceptor {

    constructor(private connectionStatusHandlerService : ConnectionStatusHandlerService,
                private indexedDBService : IndexedDBService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {

        //All of the backend end points match the pattern $(backend url)/mealoptimizer/$(tag), we need not use [].
        //We use [] to accomodate future changes.
        let result = request.url.match(/.*mealoptimizer\/([a-z]+\/[a-z]+)/) || [];
        let tag = result[1].replace('/', '-');

        //If network connection is available, proceed with handling the request
        if(this.connectionStatusHandlerService.getConnectionStatus()) {
            return next.handle(request);
        }
        //If network connection is not available, write to indexedDB
        //Showing notification will be handled inside ConnectionStatusHandler
        else {
            //Write to indexed DB
            this.indexedDBService.addFailedRequest(request, tag);
            return next.handle(request);
        }
    }
}