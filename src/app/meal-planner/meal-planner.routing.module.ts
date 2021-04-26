import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealOptimizerComponent } from './meal-optimizer/meal-optimizer.component';
import { CanExitPageService } from '../shared/services/can-exit-page.service';
import { UseDietTypeResolver } from '../shared/services/user-diet-type-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { OnlineOrderComponent } from './meal-optimizer/online-order/online-order.component';
import { AuthGuardService } from '../shared/services/auth-guard.service';
import { MealPlannerComponent } from './meal-planner.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const mealPlannerRoutes : Routes = [
    {path:'meal-planner', component: MealPlannerComponent, children: [
        {path:'meal-optimizer', outlet:'mealoptimizer', canDeactivate: [CanExitPageService], component: MealOptimizerComponent, resolve:{userDietTypes: UseDietTypeResolver}},
        {path:'recipes', outlet:'recipes', component: RecipesComponent, children: [
            {path:':id', component: RecipeDetailComponent} ]},
        {path:'online-order', outlet:'onlineorder', component : OnlineOrderComponent},
        {path:'shopping-list', outlet:'shoppinglist', component : ShoppingListComponent}
    ]}];

@NgModule({
    imports: [RouterModule.forChild(mealPlannerRoutes)],
    exports: [RouterModule]
})
export class MealPlannerRoutingModule {}