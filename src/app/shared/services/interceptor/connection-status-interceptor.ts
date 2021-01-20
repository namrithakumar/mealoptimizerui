import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionStatusProviderService } from '../connection-status-provider.service';

@Injectable()
export class ConnectionStatusInterceptor implements HttpInterceptor {

    constructor(private connectionStatusProviderService : ConnectionStatusProviderService) {}

    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>> {
       
        //All of the backend end points match this pattern, we need not use []
        let result = request.url.match(/.*mealoptimizer\/([a-z]+\/[a-z]+)/) || [];
        let tag = result[1].replace('/', '-');
        if(this.connectionStatusProviderService.getConnectionStatus()) {
            return next.handle(request);
        }
        else {
                navigator.serviceWorker.ready
                  .then((swRegistration) => swRegistration.sync.register(tag))
                  .catch(console.log);
        }
    }
}