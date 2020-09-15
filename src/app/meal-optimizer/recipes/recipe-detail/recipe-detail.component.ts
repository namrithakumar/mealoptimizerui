import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeSelected : Recipe;
  id: number;

  ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[];

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) => {
    this.id = +params['id'];
    this.recipeSelected = this.recipeService.getRecipeById(this.id);
  });
  }

  constructor(private userInputService : UserInputService, private route: ActivatedRoute, private recipeService: RecipeService) {}

  onAddToShoppingList(): void {
    this.ingredientInfo = new Array<{ ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }>();
    this.recipeSelected.ingredients.forEach((ingredient) => {
      this.ingredientInfo.push({
        ingredientName : ingredient.name, 
        ingredientAmount : ingredient.amount, 
        ingredientLabels : ingredient.labels
      });
    });
    this.userInputService.onAddIngredientsToShoppingList.emit(this.ingredientInfo);
  }
}