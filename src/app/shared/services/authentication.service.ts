import { Injectable } from "@angular/core";

@Injectable({ providedIn : 'root'})
export class AuthenticationService {

	private authorizationUrl : string = 'http://localhost:8080/auth/realms/mealplanner/protocol/openid-connect/auth';
	private client_id : string = 'meal-planner-app-client';
	private redirect_uri : string = 'http://localhost:4200/user-mgmt/auth/authCodeReader';
	
	private originalState : string = this.generateState(30);
	private codeVerifier : string = this.generateCodeVerifier();
	private codeChallenge : string;
		
	public dispatchAuthorizationCodeRequest() {
        
        this.generateCodeChallenge().then((challenge) => {
            this.codeChallenge = challenge;
        });

		let authRequestUrl : string = this.authorizationUrl;
		authRequestUrl += "?client_id=" + this.client_id;
		authRequestUrl += "&response_type=code";
		authRequestUrl += "&scope=openid";
		authRequestUrl += "&redirect_uri=" + this.redirect_uri;
		authRequestUrl += "&state=" + this.originalState;
		authRequestUrl += "&code_challenge=" + this.codeChallenge;
		authRequestUrl += "&code_challenge_method=S256";
		
		//Open a new window to get Authorization code
		window.open(authRequestUrl, 'Authorization Request Window', 'width=800, height=600, left=200, top=200');
	}

    private generateState(length : number) : string {
        let stateValue = "";
        let alphanumericCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let alphanumericCharactersLength = alphanumericCharacters.length;
        
        for(let i=0; i<length; i++) {
            stateValue += alphanumericCharacters.charAt(
                Math.floor(Math.random() * alphanumericCharactersLength)
            );
        }

        return stateValue;
    }

    //Generate random value and encode to base64
    private generateCodeVerifier() : string {
        let returnValue = '';
        let randomByteArray = new Uint8Array(32);
        window.crypto.getRandomValues(randomByteArray);
        returnValue = this.base64urlencode(randomByteArray);
        
        return returnValue;
    }

    private base64urlencode(sourceValue) : string {
        let stringValue = String.fromCharCode.apply(null, sourceValue);
        let base64Encoded = btoa(stringValue);
        let base64urlEncoded = base64Encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g,'');
        
        return base64urlEncoded;
    }

    private async generateCodeChallenge() {
        let codeChallengeValue = "";
        let textEncoder = new TextEncoder();
        let encodedValue = textEncoder.encode(this.codeVerifier);
        var digest = await window.crypto.subtle.digest('SHA-256', encodedValue);
        codeChallengeValue = this.base64urlencode(Array.from(new Uint8Array(digest)));
    
        return codeChallengeValue;
    }
}