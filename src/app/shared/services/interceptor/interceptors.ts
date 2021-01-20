import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth-interceptor.service';
import { ErrorInterceptor } from './error-interceptor.service';
import { ConnectionStatusInterceptor } from './connection-status-interceptor';

export const interceptorProviders = 
   [
    { provide : HTTP_INTERCEPTORS, useClass : ConnectionStatusInterceptor, multi : true},  
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    { provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptor, multi : true}
   ];