import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/recipe.model';
import { UserInputService } from '../../shared/services/user-input.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipe : Recipe;

  ngOnInit(): void { }

  getRecipeForItem( recipe : Recipe ) : void {
    this.recipe = recipe;
  }
}