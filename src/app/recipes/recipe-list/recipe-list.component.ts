import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeForItem = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    new Recipe("Green Salad", "A healthy blend of veggies to provide your daily needs", "https://i2.wp.com/reluctantentertainer.com/wp-content/uploads/2015/10/SA3.jpg","https://www.youtube.com/watch?v=bRJmMw9dDw8", [new Ingredient('Spinach',2), new Ingredient('Celery',1), new Ingredient('Carrot',1), new Ingredient('Onion',1), new Ingredient('Tomatoes - cherry',5), new Ingredient('Lettuce',2), new Ingredient('Corn',5)]),
    new Recipe("Ice cream","A frozen dessert you can enjoy on a hot day","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgq9bi1CJq3hyOP7qbPTgBb0M3GJobLJ1xQg&usqp=CAU","https://www.youtube.com/watch?v=ye9_bkCcczo", [new Ingredient('Heavy Cream',1), new Ingredient('Condensed milk',1), new Ingredient('Flavor', 3), new Ingredient('Food coloring',2), new Ingredient('Almonds',5), new Ingredient('Walnut',10)]),
    new Recipe("Strawberry Milkshake","Taste and goodness all in one","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSGHLe0bYqNDSTzwQwVZXP4cMUgSVoksD6a7g&usqp=CAU","https://www.youtube.com/watch?v=5_DTtGT23iU", [new Ingredient('Milk full fat',1), new Ingredient('Strawberry',15), new Ingredient('Heavy cream',1), new Ingredient('Strawberry syrup',1)]),
    new Recipe("Garlic Bread","Feed your senses with some spice","https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQfuqq0ADG7H1LaGVBsIXkPEZsW_ECSzRHrow&usqp=CAU","https://www.youtube.com/watch?v=TAt2Nn0F2mc", [new Ingredient('Bread',2), new Ingredient('Cheese',4), new Ingredient('Garlic seasoning - ready to use',1)])
  ]
  constructor() { }

  ngOnInit(): void {
  }

  getRecipeForItem( recipe : Recipe ) : void {
    this.recipeForItem.emit(recipe);
  }
}
