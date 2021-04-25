export class User {
    public username: String;    
    public firstName : String;
    public lastName : String;
    public email : String; 
    public preferredDietType? : String;
    public address? : String;
    public nutrientMinLimits? : Array<{String, number}>;
    public nutrientMaxLimits? : Array<{String, number}>;
    public token : String;
    public loggedIn: Boolean = false;

    constructor(username:String, firstName?:String, lastName?:String, email?:String, token? : String, loggedIn?: Boolean, preferredDietType?:String, address?:String, nutrientMinLimits? : Array<{String, number}>, nutrientMaxLimits? : Array<{String, number}>) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.preferredDietType = preferredDietType;
        this.address = address;
        this.nutrientMaxLimits = nutrientMaxLimits;
        this.nutrientMinLimits = nutrientMinLimits;
        this.token = token;
        this.loggedIn = loggedIn;
    }
}