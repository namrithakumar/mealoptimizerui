import { Meal } from './meal.model';

export class Order {
    public mealList : Meal[];
    public dateOfDelivery : Date;
    public orderCost : number;

    constructor(mealList : Meal[], dateOfDelivery : Date, orderCost : number) {
        this.mealList = mealList;
        this.orderCost = orderCost;
        this.dateOfDelivery = dateOfDelivery;
    }
}