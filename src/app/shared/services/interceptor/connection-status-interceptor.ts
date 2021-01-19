import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionStatusProviderService } from '../connection-status-provider.service';

@Injectable()
export class ConnectionStatusInterceptor implements HttpInterceptor {

    constructor(private connectionStatusProviderService : ConnectionStatusProviderService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        console.log('Inside ConnectionStatusInterceptor');
        if(this.connectionStatusProviderService.getConnectionStatus()) {
            return next.handle(request);
        }
    }
}