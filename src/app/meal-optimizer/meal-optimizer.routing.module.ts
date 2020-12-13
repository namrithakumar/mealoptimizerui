import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MealOptimizerComponent } from './meal-optimizer.component';
import { CanExitPageService } from '../shared/services/can-exit-page.service';
import { UseDietTypeResolver } from '../shared/services/user-diet-type-resolver.service';

const mealOptimizerRoutes : Routes = [
    {path:'meal-optimizer', canDeactivate: [CanExitPageService], component: MealOptimizerComponent, resolve:{userDietTypes: UseDietTypeResolver}}
];

@NgModule({
    imports: [RouterModule.forChild(mealOptimizerRoutes)],
    exports: [RouterModule]
})
export class MealOptimizerRoutingModule {}