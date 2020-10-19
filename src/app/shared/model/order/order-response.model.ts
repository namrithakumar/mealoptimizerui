export class OrderResponse {

    public orderId : number;
    public mealPlan : MealPlan[];
    public dateOfDelivery : Date;

    constructor(orderId : number, mealPlan : MealPlan[], dateOfDelivery : Date) {
        this.orderId = orderId;
        this.mealPlan = mealPlan;
        this.dateOfDelivery = dateOfDelivery;
    }
}

export class MealPlan {

    public meals : Meal[];
    public mealPlanCost : number;
    public optimizationType : String;

    constructor(meals : Meal[], mealPlanCost : number, optimizationType : String) {
        this.meals = meals;
        this.mealPlanCost = mealPlanCost;
        this.optimizationType = optimizationType;
    }
}

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