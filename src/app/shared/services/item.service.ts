import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class ItemService {
    getItemsByCategory(category : String) : String[] {
        return ['Green Salad','Ice cream','Strawberry Milkshake','Garlic Bread'];
    }
}