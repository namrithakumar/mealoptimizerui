export class User {
    public id: number;
    public username: String;
    public email : String; 
    public preferredDietType : String;
    public firstName : String;
    public lastName : String;
    public address : String;
    public nutrientMinLimits : Map<String,number>;
    public nutrientMaxLimits : Map<String, number>;
    public token : String;
    public tokenValidTime : number;
    public tokenExpiryDate? : Date;

    constructor(id:number, username:String, email:String, preferredDietType:String, firstName:String, lastName:String, address:String, nutrientMinLimits : Map<String, number>, nutrientMaxLimits : Map<String, number>, token : String, tokenValidTime : number, tokenExpiryDate? : Date) {
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