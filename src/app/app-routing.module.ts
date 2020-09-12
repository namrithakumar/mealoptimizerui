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

const appRoutes : Routes = [
    {path:'app-info', children: [
                { path:'home', component: HomeComponent },
                { path:'contact-us', component: ContactUsComponent }
            ]},
    {path:'user-mgmt', children: [
                { path: 'register-login', component: UserRegisterLoginLogoutComponent },
                { path:'user',  canActivate: [AuthGuardService], children: [
                        { path:'user-profile', component: UserProfileComponent },
                        { path:'user-settings', component: UserSettingsComponent }
                ] }
            ]},
    {path:'meal-optimizer', component: MealOptimizerComponent},
    {path: '', redirectTo:'/app-info/home', pathMatch: 'full'},
    {path: 'error', component: ErrorPageComponent, data: {errorMessage: 'oops, something went wrong! Let us try again ...'}},
    {path: '**', redirectTo: '/error'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}