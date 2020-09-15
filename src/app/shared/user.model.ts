export class User {
    constructor(
        public id: number,
        public username: String,
        public fname : String, 
        public lname : String, 
        public address : String,
        public minCalories : number,
        public maxCalories : number) {}
}