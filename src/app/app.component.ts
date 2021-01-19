import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ConnectionService } from 'ng-connection-service';
import { ErrorDisplayService } from './shared/services/error-display.service';
import { AppState } from './store/reducers/app.reducer';
import * as UserMgmtActions from './user-mgmt/store/actions/user-mgmt.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
 
  constructor(private store : Store<AppState>, 
              private connectionService : ConnectionService,
              private errorDisplayService : ErrorDisplayService) {}

  ngOnInit() {
    this.store.dispatch(new UserMgmtActions.AutoLogin());
    this.connectionService.monitor().subscribe((connectionStatus : boolean) => {
      if(!connectionStatus) {        
        this.offlineSync();
        this.errorDisplayService.showError();
      }
    });
  }

  public offlineSync() {
    navigator.serviceWorker.ready
      .then((swRegistration) => swRegistration.sync.register('post-data'))
      .catch(console.log);   
  }
}