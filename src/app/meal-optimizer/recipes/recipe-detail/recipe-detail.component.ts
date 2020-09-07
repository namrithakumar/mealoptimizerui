import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../../shared/recipe.model';
import { UserInputService } from 'src/app/shared/services/user-input.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeSelected : Recipe;
  ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabels:String[] }[];

  ngOnInit(): void {
  }

  constructor(private userInputService : UserInputService) {}

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