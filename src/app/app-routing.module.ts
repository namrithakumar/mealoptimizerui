import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MealOptimizerComponent } from './meal-optimizer/meal-optimizer.component';
import { HomeComponent } from './app-info/home/home.component';
import { ContactUsComponent } from './app-info/contact-us/contact-us.component';
import { UserRegisterLoginLogoutComponent } from './user-mgmt/user-register-login-logout/user-register-login-logout.component';
import { UserProfileComponent } from './user-mgmt/user-profile/user-profile.component';
import { UserSettingsComponent } from './user-mgmt/user-settings/user-settings.component';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { RegisterLoginGuardService } from './shared/services/register-login-guard.service';
import { CanExitPageService } from './shared/services/can-exit-page.service';
import { UseDietTypeResolver } from './shared/services/user-diet-type-resolver.service';
import { OnlineOrderComponent } from './meal-optimizer/online-order/online-order.component';
import { RecipesComponent } from './meal-optimizer/recipes/recipes.component';
import { RecipeDetailComponent } from './meal-optimizer/recipes/recipe-detail/recipe-detail.component';
import { UserComponent } from './user-mgmt/user/user.component';

const appRoutes : Routes = [
    {path:'app-info', children: [
                { path:'home', component: HomeComponent },
                { path:'contact-us', component: ContactUsComponent }
            ]},
    {path:'user-mgmt', children: [
                { path: 'register-login', canActivate: [RegisterLoginGuardService], component: UserRegisterLoginLogoutComponent },
                { path:'user', canActivate: [AuthGuardService], component: UserComponent, children: [
                    { path:'user-profile/:username', component: UserProfileComponent },
                    { path:'user-settings/:username', component: UserSettingsComponent }]}
            ]},
    {path:'meal-optimizer', canDeactivate: [CanExitPageService], component: MealOptimizerComponent, resolve:{userDietTypes: UseDietTypeResolver}, children: [
        {path:'online-order', component: OnlineOrderComponent },
        {path:'recipes', component: RecipesComponent, children: [
        {path:':id', component: RecipeDetailComponent}]}
    ]},
    {path: '', redirectTo:'/app-info/home', pathMatch: 'full'},
    {path: 'error', component: ErrorPageComponent, data: {errorMessage: 'oops, something went wrong! Let us try again ...'}},
    {path: '**', redirectTo: '/error'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}