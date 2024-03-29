import { Injectable } from '@angular/core';

import { ErrorHandler } from './error-handler';
import { NotificationDisplayService } from '../notification-display.service';

@Injectable({ providedIn : 'root' })
//Handles connection loss. Called from inside ConnectionStatusHandler.
export class ConnectionLossErrorHandler extends ErrorHandler {
    
    constructor(private notificationDisplayService : NotificationDisplayService) {
        super();
    }
    
    public handleError() : String {
        this.notificationDisplayService.showNotification(
            'Connection lost. Some features may not be available.');
        return super.handleError();
    }
}