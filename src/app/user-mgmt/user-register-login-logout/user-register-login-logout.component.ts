import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-register-login-logout',
  templateUrl: './user-register-login-logout.component.html',
  styleUrls: ['./user-register-login-logout.component.css']
})
export class UserRegisterLoginLogoutComponent implements OnInit {

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  login() : void {
    this.authService.login();
    this.router.navigate(['/meal-optimizer']);
  }

  logout() : void {
    this.authService.logout();
    this.router.navigate(['/app-info','home']);
  }
}
