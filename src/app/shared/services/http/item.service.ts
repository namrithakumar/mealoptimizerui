import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserPreferences } from 'src/app/meal-optimizer/store/reducers/user-preferences.reducer';
import { AppState } from 'src/app/store/reducers/app.reducer';

@Injectable({providedIn:'root'})
export class ItemService {

    constructor(private http : HttpClient) {}
    
    getItemsByCategory(category : String) : Observable<String[]> {
        return this.http
            .get< String[] >('http://localhost:9090/mealoptimizer/menu/find',
            {
                'params' : new HttpParams().set('category', category.toString())
            });
    }
}