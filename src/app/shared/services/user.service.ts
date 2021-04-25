import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Nutrient } from "../model/nutrient.model";
import { HttpClient } from '@angular/common/http';
import { UserBuilder } from "../model/user-builder.model";
import { KeycloakService } from "keycloak-angular";
import { User } from "../model/user.model";

@Injectable({ providedIn : 'root' })
export class UserService {
 
    constructor(private http : HttpClient, 
                private keycloakService : KeycloakService) {}

    fetchAllUsernames() : Observable<Array<String>> {
        const url = 'http://localhost:9090/mealoptimizer/user/fetchAllUsernames';
        return this.http.get<String[]>(url).pipe(
            catchError((errorRes : any) => {
                return throwError(errorRes.error.error + errorRes.error.message);
            })
        );
    }

    getDefaultNutrientLimits() : Nutrient[] {
        const defaultNutrients = new Array<Nutrient>();
        defaultNutrients.push(
            new Nutrient('calories', 2000, 2400, 'cal'),
            new Nutrient('carbs', 105, 500, 'g'),
            new Nutrient('protein', 20, 200, 'g'),
            new Nutrient('fat', 5, 80, 'g'),
            new Nutrient('sodium', 30, 5000, 'mg'),
            new Nutrient('calcium', 100, 5000, 'mg'));
        return defaultNutrients;
    }

    // The nutrient min-max elements for each user is stored as { nutrientName, min, max }
    // We split it into 2 separate objects - { nutrientName, min } and { nutrientName, max} to mae it easier to handle. 
    private parseNutrientLimits(limitInfo : { name: String, min:number, max:number}[]) :  { nutrientMinLimits : {}, nutrientMaxLimits: {}} {
        let nutrientMinLimitMap = new Map<String, number>();
        let nutrientMaxLimitMap = new Map<String, number>();
        limitInfo.forEach((nutrient : { name:string, min:number, max:number }) => {
            nutrientMinLimitMap.set(nutrient.name, nutrient.min);
            nutrientMaxLimitMap.set(nutrient.name, nutrient.max);
        });
        //return { nutrientMinLimits : this.convertMapToObj(nutrientMinLimitMap), nutrientMaxLimits: this.convertMapToObj(nutrientMaxLimitMap)};
        return { nutrientMinLimits : Object.fromEntries(nutrientMinLimitMap), nutrientMaxLimits: Object.fromEntries(nutrientMaxLimitMap)};
    }

    async parseAuthenticatedUserDetails() : Promise<User> {
        let authenticatedUserBuilder : UserBuilder = new UserBuilder(this.keycloakService.getUsername());
        let isLoggedIn = await this.keycloakService.isLoggedIn();
        let token = await this.keycloakService.getToken();

        authenticatedUserBuilder.setLoggedIn(isLoggedIn);
        authenticatedUserBuilder.setToken(token);
        
        return authenticatedUserBuilder.build();
    }

    async parseUserProfile() : Promise<User> {
        let userProfile = await this.keycloakService.loadUserProfile();
        return new UserBuilder(userProfile.username)
                        .setFirstName(userProfile.firstName)
                        .setLastName(userProfile.lastName)
                        .setEmail(userProfile.email)
                        .build();
    }
}