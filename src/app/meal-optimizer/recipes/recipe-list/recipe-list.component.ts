import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from '../../../shared/services/user-input.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService:RecipeService, private userInputService : UserInputService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes(this.userInputService.userInput.mealSelected).subscribe(
      (recipes) => { this.recipes = recipes }
    );
  }
}