import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { OrderResponse } from '../../model/order/order-response.model';

@Injectable({ providedIn : 'root'})
export class MealPlanService {

    constructor(private http : HttpClient) {} 

    getMealPlan(orderRequest :{ deliveryDate : Date ,mealSelected : Array<String>, optimizationTypes: Array<String> }) {
        const url = 'http://localhost:9090/mealoptimizer/orders/save';
        return this.http.post<OrderResponse>(url,
                        orderRequest);
    }
}