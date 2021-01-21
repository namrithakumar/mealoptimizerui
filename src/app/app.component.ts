import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConnectionService } from 'ng-connection-service';

import { ConnectionStatusProviderService } from './shared/services/connection-status-provider.service';
import { AppState } from './store/reducers/app.reducer';
import * as UserMgmtActions from './user-mgmt/store/actions/user-mgmt.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
 
  isConnected : boolean = this.connectionStatusProviderService.getConnectionStatus();
 
  constructor(private store : Store<AppState>, 
              private connectionStatusProviderService : ConnectionStatusProviderService, 
              private connectionService : ConnectionService) {
    this.connectionService.monitor().subscribe((connectionStatus : boolean) => {
      this.isConnected = connectionStatus;
  });
  }

  ngOnInit() {
    this.store.dispatch(new UserMgmtActions.AutoLogin());
  }
}