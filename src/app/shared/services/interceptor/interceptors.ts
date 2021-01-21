import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ConnectionLossInterceptor } from './connection-loss-interceptor.service';
import { AuthInterceptor } from './auth-interceptor.service';
import { ErrorInterceptor } from './error-interceptor.service';

export const interceptorProviders = 
   [
    { provide : HTTP_INTERCEPTORS, useClass : ConnectionLossInterceptor, multi : true},
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    { provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true}
   ];