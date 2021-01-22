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

import { AppErrorHandler } from '../error-handler/app-error-handler';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private appErrorHandler : AppErrorHandler) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError( err => {
                let errMsg : String = '';
                if(err instanceof ErrorEvent) { 
                    //Log to common logging service
                    errMsg = this.appErrorHandler.handleError();
                }
                else if(err instanceof HttpErrorResponse) {
                    //Log to common logging service
                    errMsg = this.appErrorHandler.handleError(err.status);
                }
                return throwError(errMsg);
            })
        );
    }
}