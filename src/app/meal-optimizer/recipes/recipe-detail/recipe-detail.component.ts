import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeSelected : Recipe;

  ngOnInit(): void {
  }

onAddToShoppingList(event : Event): void {
  console.log("Add to shopping list clicked " + event);
}
}
