import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { User } from '../../shared/model/user.model';
import { AuthenticatedUser } from '../store/reducers/user-mgmt.reducer';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user : User;

  mode: String;

  constructor(private router : Router, private route: ActivatedRoute, private store : Store<AppState>) { }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) => {
    this.store.select('authenticatedUser').pipe(take(1), map((authenticatedUser : AuthenticatedUser) => {
      this.user = authenticatedUser.user;
      }));
    });

      this.route.queryParams.subscribe(
        (queryParams) => {
          this.mode = queryParams['mode'];
        }
      );
  }
}