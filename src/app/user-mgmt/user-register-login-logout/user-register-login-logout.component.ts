import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-user-register-login-logout',
  templateUrl: './user-register-login-logout.component.html',
  styleUrls: ['./user-register-login-logout.component.css']
})
export class UserRegisterLoginLogoutComponent implements OnInit {

  @ViewChild('loginForm') loginForm: NgForm;

  error : String;
  isLoading : boolean;

  constructor(private authService : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  onLogin() : void {
    this.authService
    .login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(userData => {
      this.isLoading = true;
      this.router.navigate(['/meal-optimizer'], { queryParams: {mode: 'create'} });
    },
    error => {
      this.isLoading = false;
      this.error = error;
    });
    /*
    if(this.username.nativeElement.value === '') {
      alert('Username cannot be empty');
    }
    else {
      this.authService.login();
      this.userService.currentUserID = this.userService.getUserDetails(this.username.nativeElement.value).id;
      this.router.navigate(['/meal-optimizer']);
    }*/
  }

  logout() : void {
    this.authService.logout();
    this.router.navigate(['/app-info','home']);
  }
}
