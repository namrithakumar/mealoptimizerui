import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipeService } from 'src/app/shared/services/recipe.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { ShoppingItem } from 'src/app/shared/model/shopping-item-model';
import { AppState } from 'src/app/store/reducers/app.reducer';
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

    /*
     * We need to know optimizationType selected by the user since the no of portions varies based on the optimization type.
     */
    this.store.select('userPreferences').subscribe((userPreferences : UserPreferences) => {
      this.optimizationTypeSelected = userPreferences.optimizationTypeSelected;
    });

    /*
     * When /meal-planner/recipes/recipeID is loaded, select the recipe based on the ID. 
     */
    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.recipeSelected = this.recipeService.getRecipeById(this.id);
      this.noOfPortions = this.optimizationService.getPortionCountByOptimizationTypeMealName(this.optimizationTypeSelected, this.recipeSelected.name);
  });
  }

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private optimizationService : OptimizationService, private router : Router, private store : Store<AppState>) {}

  /*
   * When 'Add to Shopping List' is clicked, add named router-outlet shoppinglist, and dispatch a ShoppingList action.
   */
  onAddToShoppingList(): void {
    this.shoppingItems = new Array<ShoppingItem>();
    this.recipeSelected.ingredients.forEach((ingredient : Ingredient) => {
      this.shoppingItems.push(
        new ShoppingItem(ingredient.name, 
              ingredient.quantity.amount * this.noOfPortions, 
              ingredient.quantity.measure,
              (ingredient.labels === undefined)?[this.recipeSelected.name]:ingredient.labels
      ));
    });
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.shoppingItems));
    //id can either be taken from the current route or from this.id in this component.
    this.router.navigate([ 'meal-planner' , { outlets : { mealoptimizer : 'meal-optimizer', recipes : ['recipes', this.route.snapshot.params['id']], shoppinglist : 'shopping-list' } }], { queryParams : { shoppinglistmode : 'add' }, queryParamsHandling : 'merge' });
  }

  ngOnDestroy() {}
}