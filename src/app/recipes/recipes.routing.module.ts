import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

import { RecipesComponent } from './recipes.component';

const recipesRoutes : Routes = [
    {path:'recipes', component: RecipesComponent, children: [
        {path:':id', component: RecipeDetailComponent}]}
];

@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}