import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { UserInputService } from '../../shared/services/user-input.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe : Recipe;

  ingredientInfo : {ingredients: Ingredient[], label: String};

  ngOnInit(): void { }

  constructor(private userInputService : UserInputService) {
    
    this.userInputService.onRecipeSelect.subscribe((recipe : Recipe) => {
      this.recipe = recipe;
    });
  }
}