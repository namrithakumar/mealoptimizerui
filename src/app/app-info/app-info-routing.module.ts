import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { HomeComponent } from "./home/home.component";

const appInfoRoutes : Routes = [
    {path:'app-info', children: [
        { path:'home', component: HomeComponent },
        { path:'contact-us', component: ContactUsComponent }
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(appInfoRoutes)],
    exports: [RouterModule]
})
export class AppInfoRoutingModule {}