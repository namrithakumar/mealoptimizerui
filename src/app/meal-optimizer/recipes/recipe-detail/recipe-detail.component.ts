import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { OptimizationService } from 'src/app/shared/services/optimization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipeSelected : Recipe;
  id: number;
  noOfPortions : number;

  ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[];

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
    this.ingredientInfo = new Array<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }>();
    this.recipeSelected.ingredients.forEach((ingredient) => {
      this.ingredientInfo.push({
        ingredientName : ingredient.name, 
        ingredientAmount : ingredient.amount * this.noOfPortions, 
        ingredientLabels : ingredient.labels
      });
    });
    this.userInputService.onAddIngredientsToShoppingList.next(this.ingredientInfo);
  }

  ngOnDestroy() {
    this.onOptimizationTypeSelectedSubscription.unsubscribe();
  }
}