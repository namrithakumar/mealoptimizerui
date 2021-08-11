import { Injectable } from '@angular/core';

import { ErrorHandler } from './error-handler';
import { OverlayDisplayService } from '../overlay-display.service';
import { ConnectionStatusHandlerService } from '../connection-status-handler.service';

@Injectable({ providedIn : 'root' })
//Handles server(HTTP call) and client errors. Called from inside ErrorInterceptor.
export class AppErrorHandler extends ErrorHandler {

    constructor(private overlayDisplayService : OverlayDisplayService,
                private connectionStatusHandlerService : ConnectionStatusHandlerService) {
                    super();
                }

    public handleError(status? : number) : String {
        //Display the below error only is the connection is available.
        if(this.connectionStatusHandlerService.getConnectionStatus()) {
            if((status === undefined) || //Incase of ErrorEvent - client errors
               (status !== undefined && (status === 0 || status === 404))) { //Incase of HttpErrorResponse - Server errors from backend
                this.overlayDisplayService.showOverlay(
                    'There was an error. Please try again later.');
            }            
        }
        return super.handleError();
    }
}
/*
 * If connection is available and the status === 0, display overlay since it is an error in app setup.
 * If connection is not available and status === 0, it means network connection is not available, do not display overlay.
 */