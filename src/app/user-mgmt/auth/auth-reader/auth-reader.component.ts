import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-auth-reader',
  templateUrl: './auth-reader.component.html',
  styleUrls: ['./auth-reader.component.css']
})
export class AuthReaderComponent implements OnInit {

  public url;
  public authCode;
  public state;
  public error;
  public errorDescription;

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
    console.log('Inside AuthReaderComponent. Token will be read here');
    this.url = new URL(window.location.href);
		this.authCode = this.url.searchParams.get('code');
		this.state = this.url.searchParams.get('state');
		this.error = this.url.searchParams.get('error');
		this.errorDescription = this.url.searchParams.get('error_description');
  }

}
