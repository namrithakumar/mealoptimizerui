import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealOptimizerComponent } from './meal-optimizer.component';
import { CanExitPageService } from '../shared/services/can-exit-page.service';
import { UseDietTypeResolver } from '../shared/services/user-diet-type-resolver.service';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { OnlineOrderComponent } from './online-order/online-order.component';

const mealOptimizerRoutes : Routes = [
    {path:'meal-optimizer', canDeactivate: [CanExitPageService], component: MealOptimizerComponent, resolve:{userDietTypes: UseDietTypeResolver}, children : [
        {path:'recipes', component: RecipesComponent, children: [
            {path:':id', component: RecipeDetailComponent} ]},
        {path:'online-order', component : OnlineOrderComponent}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(mealOptimizerRoutes)],
    exports: [RouterModule]
})
export class MealOptimizerRoutingModule {}