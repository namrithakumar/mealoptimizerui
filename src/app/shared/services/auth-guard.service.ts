import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { ConnectionStatusHandlerService } from './connection-status-handler.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService extends KeycloakAuthGuard {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService,
    private connectionStatusHandlerService:  ConnectionStatusHandlerService
  ) {
    super(router, keycloak);
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
            
      //NOTE: For future reference Request triggered from : window.location.origin + state.url);
      await this.keycloak.login({
        redirectUri: 'http://localhost:4200/#/meal-planner/user-redirect'
      });
    }

    //Do not allow navigation if the user is offline
    if(!this.connectionStatusHandlerService.getConnectionStatus()) return false;

    else return true;
  }
}