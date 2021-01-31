import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';

import * as fromApp from '../app/store/reducers/app.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FullscreenOverlayContainer, OverlayContainer, OverlayModule } from "@angular/cdk/overlay";
import { UserPreferencesEffects } from './meal-planner/meal-optimizer/store/effects/user-preferences.effects';
import { MenuEffects } from '../app/meal-planner/meal-optimizer/store/effects/menu.effects';
import { OrderEffects } from '../app/meal-planner/meal-optimizer/store/effects/order.effects';
import { RecipesEffects } from '../app/meal-planner/recipes/store/effects/recipes.effects';
import { UserMgmtEffects } from '../app/user-mgmt/store/effects/user-mgmt.effects';
import { HeaderComponent } from './header/header.component';
import { AppInfoModule } from '../app/app-info/app-info.module';
import { UserMgmtModule } from '../app/user-mgmt/user-mgmt.module';
import { MealPlannerModule } from '../app/meal-planner/meal-planner.module';
import { CoreModule } from '../app/shared/core/core.module';
import { interceptorProviders } from '../app/shared/services/interceptor/interceptors';
import { CustomOverlayComponent } from './shared/custom-overlay/custom-overlay.component';
import { CustomNotificationComponent } from './shared/custom-notification/custom-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    HeaderComponent,
    CustomOverlayComponent,
    CustomNotificationComponent
  ],
  imports: [
    AppInfoModule,
    CoreModule,
    UserMgmtModule,
    MealPlannerModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    OverlayModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([UserPreferencesEffects, MenuEffects, OrderEffects, RecipesEffects, UserMgmtEffects])    
  ],
  providers: [ interceptorProviders,
              { provide : JWT_OPTIONS, useValue : JWT_OPTIONS },
              JwtHelperService,
              {provide: OverlayContainer, useClass: FullscreenOverlayContainer}],
  bootstrap: [AppComponent]
})
export class AppModule {}