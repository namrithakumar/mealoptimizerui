import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

//Can also be renamed canDeactivateGuard
export interface CanComponentDeactivate {
    canDeactivate() : Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({providedIn:'root'})
export class CanExitPageService implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: CanComponentDeactivate , currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return component.canDeactivate();
    }
}