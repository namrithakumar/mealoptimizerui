export class UserSignUpRequest {
    constructor(
        public username : String,
        public password : String,
        public email : String,
        public preferredDietType : String,
        public nutrientMinLimits : {},
        public nutrientMaxLimits : {}
    ) {}
}