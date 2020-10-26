import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingItem } from '../../../shared/model/shopping-item-model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipeSelected : Recipe;
  id: number;
  noOfPortions : number;

  ingredientInfo : ShoppingItem[];

  //Delete
  onOptimizationTypeSelectedSubscription : Subscription;

  ngOnInit(): void {

    this.route.params.subscribe((params : Params) => {
      this.id = +params['id'];
      this.recipeSelected = this.recipeService.getRecipeById(this.id);
      this.noOfPortions = this.optimizationService.getPortionCountByOptimizationTypeMealName(this.userInputService.optimizationTypeSelected, this.recipeSelected.name);
  });
  }

  ngAfterViewInit() {
    this.onOptimizationTypeSelectedSubscription = this.userInputService.onOptimizationTypeSelected.subscribe(
      (optimizationType : String) => {
        this.router.navigate(['meal-optimizer','recipes']);
      }
    );
  }

  constructor(private userInputService : UserInputService, private route: ActivatedRoute, private recipeService: RecipeService, private optimizationService : OptimizationService, private router : Router) {}

  onAddToShoppingList(): void {
    this.ingredientInfo = new Array<ShoppingItem>();
    this.recipeSelected.ingredients.forEach((ingredient : Ingredient) => {
      this.ingredientInfo.push(
        new ShoppingItem(ingredient.name, 
              ingredient.quantity.count * this.noOfPortions, 
              ingredient.quantity.measure,
              (ingredient.labels === undefined)?[this.recipeSelected.name]:ingredient.labels
      ));
    });
    this.userInputService.onAddIngredientsToShoppingList.next(this.ingredientInfo);
  }

  ngOnDestroy() {
    this.onOptimizationTypeSelectedSubscription.unsubscribe();
  }
}