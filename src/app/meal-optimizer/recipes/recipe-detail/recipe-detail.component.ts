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
  ingredientInfo : { ingredientName:String, ingredientAmount:number, ingredientLabel:String }[];

  ngOnInit(): void {
  }

  constructor(private userInputService : UserInputService) {}

  onAddToShoppingList(): void {
    this.ingredientInfo = new Array<{ ingredientName:String, ingredientAmount:number, ingredientLabel:String }>();
    this.recipeSelected.ingredients.forEach((ingredient) => {
      this.ingredientInfo.push({
        ingredientName : ingredient.name, 
        ingredientAmount : ingredient.amount, 
        ingredientLabel : ingredient.label
      });
    });
    this.userInputService.onAddIngredientsToShoppingList.emit(this.ingredientInfo);
  }
}