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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private errorDisplayService : ErrorDisplayService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        let errorMsg : String = 'Error: '
        return next.handle(request).pipe(
            retry(1),
            catchError( err => {
                console.log('Http error - calling show overlay');
                //this.errorDisplayService.showOverlay();
                if(err instanceof ErrorEvent) { 
                    //Replace console with log to common logging service
                    console.log('Client side error');                    
                    errorMsg += `{err.error.message}`;
                }
                else if(err instanceof HttpErrorResponse) {
                    //Replace console with log to common logging service
                    console.log('Server side error');                    
                    errorMsg += `{err.status} , {err.message}`;
                }
                return throwError(err);
            })
        );
    }
}