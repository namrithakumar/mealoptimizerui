import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from '../model/order/order-response.model';
import { OrderResponse } from '../model/order/order-response.model';
import { MealPlanService } from './http/meal-plan.service';
import { OptimizationStatus } from './optimization-status.enum';
import { UserInputService } from './user-input.service';

@Injectable({providedIn:'root'})
export class OptimizationService {

    mealPlanCost : { mealListByCost : Meal[], planCost: number } = { mealListByCost : null, planCost: null };

    mealPlanQuality : { mealListByQuality : Meal[], planCost: number } = { mealListByQuality : null, planCost: null };

    onCostOptimizationComplete = new Subject< { mealListByCost : Meal[], planCost: number } >();
    onQualityOptimizationComplete = new Subject< { mealListByQuality : Meal[], planCost: number } >();

    optimizationStatusChange = new Subject<OptimizationStatus>();

    constructor(private userInputService:UserInputService, private mealPlanService:  MealPlanService) {}

    getOptimizationResultSummary() : {totalCost: number, totalCalories: number} {
        return { totalCost: 39.9, totalCalories: 1938};
    }

    getPortionCountByOptimizationTypeMealName(optimizationType:String, mealName : String) : number {
        var portionCount = 0;
        switch(optimizationType) {
            case 'optimizedByCost': 
                this.mealPlanCost.mealListByCost.forEach((meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase())
                        portionCount = meal.portion;
                    }
                );
                break;
            case 'optimizedByQuality':
                this.mealPlanQuality.mealListByQuality.forEach((meal) => {
                    if(mealName.toLowerCase() === meal.itemName.toLowerCase())
                        portionCount = meal.portion;
                });
                break;                     
        }
        return portionCount;
    }

    getMealPlan(orderRequest :{ deliveryDate : Date ,mealSelected : Array<String>, optimizationTypes: Array<String> }) {
        this.optimizationStatusChange.next(OptimizationStatus.REQUEST_SENT);
        return this.mealPlanService.getMealPlan(orderRequest);
      }

    setOptimizedMealPlans(orderResponse : OrderResponse) {
        orderResponse.mealPlan.forEach((mealPlan) => {
            if(mealPlan.optimizationType === "COST") {
                this.mealPlanCost.mealListByCost = mealPlan.meals;
                this.mealPlanCost.planCost = mealPlan.mealPlanCost;
            }
            if(mealPlan.optimizationType === "REWARD") {
                this.mealPlanQuality.mealListByQuality = mealPlan.meals;
                this.mealPlanQuality.planCost = mealPlan.mealPlanCost;
            }
        });
        this.onCostOptimizationComplete.next(this.mealPlanCost);
        this.onQualityOptimizationComplete.next(this.mealPlanQuality);
    }
}