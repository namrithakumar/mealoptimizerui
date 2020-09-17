import { Injectable } from '@angular/core';
import { UserInputService } from '../services/user-input.service';
import { OptimizationService } from '../services/optimization.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({providedIn:'root'})
export class RecipeService {
    
  constructor(private userInputService : UserInputService, optimizationService : OptimizationService) {}
  
  recipes: Recipe[] = [
        new Recipe("Green Salad", "A healthy blend of veggies to provide your daily needs", "https://i2.wp.com/reluctantentertainer.com/wp-content/uploads/2015/10/SA3.jpg","https://www.youtube.com/watch?v=bRJmMw9dDw8", [new Ingredient('Spinach',2,['Green Salad']), new Ingredient('Celery',1,['Green Salad']), new Ingredient('Carrot',1,['Green Salad']), new Ingredient('Onion',1,['Green Salad']), new Ingredient('Tomatoes - cherry',5,['Green Salad']), new Ingredient('Lettuce',2,['Green Salad']), new Ingredient('Corn',5,['Green Salad'])]),
        new Recipe("Ice cream","A frozen dessert you can enjoy on a hot day","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgq9bi1CJq3hyOP7qbPTgBb0M3GJobLJ1xQg&usqp=CAU","https://www.youtube.com/watch?v=ye9_bkCcczo", [new Ingredient('Heavy Cream',1,['Ice cream']), new Ingredient('Condensed milk',1,['Ice cream']), new Ingredient('Flavor', 3,['Ice cream']), new Ingredient('Food coloring',2,['Ice cream']), new Ingredient('Almonds',5,['Ice cream']), new Ingredient('Walnut',10,['Ice cream'])]),
        new Recipe("Strawberry Milkshake","Taste and goodness all in one","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGHLe0bYqNDSTzwQwVZXP4cMUgSVoksD6a7g&usqp=CAU","https://www.youtube.com/watch?v=5_DTtGT23iU", [new Ingredient('Milk full fat',1,['Strawberry Milkshake']), new Ingredient('Strawberry',15,['Strawberry Milkshake']), new Ingredient('Heavy cream',1,['Strawberry Milkshake']), new Ingredient('Strawberry syrup',1,['Strawberry Milkshake'])]),
        new Recipe("Garlic Bread","Feed your senses with some spice","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfuqq0ADG7H1LaGVBsIXkPEZsW_ECSzRHrow&usqp=CAU","https://www.youtube.com/watch?v=TAt2Nn0F2mc", [new Ingredient('Bread',2,['Garlic bread']), new Ingredient('Cheese',4,['Garlic bread']), new Ingredient('Garlic seasoning - ready to use',1,['Garlic bread'])])
      ];

    public getRecipes() : Recipe[] {
      return this.recipes;
    }

    public getRecipeById(id : number) : Recipe {
      return this.recipes[id];
    }
}