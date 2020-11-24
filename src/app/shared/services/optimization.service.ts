import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { OptimizedMealPlans } from 'src/app/meal-optimizer/store/reducers/order.reducer';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Meal, MealPlan } from '../model/order/order-response.model';
import { OrderResponse } from '../model/order/order-response.model';

@Injectable({providedIn:'root'})
export class OptimizationService implements OnInit, OnDestroy {

    constructor(private store : Store<AppState>) {}

    optimizedMealPlans : OrderResponse;

    ngOnInit() {
        this.store.select('optimizedPlans').subscribe((optimizedMealPlans : OptimizedMealPlans) => {
            this.optimizedMealPlans = optimizedMealPlans.optimizedMealPlans;
            }
        );
    }

    getOptimizationResultSummary() : {totalCost: number, totalCalories: number} {
        return { totalCost: 39.9, totalCalories: 1938};
    }

    getMealPlanByOptimizationType(optimizationType : String) : { mealList : Meal[], planCost: number, optimizationType : String } | null {
        this.optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            if(optimizationType === 'COST' && mealPlan.optimizationType === 'COST') {
                return { mealList : mealPlan.meals, planCost: mealPlan.mealPlanCost, optimizationType : 'COST' };
            }
            if(optimizationType === 'QUALITY' && mealPlan.optimizationType === 'REWARD') {
                return { mealList : mealPlan.meals, planCost: mealPlan.mealPlanCost, optimizationType : 'QUALITY' };
            }
        });
        return null;
    }

    getPortionCountByOptimizationTypeMealName(optimizationType:String, mealName : String) : number {
        var portionCount = 0;
        this.optimizedMealPlans.mealPlan.forEach((mealPlan : MealPlan) => {
            
            if(optimizationType === 'COST' && mealPlan.optimizationType === 'COST') {
                mealPlan.meals.forEach((meal : Meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase()) portionCount = meal.portion;
                });
            }

            if(optimizationType === 'QUALITY' && mealPlan.optimizationType === 'REWARD') {
                mealPlan.meals.forEach((meal : Meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase()) portionCount = meal.portion;
                });
            }
        });
        return portionCount;
    }

    ngOnDestroy() {}
}