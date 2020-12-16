import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthInterceptor } from './shared/services/interceptor/auth-interceptor.service';
import { AppLoadingSpinnerComponent } from './shared/app-loading-spinner/app-loading-spinner.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import * as fromApp from '../app/store/reducers/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../app/meal-optimizer/store/effects/user.effects';
import { MenuEffects } from '../app/meal-optimizer/store/effects/menu.effects';
import { OrderEffects } from '../app/meal-optimizer/store/effects/order.effects';
import { RecipesEffects } from '../app/meal-optimizer/recipes/store/effects/recipes.effects';
import { UserMgmtEffects } from '../app/user-mgmt/store/effects/user-mgmt.effects';
import { HeaderComponent } from './header/header.component';
import { AppInfoModule } from '../app/app-info/app-info.module';
import { UserMgmtModule } from '../app/user-mgmt/user-mgmt.module';
import { MealOptimizerModule } from './meal-optimizer/meal-optimizer.module';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    AppLoadingSpinnerComponent,
    HeaderComponent
  ],
  imports: [
    AppInfoModule,
    UserMgmtModule,
    MealOptimizerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([UserEffects, MenuEffects, OrderEffects, RecipesEffects, UserMgmtEffects])    
  ],
  providers: [{ provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
              { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
              JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule {}