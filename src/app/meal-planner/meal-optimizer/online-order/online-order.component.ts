import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { AuthenticatedUser } from 'src/app/user-mgmt/store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-online-order',
  templateUrl: './online-order.component.html',
  styleUrls: ['./online-order.component.css']
})
/* This component displays delivery information such as address, first name 
 * and last name based on the authenticatedUser.
 */
export class OnlineOrderComponent implements OnInit {

  constructor(private store : Store<AppState>) { }

  authenticatedUser : AuthenticatedUser;

  ngOnInit(): void {
    this.store.select('authenticatedUser').subscribe(( authenticatedUser : AuthenticatedUser ) => {
      this.authenticatedUser = authenticatedUser;
    });
  }
}