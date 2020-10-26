import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { exhaustMap, take } from 'rxjs/operators';
import { User } from '../../user.model';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService : AuthService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        return this.authService.user.pipe(take(1), exhaustMap(
            (user : User) =>{
                if(!user) return next.handle(request);
                else {
                    const modifiedReq = request.clone({
                        setHeaders : {'Authorization' : 'Bearer ' + user.token}
                    });
                    return next.handle(modifiedReq);
                }
            }
        ));
    }
}