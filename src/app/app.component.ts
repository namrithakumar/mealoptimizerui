import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from './store/reducers/app.reducer';
import * as UserMgmtActions from './user-mgmt/store/actions/user-mgmt.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(private store : Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new UserMgmtActions.AutoLogin());
  }
}