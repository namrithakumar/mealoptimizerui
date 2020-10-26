import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { User } from '../../shared/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user : User;

  mode: String;

  constructor(private router : Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) => {
//      this.user = this.userService.getUserDetails(params['username']);
    });

      this.route.queryParams.subscribe(
        (queryParams) => {
          this.mode = queryParams['mode'];
        }
      );
  }

  onEditUserProfile() {
    this.router.navigate(['user-mgmt','user','user-settings']);
  }
}
