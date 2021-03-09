import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit, OnDestroy {

  //Recipe and index are set from RecipeList.
  @Input() recipe : Recipe;

  @Input() indexOfRecipe: number;

  constructor(private router : Router, 
              private route : ActivatedRoute,
              private recipeService : RecipeService) { }

  ngOnInit(): void {
  }

  onItemSelect() : void {
    this.recipeService.recipeSelected.next(true);    
    this.router.navigate([ 'meal-planner' , { outlets : { mealoptimizer : 'meal-optimizer', recipes : [ 'recipes' , this.indexOfRecipe ] } }] , { queryParams : this.route.snapshot.queryParams });
  }

  ngOnDestroy() : void {
    this.recipeService.recipeSelected.complete();
  }
}