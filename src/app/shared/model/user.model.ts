export class User {
    public id: number;
    public username: String;
    public email : String; 
    public preferredDietType : String;
    public nutrientMinLimits : Array<{String, number}>;
    public nutrientMaxLimits : Array<{String, number}>;
    public token : String;
    public tokenValidTime : number;
    public tokenExpiryDate? : Date;

    constructor(id:number, username:String, email:String, preferredDietType:String, nutrientMinLimits : Array<{String, number}>, nutrientMaxLimits : Array<{String, number}>, token : String, tokenValidTime : number, tokenExpiryDate? : Date) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.preferredDietType = preferredDietType;
        this.nutrientMaxLimits = nutrientMaxLimits;
        this.nutrientMinLimits = nutrientMinLimits;
        this.token = token;
        this.tokenValidTime = tokenValidTime;
        this.tokenExpiryDate = tokenExpiryDate;
    }
}