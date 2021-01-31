import { User } from "./user.model";

export class UserBuilder {

    user : User;

    constructor(username : String) {
        this.user = new User(username);
    }
    
    setId(id : number) : UserBuilder {
        this.user.id = id;
        return this;
    }

    setEmail(email : String) : UserBuilder {
        this.user.email = email;
        return this;
    }

    setPreferredDietType(preferredDietType : String) : UserBuilder {
        this.user.preferredDietType = preferredDietType;
        return this;
    }

    setFirstName(firstName : String) : UserBuilder {
        this.user.firstName = firstName;
        return this;
    }

    setLastName(lastName : String) : UserBuilder {
        this.user.lastName = lastName;
        return this;
    }

    setAddress(address : String) : UserBuilder { 
        this.user.address = address;
        return this;
    }
    
    setMinLimits(nutrientMinLimits : Array<{String, number}>) : UserBuilder {
        this.user.nutrientMinLimits = nutrientMinLimits;
        return this;
    }

    setMaxLimits(nutrientMaxLimits : Array<{String, number}>) : UserBuilder {
        this.user.nutrientMaxLimits = nutrientMaxLimits;
        return this;
    }

    setToken(token : String) : UserBuilder {
        this.user.token = token;
        return this;
    }

    setTokenValidTime(tokenValidTime : number) : UserBuilder {
        this.user.tokenValidTime = tokenValidTime;
        return this;
    }

    setTokenExpiryDate(tokenExpiryDate : Date) : UserBuilder {
        this.user.tokenExpiryDate = tokenExpiryDate;
        return this;
    }

    build() : User {
        return this.user;
    }
}