import { Injectable } from '@angular/core';
import { Meal } from '../meal.model';
import { UserInputService } from './user-input.service';

@Injectable({providedIn:'root'})
export class OptimizationService {

    mealListByCost : Meal[] = [new Meal("Green Salad", 1.0, 10) , new Meal('Icecream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic bread', 1.0,4.75)];

    mealListByQuality : Meal[] = [new Meal("Green Salad", 1.0, 10) , new Meal('Icecream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic bread', 1.0,4.75)];

    constructor(private userInputService:UserInputService) {}

    getOptimizationResultSummary() : {totalCost: number, totalCalories: number} {
        return { totalCost: 39.9, totalCalories: 1938};
    }

}