import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ConnectionStatusProviderService } from '../services/connection-status-provider.service';

//Can also be renamed canDeactivateGuard
export interface CanComponentDeactivate {
    canDeactivate() : Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({providedIn:'root'})
export class CanExitPageService implements CanDeactivate<CanComponentDeactivate> {

    constructor(private connectionStatusProviderService:  ConnectionStatusProviderService) {}
    
    canDeactivate(component: CanComponentDeactivate , currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return (this.connectionStatusProviderService.getConnectionStatus())?component.canDeactivate():true;
    }
}