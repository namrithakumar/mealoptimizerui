import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  user : User;

  mode: String;

  constructor(private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) => {
      //this.user = this.userService.getUserDetails(params['username']);
    });

      this.route.queryParams.subscribe(
        (queryParams) => {
          this.mode = queryParams['mode'];
        }
      );
  }
}