import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContactUsComponent } from './app-info/contact-us/contact-us.component';
import { HomeComponent } from './app-info/home/home.component';
import { ErrorPageComponent } from '../app/shared/error-page/error-page.component';

const appRoutes : Routes = [
    {path:'app-info', children: [
                { path:'home', component: HomeComponent },
                { path:'contact-us', component: ContactUsComponent }
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