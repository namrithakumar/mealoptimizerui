import { Injectable } from '@angular/core';

import { Meal, MealPlan } from '../model/order-response.model';
import { OrderResponse } from '../model/order-response.model';

import { OptimizationTypeMapping, OptimizationSelectionMapping } from '../optimization-mapping.enum';

@Injectable({providedIn:'root'})
export class OptimizationService {

    constructor() { }

    optimizedMealPlans : OrderResponse;

    getMealPlanByOptimizationType(optimizationType : String, optimizedMealPlans : OrderResponse) : { mealList : Meal[], planCost: number, optimizationType : String } {
        
        this.optimizedMealPlans = optimizedMealPlans;

        let mealPlanOptimizedByType : { mealList : Meal[], planCost: number, optimizationType : String };

        optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            if(optimizationType === OptimizationTypeMapping[mealPlan.optimizationType.toString()]) {
                mealPlanOptimizedByType = { mealList : mealPlan.meals, planCost: mealPlan.mealPlanCost, optimizationType : optimizationType };
            }
        });
        return mealPlanOptimizedByType;
    }

    getPortionCountByOptimizationTypeMealName(optimizationType:String, mealName : String) : number {
        var portionCount = 0;
 
        this.optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            if(optimizationType === OptimizationSelectionMapping[mealPlan.optimizationType.toString()]) {
                mealPlan.meals.forEach((meal : Meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase()) portionCount = meal.portion;
                });
            }
        });
        return portionCount;
    }
}