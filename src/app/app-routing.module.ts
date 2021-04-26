import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorPageComponent } from '../app/shared/core/error-page/error-page.component';

const appRoutes : Routes = [
    {path: '', redirectTo:'/app-info/home', pathMatch: 'full'}//,
    //{path: 'error', component: ErrorPageComponent, data: {errorMessage: 'oops, something went wrong! Let us try again ...'}},
    //{path: '**', redirectTo: '/error'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}