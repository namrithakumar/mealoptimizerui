import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
/*
 * This component has 2 sections :
 * RecipeList : List of recipes for the meals chosen. It is composed of 4 RecipeItems
 * RecipeStart : Displays a help text. This section is replaced with RecipeDetail as soon as a recipe is selected.
 * 
 * Transition from RecipeStart -> RecipeDetail: When a RecipeItem is clicked, the route /meal-planner/recipes/recipeID is loaded.
 * RecipeStart is replaced with RecipeDetail for recipeID.
 */
export class RecipesComponent implements OnInit {

  ngOnInit(): void { }

  constructor() {

  }
}