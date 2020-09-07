export class Meal {
    public itemName : String;
    public portion : number;
    public mealCost: number;

    constructor(itemName : String, portion : number, mealCost: number) {
        this.itemName = itemName;
        this.portion = portion;
        this.mealCost = mealCost;
    }
}