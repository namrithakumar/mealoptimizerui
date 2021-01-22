import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectionStatusHandlerService } from './connection-status-handler.service';

//Can also be renamed canDeactivateGuard
export interface CanComponentDeactivate {
    canDeactivate() : Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({providedIn:'root'})
export class CanExitPageService implements CanDeactivate<CanComponentDeactivate> {

    constructor(private connectionStatusHandlerService:  ConnectionStatusHandlerService) {}
    
    canDeactivate(component: CanComponentDeactivate , currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return (this.connectionStatusHandlerService.getConnectionStatus())?component.canDeactivate():true;
    }
}