import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptimizedMealPlans } from 'src/app/meal-optimizer/store/reducers/order.reducer';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Meal, MealPlan } from '../model/order-response.model';
import { OrderResponse } from '../model/order-response.model';

@Injectable({providedIn:'root'})
export class OptimizationService {

    constructor(private store : Store<AppState>) { }

    optimizedMealPlans : OrderResponse;

    getMealPlanByOptimizationType(optimizationType : String, optimizedMealPlans : OptimizedMealPlans) : { mealList : Meal[], planCost: number, optimizationType : String } {
        
        this.optimizedMealPlans = optimizedMealPlans.optimizedMealPlans;

        let mealPlanOptimizedByType : { mealList : Meal[], planCost: number, optimizationType : String };

        this.optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            if(optimizationType === 'COST' && mealPlan.optimizationType === 'COST') {
                mealPlanOptimizedByType = { mealList : mealPlan.meals, planCost: mealPlan.mealPlanCost, optimizationType : 'COST' };
            }
            if(optimizationType === 'QUALITY' && mealPlan.optimizationType === 'REWARD') {
                mealPlanOptimizedByType = { mealList : mealPlan.meals, planCost: mealPlan.mealPlanCost, optimizationType : 'QUALITY' };
            }
        });
        return mealPlanOptimizedByType;
    }

    getPortionCountByOptimizationTypeMealName(optimizationType:String, mealName : String) : number {
        var portionCount = 0;
        this.optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            
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