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
import { OverlayDisplayService } from '../overlay-display.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private overlayDisplayService : OverlayDisplayService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError( err => {
                if(err instanceof ErrorEvent) { 
                    //Log to common logging service
                }
                else if(err instanceof HttpErrorResponse) {
                    //Log to common logging service 
                    //If it is a 404 error, show common error page to the user
                    if(err.status === 404 || err.status === 0) this.overlayDisplayService.showOverlay();
                }
                return throwError(err);
            })
        );
    }
}