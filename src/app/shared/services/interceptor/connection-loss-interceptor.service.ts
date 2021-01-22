import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ConnectionStatusHandlerService } from '../connection-status-handler.service';

@Injectable()
export class ConnectionLossInterceptor implements HttpInterceptor {

    constructor(private connectionStatusHandlerService : ConnectionStatusHandlerService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        
        //If network connection is available, proceed with handling the request
        if(this.connectionStatusHandlerService.getConnectionStatus()) {
            return next.handle(request);
        }
        //If network connection is not available, write to indexedDB
        //Showing notification will be handled inside ConnectionStatusHandler
        else {
              //Add code to write to indexed DB            
        }
    }
}