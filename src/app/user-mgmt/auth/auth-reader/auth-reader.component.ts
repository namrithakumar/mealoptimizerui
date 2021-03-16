import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { AuthorizationService } from 'src/app/shared/services/authorization.service';

@Component({
  selector: 'app-auth-reader',
  templateUrl: './auth-reader.component.html',
  styleUrls: ['./auth-reader.component.css']
})
export class AuthReaderComponent implements OnInit {

  public authorizationCode;

  public accessToken;

  constructor(private authorizationService : AuthorizationService,
              private http : HttpClient) { }

  ngOnInit(): void {
    console.log('Inside AuthReaderComponent. Token will be read here');
    let url = new URL(window.location.href);
		let authCode = url.searchParams.get('code');
		let state = url.searchParams.get('state');
		let error = url.searchParams.get('error');
		let errorDescription = url.searchParams.get('error_description');

    if(error) {
			alert('There was an error: ' + error + ' Description of error: ' + errorDescription);			
		}
		/*else if(state !== this.authorizationService.originalState) {
      alert('Original state ' + this.authorizationService.originalState + ' State received ' + state);
			alert('Invalid state received');
		}*/
		else {
			this.authorizationCode = authCode;
		}
  }

  //Exchange Auth Code for Access Token
  public requestAccessToken() {
    let data = {
      'grant_type' : 'authorization_code',
      'client_id' : this.authorizationService.clientId,
      'code' : this.authorizationCode,
      'code_verifier' : this.authorizationService.codeVerifier,
      'redirect_uri' : this.authorizationService.redirectUri
    };

    //const headers = new HttpHeaders().set(, );
    
    const options = {
      headers : {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    };

    console.log('Exchanging access token ' + JSON.stringify(data) + JSON.stringify(options));
    this.http.post('http://localhost:8080/auth/realms/mealplanner/protocol/openid-connect/token',
                    data,
                    {
                      headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      }
                    }
    ).subscribe((response) => {
      console.log('************** Response was ' + JSON.stringify(response));
    });
  }
}
