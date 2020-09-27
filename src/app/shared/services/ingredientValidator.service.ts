import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})
export class IngredientValidatorService {

    validIngredients : Array<String> = ['bread','butter','milk','cheese','almonds'];

    isValidIngredient(ingredientName : String) : boolean {
        return this.validIngredients.includes(ingredientName);
    }
}