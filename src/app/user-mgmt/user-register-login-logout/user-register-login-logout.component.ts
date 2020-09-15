import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-user-register-login-logout',
  templateUrl: './user-register-login-logout.component.html',
  styleUrls: ['./user-register-login-logout.component.css']
})
export class UserRegisterLoginLogoutComponent implements OnInit {

  @ViewChild('username') username: ElementRef;

  constructor(private authService : AuthService, private userService: UserService, private router : Router) { }

  ngOnInit(): void {
  }

  login() : void {
    if(this.username.nativeElement.value === '') {
      alert('Username cannot be empty');
    }
    else {
    this.authService.login();
    this.userService.currentUserID = this.userService.getUserDetails(this.username.nativeElement.value).id;
    this.router.navigate(['/meal-optimizer']);
    }
  }

  logout() : void {
    this.authService.logout();
    this.router.navigate(['/app-info','home']);
  }
}
