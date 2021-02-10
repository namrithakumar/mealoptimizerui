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
            console.log('Inside getPortionCountByOptimizationTypeMealName');
            console.log('optimization type chosen by user: ' + optimizationType);
            console.log('optimization type inside meal plan : ' + OptimizationSelectionMapping[mealPlan.optimizationType.toString()]);
            console.log(optimizationType === OptimizationSelectionMapping[mealPlan.optimizationType.toString()]);
            console.log('***************************************************************');
            if(optimizationType === 'optimizedByCost' && mealPlan.optimizationType === 'COST') {
                mealPlan.meals.forEach((meal : Meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase()) portionCount = meal.portion;
                });
            }

            if(optimizationType === 'optimizedByQuality' && mealPlan.optimizationType === 'REWARD') {
                mealPlan.meals.forEach((meal : Meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase()) portionCount = meal.portion;
                });
            }
        });
        return portionCount;
    }
}