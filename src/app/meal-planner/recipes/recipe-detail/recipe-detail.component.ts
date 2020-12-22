import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { ShoppingItem } from 'src/app/shared/model/shopping-item-model';
import { AppState } from 'src/app/store/reducers/app.reducer';
import { Store } from '@ngrx/store';
import { UserPreferences } from 'src/app/meal-planner/meal-optimizer/store/reducers/user-preferences.reducer';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipeSelected : Recipe;
  id: number;
  noOfPortions : number;

  shoppingItems : ShoppingItem[];

  optimizationTypeSelected : String;

  ngOnInit(): void {

    this.optimizationTypeSelected = 'COST';

    this.store.select('userPreferences').subscribe((userPreferences : UserPreferences) => {
      this.optimizationTypeSelected = userPreferences.optimizationTypeSelected;
    });

    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.recipeSelected = this.recipeService.getRecipeById(this.id);
      this.noOfPortions = this.optimizationService.getPortionCountByOptimizationTypeMealName(this.optimizationTypeSelected, this.recipeSelected.name);
  });
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private optimizationService : OptimizationService, private router : Router, private store : Store<AppState>) {}

  onAddToShoppingList(): void {
    this.shoppingItems = new Array<ShoppingItem>();
    this.recipeSelected.ingredients.forEach((ingredient : Ingredient) => {
      this.shoppingItems.push(
        new ShoppingItem(ingredient.name, 
              ingredient.quantity.count * this.noOfPortions, 
              ingredient.quantity.measure,
              (ingredient.labels === undefined)?[this.recipeSelected.name]:ingredient.labels
      ));
    });
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.shoppingItems));
  }

  ngOnDestroy() {}
}