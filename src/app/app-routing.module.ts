import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MealOptimizerComponent } from './meal-optimizer/meal-optimizer.component';
import { HomeComponent } from './app-info/home/home.component';
import { ContactUsComponent } from './app-info/contact-us/contact-us.component';
import { UserLoginComponent } from './user-mgmt/user-register-login/user-login/user-login.component';
import { UserRegisterComponent } from './user-mgmt/user-register-login/user-register/user-register.component';
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
import { UsernameResolver } from './shared/services/username-resolver.service';

const appRoutes : Routes = [
    {path:'app-info', children: [
                { path:'home', component: HomeComponent },
                { path:'contact-us', component: ContactUsComponent }
            ]},
    {path:'user-mgmt', children: [
                { path: 'login', canActivate: [RegisterLoginGuardService], component: UserLoginComponent },
                { path: 'register', canActivate: [RegisterLoginGuardService], resolve:{ usernames : UsernameResolver, dietTypes : UseDietTypeResolver },component: UserRegisterComponent },
                { path:'user', canActivate: [AuthGuardService], children: [
                    { path:'user-profile', component: UserProfileComponent }]}
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