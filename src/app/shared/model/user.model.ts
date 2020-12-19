export class User {
    public id: number;
    public username: String;
    public email : String; 
    public preferredDietType : String;
    public firstName : String;
    public lastName : String;
    public address : String;
    public nutrientMinLimits : Array<{String, number}>;
    public nutrientMaxLimits : Array<{String, number}>;
    public token : String;
    public tokenValidTime : number;
    public tokenExpiryDate? : Date;

    constructor(id:number, username:String, email:String, preferredDietType:String, firstName:String, lastName:String, address:String, nutrientMinLimits : Array<{String, number}>, nutrientMaxLimits : Array<{String, number}>, token : String, tokenValidTime : number, tokenExpiryDate? : Date) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.preferredDietType = preferredDietType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.nutrientMaxLimits = nutrientMaxLimits;
        this.nutrientMinLimits = nutrientMinLimits;
        this.token = token;
        this.tokenValidTime = tokenValidTime;
        this.tokenExpiryDate = tokenExpiryDate;
    }
}