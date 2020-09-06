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

  recipes: Recipe[] = this.recipeService.getRecipes();

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
  }
}
