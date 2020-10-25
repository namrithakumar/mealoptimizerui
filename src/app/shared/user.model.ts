export class User {
    constructor(
        public id: number,
        public username: String,
        public email : String, 
        public preferredDietType : String,
        public nutrientMinLimits : Array<{String, number}>,
        public nutrientMaxLimits : Array<{String, number}>,
        private _token : String,
        private _tokenValidTime : number) {}

        //Getter for token. Can be accesses as user.token. _token cannot be accessed directly since it is private.
        get token() : String | null {
            let tokenExpirationDate = new Date(new Date().getTime() + this._tokenValidTime);
            if(tokenExpirationDate > new Date()) return this._token;
            else return null;
        }
}