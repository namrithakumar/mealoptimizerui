import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { exhaustMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store : Store<AppState>) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
        return this.store.select('authenticatedUser').pipe(take(1), exhaustMap(
            (authenticatedUser : AuthenticatedUser) =>{
                if(!authenticatedUser.user.loggedIn) {
                    return next.handle(request);
                }
                else {
                    const modifiedReq = request.clone({
                        setHeaders : {'Authorization' : 'Bearer ' + authenticatedUser.user.token}
                    });
                    return next.handle(modifiedReq);
                }
            }
        ));
    }
}