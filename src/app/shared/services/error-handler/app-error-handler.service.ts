import { Injectable } from '@angular/core';

import { ErrorHandler } from './error-handler.service';
import { OverlayDisplayService } from '../overlay-display.service';
import { ConnectionStatusProviderService } from '../connection-status-provider.service';

@Injectable({ providedIn : 'root' })
//Handles server(HTTP call) and client errors. Called from inside ErrorInterceptor.
export class AppErrorHandler extends ErrorHandler {

    constructor(private overlayDisplayService : OverlayDisplayService,
                private connectionStatusProviderService : ConnectionStatusProviderService) {
                    super();
                }

    public handleError(status? : number) : String {
        //Display the below error only is the connection is available.
        if(this.connectionStatusProviderService.getConnectionStatus()) {
            if((status === undefined) || //Incase of ErrorEvent - client errors
               (status !== undefined && (status === 0 || status === 404))) { //Incase of HttpErrorResponse - Server errors from backend
                this.overlayDisplayService.showOverlay(
                    'There was an error. This was not supposed to happen. We\'re sorry.. Our engineers are hard at work fixing your problem. We will notify you as soon as we have a fix.');
            }
        } 
        return super.handleError();
    }
}