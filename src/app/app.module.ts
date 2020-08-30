import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserDietTypeComponent } from './meal-optimizer/user_diet_type/user_diet_type.component';
import { DeliveryDateSelectorComponent } from './meal-optimizer/delivery-date-selector/delivery-date-selector.component';
import { MealOptimizerComponent } from './meal-optimizer/meal-optimizer.component';
import { MealSelectorComponent } from './meal-optimizer/meal-selector/meal-selector.component';
import { OptimizedMealPlanComponent } from './meal-optimizer/optimized-meal-plan/optimized-meal-plan.component';
import { OrderSummaryComponent } from './meal-optimizer/optimized-meal-plan/order-summary/order-summary.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipes/recipe-item/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { MealOptionsComponent } from './meal-optimizer/meal-selector/meal-options/meal-options.component';
import { OptimizedResultsTableComponent } from './meal-optimizer/optimized-meal-plan/optimized-results-table/optimized-results-table.component';
import { OptimizedResultCostComponent } from './meal-optimizer/optimized-meal-plan/optimized-results-table/optimized-result-cost/optimized-result-cost.component';
import { OptimizedResultQualityComponent } from './meal-optimizer/optimized-meal-plan/optimized-results-table/optimized-result-quality/optimized-result-quality.component';
import { OrderInfoComponent } from './meal-optimizer/optimized-meal-plan/optimized-results-table/order-info/order-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDietTypeComponent,
    DeliveryDateSelectorComponent,
    MealOptimizerComponent,
    MealSelectorComponent,
    OptimizedMealPlanComponent,
    OrderSummaryComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    MealOptionsComponent,
    OptimizedResultsTableComponent,
    OptimizedResultCostComponent,
    OptimizedResultQualityComponent,
    OrderInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
