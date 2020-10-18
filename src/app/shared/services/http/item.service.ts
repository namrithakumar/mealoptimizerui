import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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