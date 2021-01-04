import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';
import { User } from '../model/user.model';

@Component({
  selector: 'app-offline-status-handler',
  templateUrl: './app-offline-status-handler.component.html',
  styleUrls: ['./app-offline-status-handler.component.css']
})
export class AppOfflineStatusHandlerComponent implements OnInit {

  authenticatedUser : User;

  constructor(private store : Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('authenticatedUser').subscribe((authenticatedUser : AuthenticatedUser) => {
      if(!authenticatedUser.error) this.authenticatedUser = authenticatedUser.user;
  });
  }

}
