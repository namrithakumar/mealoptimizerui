import { Injectable } from '@angular/core';
import { Meal } from '../meal.model';
import { UserInputService } from './user-input.service';

@Injectable({providedIn:'root'})
export class OptimizationService {

    mealListByCost : Meal[] = [new Meal("Green Salad", 1.0, 10) , new Meal('Ice cream',1.0,3.2), new Meal('Strawberry Milkshake', 2.0, 8.38), new Meal('Garlic Bread', 1.0,4.75)];

    mealListByQuality : Meal[] = [new Meal("Green Salad", 2.0, 20) , new Meal('Ice cream',1.0,3.2), new Meal('Strawberry Milkshake', 1.0, 4.19), new Meal('Garlic Bread', 1.0,4.75)];

    constructor(private userInputService:UserInputService) {}

    getOptimizationResultSummary() : {totalCost: number, totalCalories: number} {
        return { totalCost: 39.9, totalCalories: 1938};
    }

    getPortionCountByOptimizationTypeMealName(optimizationType:String, mealName : String) : number {
        var portionCount = 0;
        switch(optimizationType) {
            case 'optimizedByCost': 
                this.mealListByCost.forEach((meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase())
                        portionCount = meal.portion;
                    }
                );
                break;
            case 'optimizedByQuality':
                this.mealListByQuality.forEach((meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase())
                        portionCount = meal.portion;
                });
                break;                     
        }
        return portionCount;
    }
}