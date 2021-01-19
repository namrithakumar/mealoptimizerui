import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ErrorDisplayService } from '../error-display.service';
import { ConnectionStatusProviderService } from '../connection-status-provider.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorDisplayService : ErrorDisplayService, private connectionStatusProviderService : ConnectionStatusProviderService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        console.log('Inside ErrorInterceptor');
        return next.handle(request).pipe(
            retry(1),
            catchError( err => {
                if(err instanceof ErrorEvent) { 
                    //Log to common logging service
                }
                else if(err instanceof HttpErrorResponse) {
                    //Log to common logging service
                    if(!this.connectionStatusProviderService.getConnectionStatus()) {
                        console.log('Internet is not available, requests will be stored in order to a db and retried when internet is back');
                    } 
                    //If user is connected to the internet and error is 404, show common error page to the user
                    if(this.connectionStatusProviderService.getConnectionStatus() && 
                       err.status === 404 || err.status === 0) this.errorDisplayService.showError();
                }
                return throwError(err);
            })
        );
    }
}