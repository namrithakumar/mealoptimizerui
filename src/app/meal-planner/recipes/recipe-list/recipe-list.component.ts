import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/app/shared/model/recipe.model';
import { Input } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
/*
 * This component is loaded for the route meal-planner/recipes.
 * It is composed of 4 RecipeItems.
 * 
 * Tasks : Takes recipes from 'Recipes' store and passes them to RecipeItem.
 * Technique used : Attribute Binding 
 */
export class RecipeListComponent implements OnInit {

  @Input() recipes: Recipe[];

  constructor() { }

  ngOnInit(): void { }
}